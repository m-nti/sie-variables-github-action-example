import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths to your files
const tokensDir = path.join(__dirname, 'tokens');
const variablesPath = path.join(__dirname, 'build', 'scss', '_variables.scss');
const themesOutputPath = path.join(__dirname, 'build', 'scss', '_themes.scss');

// Function to read and parse JSON token files
const readTokenFiles = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Function to read and parse SCSS variables
const readSCSSVariables = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const variables = {};
  const regex = /\$(\w[\w-]*):\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(data)) !== null) {
    variables[match[1]] = match[2].trim();
  }
  return variables;
};

// Function to generate SCSS mixins
const generateSCSSMixins = (themeName, tokens, scssVariables) => {
  let scssContent = `// Auto-generated ${themeName} theme\n\n`;
  scssContent += `@mixin ${themeName}-theme {\n`;

  Object.entries(tokens).forEach(([category, items]) => {
    Object.entries(items).forEach(([tokenName, tokenValue]) => {
      if (tokenValue.$type === 'color' && tokenValue.$value.includes('{')) {
        const scssVarName = tokenName.toLowerCase().replace(/ /g, '-');
        const variableKey = tokenValue.$value.replace(/{|}/g, '').toLowerCase().replace(/\./g, '-');
        const mappedValue = scssVariables[variableKey] ? `$${variableKey}` : tokenValue.$value;
        scssContent += `  --${scssVarName}: ${mappedValue};\n`;
      }
    });
  });

  scssContent += `}\n\n`;
  return scssContent;
};

// Read SCSS variables
const scssVariables = readSCSSVariables(variablesPath);

// Read all token files in the tokens directory
const tokenFiles = fs.readdirSync(tokensDir).filter(file => file.endsWith('.json'));
let darkThemeSCSS = '';
let lightThemeSCSS = '';

// Process each token file
tokenFiles.forEach(file => {
  const tokens = readTokenFiles(path.join(tokensDir, file));
  if (file.includes('Dark')) {
    darkThemeSCSS += generateSCSSMixins('dark', tokens, scssVariables);
  } else if (file.includes('Light')) {
    lightThemeSCSS += generateSCSSMixins('light', tokens, scssVariables);
  }
});

// Write to _themes.scss
fs.writeFileSync(themesOutputPath, `${darkThemeSCSS}\n${lightThemeSCSS}`, 'utf-8');

console.log('Themes have been generated successfully!');
