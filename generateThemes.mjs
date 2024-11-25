import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tokensDir = path.join(__dirname, 'tokens');
const variablesPath = path.join(__dirname, 'build', 'scss', '_variables.scss');
const themesOutputPath = path.join(__dirname, 'build', 'scss', '_themes.scss');

const tokensSourceDir = path.join(__dirname, '@tokens'); // Directory for @tokens
const specificTokenFiles = ['01 Core [DX:DS].Color.json']; // Specify the exact file to process

// Function to read and parse JSON token files
const readTokenFiles = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Function to read SCSS variables with their values
const readSCSSVariables = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const variables = new Map();
  const regex = /\$([a-z0-9-]+):\s*(#[a-f0-9]{6}|rgba?\([^)]+\))/gi;
  let match;
  
  while ((match = regex.exec(data)) !== null) {
    variables.set(match[1], match[2].trim());
  }
  return variables;
};

// Convert token reference to SCSS variable name
const convertToScssVariable = (value) => {
  if (!value.includes('{')) return null;
  
  // Extract the reference from within curly braces
  const reference = value.match(/{([^}]+)}/)[1];
  return '$' + reference.toLowerCase()
  .replace(/\./g, '-')
  .replace(/\s+/g, '-')
  .replace(/[()]/g, '')
  .replace(/--/g, '-')  
  .replace(/[^a-z0-9-]/g, '-') // Replace any non-alphanumeric character with a dash
    .replace(/-+/g, '-')         // Replace multiple consecutive dashes with a single dash
    .replace(/^-+|-+$/g, '');    // Remove leading and trailing dashes
    
};

// Convert token path to CSS variable name
const convertToCssVariable = (path) => {
  // Split the path and remove any unwanted parts
  const pathParts = path.split('.');
  const lastPart = pathParts[pathParts.length - 1];
  
  return '--' + lastPart.toLowerCase()
  .replace(/\./g, '-')
  .replace(/\s+/g, '-')
  .replace(/[()]/g, '')
  .replace(/--/g, '-')  
  .replace(/[^a-z0-9-]/g, '-') // Replace any non-alphanumeric character with a dash
    .replace(/-+/g, '-')         // Replace multiple consecutive dashes with a single dash
    .replace(/^-+|-+$/g, '');    // Remove leading and trailing dashes
};

// Filter and validate tokens
const isValidToken = (path, value) => {
  // Only include tokens that have valid references and are color-related
  return value.includes('{') && 
         !path.toLowerCase().includes('spacing') && // Exclude spacing tokens
         !path.toLowerCase().includes('test');      // Exclude test tokens
};

// Flatten nested tokens object and collect color tokens with references
const flattenTokens = (obj, parentPath = '', result = {}) => {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;
    
    if (value.$type === 'color' && value.$value.includes('{')) {
      result[currentPath] = value.$value;
    } else if (typeof value === 'object' && !value.$type) {
      flattenTokens(value, currentPath, result);
    }
  }
  return result;
};

// Generate SCSS mixins
const generateSCSSMixins = (tokens, theme, scssVariables) => {
  let scssContent = `// Auto-generated ${theme} theme\n@mixin theme-${theme} {\n`;
  
  const groupedTokens = {};

  // Group tokens by their top-level category and filter out unwanted tokens
  Object.entries(tokens).forEach(([path, value]) => {
    if (!isValidToken(path, value)) return;
    
    const category = path.split('.')[0];
    if (!groupedTokens[category]) {
      groupedTokens[category] = {};
    }
    groupedTokens[category][path] = value;
  });

  // Generate SCSS content for each group
  Object.entries(groupedTokens).forEach(([category, categoryTokens]) => {
    scssContent += `\n  // ${category}\n`;
    
    Object.entries(categoryTokens).forEach(([path, value]) => {
      const cssVarName = convertToCssVariable(path);
      const scssVarName = convertToScssVariable(value);
      
      if (scssVarName) {
        const varNameWithoutDollar = scssVarName.substring(1);
        const hexValue = scssVariables.get(varNameWithoutDollar);
        
        if (hexValue) {
          scssContent += `  ${cssVarName}: #{$${varNameWithoutDollar}};\n`;
        }
      }
    });
  });

  scssContent += '}\n\n';
  return scssContent;
};

// Main execution
try {
  // Read specific token files from @tokens directory
  const tokenFiles = specificTokenFiles.filter(file => 
    fs.existsSync(path.join(tokensSourceDir, file))
  );
  
  const scssVariables = readSCSSVariables(variablesPath);
  
  let darkTokens = {};
  let lightTokens = {};

  // Process each token file
  tokenFiles.forEach(file => {
    const tokens = readTokenFiles(path.join(tokensDir, file));
    const flatTokens = flattenTokens(tokens);
    
    if (file.includes('Dark')) {
      darkTokens = { ...darkTokens, ...flatTokens };
    } else if (file.includes('Light')) {
      lightTokens = { ...lightTokens, ...flatTokens };
    }
  });

  // Generate SCSS content
  const darkThemeSCSS = generateSCSSMixins(darkTokens, 'dark', scssVariables);
  const lightThemeSCSS = generateSCSSMixins(lightTokens, 'light', scssVariables);

  // Write to _themes.scss
  const finalSCSS = `@use '../build/scss/_variables.scss' as *;\n\n${darkThemeSCSS}${lightThemeSCSS}`;
  fs.writeFileSync(themesOutputPath, finalSCSS);
  console.log('Themes have been generated successfully!');

} catch (error) {
  console.error('Error generating themes:', error);
}
