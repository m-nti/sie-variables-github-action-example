import { Token, TokensFile } from './token_types.js'

interface StyleDictionaryToken {
  value: string | number | boolean
  type?: string
  description?: string
  figmaHiddenFromPublishing?: boolean
  figmaScopes?: string[]
  figmaCodeSyntax?: Record<string, string>
}

interface StyleDictionaryTokens {
  [key: string]: StyleDictionaryToken | StyleDictionaryTokens
}

function transformToken(token: Token): StyleDictionaryToken {
  const result: StyleDictionaryToken = {
    value: token.$value,
    type: token.$type,
  }

  if (token.$description) {
    result.description = token.$description
  }

  if (token.$extensions?.['com.figma']) {
    const figmaExt = token.$extensions['com.figma']
    
    if (figmaExt.hiddenFromPublishing !== undefined) {
      result.figmaHiddenFromPublishing = figmaExt.hiddenFromPublishing
    }
    
    if (figmaExt.scopes) {
      result.figmaScopes = figmaExt.scopes
    }
    
    if (figmaExt.codeSyntax && Object.keys(figmaExt.codeSyntax).length > 0) {
      result.figmaCodeSyntax = figmaExt.codeSyntax
    }
  }

  return result
}

function transformTokens(tokens: TokensFile, path: string[] = []): StyleDictionaryTokens {
  const result: StyleDictionaryTokens = {}

  for (const [key, token] of Object.entries(tokens)) {
    const currentPath = [...path, key]
    if ('$type' in token && '$value' in token) {
      result[key] = transformToken(token as Token)
    } else {
      result[key] = transformTokens(token, currentPath)
    }
  }

  return result
}

export function convertToStyleDictionary(tokensFile: TokensFile): StyleDictionaryTokens {
  return transformTokens(tokensFile)
} 