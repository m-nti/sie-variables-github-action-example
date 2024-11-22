import fs from 'fs'
import path from 'path'

interface DesignToken {
  $type: 'color' | 'dimension' | 'string'
  $value: string
  $description?: string
  $extensions?: {
    'com.figma': {
      hiddenFromPublishing: boolean
      scopes: string[]
      codeSyntax: Record<string, unknown>
    }
  }
}

interface TokenSet {
  [key: string]: DesignToken | TokenSet
}

const buildThemes = () => {
  const tokensDir = path.resolve(__dirname, '../tokens')
  const outputDir = path.resolve(__dirname, '../build/scss')
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Read token files
  const lightTokenPath = path.join(tokensDir, '02 Tokens [DX:DS].Light.json')
  const darkTokenPath = path.join(tokensDir, '02 Tokens [DX:DS].Dark.json')

  if (!fs.existsSync(lightTokenPath) || !fs.existsSync(darkTokenPath)) {
    throw new Error('Token files not found!')
  }

  const lightTokens = JSON.parse(fs.readFileSync(lightTokenPath, 'utf8'))
  const darkTokens = JSON.parse(fs.readFileSync(darkTokenPath, 'utf8'))

  // Extract and resolve token values
  const extractTokens = (data: TokenSet, prefix = ''): Record<string, string> => {
    const tokens: Record<string, string> = {}
    
    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'object' && '$type' in value) {
        const token = value as DesignToken
        if (token.$type === 'color') {
          const tokenName = prefix ? `${prefix}-${key}` : key
          tokens[tokenName] = resolveVariableReference(token.$value, data)
        }
      } else if (value && typeof value === 'object') {
        const nestedTokens = extractTokens(value as TokenSet, key)
        Object.assign(tokens, nestedTokens)
      }
    }
    
    return tokens
  }

  const resolveVariableReference = (value: string, tokens: TokenSet): string => {
    if (value.startsWith('{') && value.endsWith('}')) {
      const refPath = value.slice(1, -1).split('.')
      let current: any = tokens
      for (const part of refPath) {
        if (!current[part]) {
          throw new Error(`Invalid token reference: ${value}`)
        }
        current = current[part]
      }
      return `$${refPath.join('-').toLowerCase().replace(/ /g, '-')}`
    }
    return value
  }

  const lightThemeTokens = extractTokens(lightTokens)
  const darkThemeTokens = extractTokens(darkTokens)

  // Generate SCSS content
  const scssContent = `// This file is auto-generated. Do not edit directly.
// Generated on ${new Date().toISOString()}
@use '_variables.scss' as *;

@mixin light-theme {
${Object.entries(lightThemeTokens)
    .map(([key, value]) => `  --${key}: #{${value}};`)
    .join('\n')}
}

@mixin dark-theme {
${Object.entries(darkThemeTokens)
    .map(([key, value]) => `  --${key}: #{${value}};`)
    .join('\n')}
}
`

  // Write to file
  const outputPath = path.join(outputDir, '_themes.scss')
  fs.writeFileSync(outputPath, scssContent)
  console.log('✨ _themes.scss generated successfully!')
}

try {
  buildThemes()
} catch (error) {
  console.error('❌ Error building themes:', error)
  process.exit(1)
} 