import StyleDictionary from 'style-dictionary';

// Custom format for Figma tokens
StyleDictionary.registerFormat({
  name: 'figmaTokens',
  format: function({ dictionary, platform }) {
    return JSON.stringify(dictionary.tokens, null, 2);
  }
});

// Custom transform for color values
StyleDictionary.registerTransform({
  name: 'color/figmaRGBA',
  type: 'value',
  matcher: function(token) {
    return token.type === 'color';
  },
  transform: function(token) {
    // Transform color values as needed
    return token.value;
  }
});

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [{
        destination: 'variables.js',
        format: 'javascript/es6'
      }]
    },
 
  }
}; 