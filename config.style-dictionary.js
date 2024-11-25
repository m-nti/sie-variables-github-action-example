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
  source: ['tokens/*01*.json'], // 'tokens/*09*.json'],
  platforms: {

    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/variables'
      }]
    },

    /*
   css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
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
    ios: {
      transformGroup: 'ios',
      buildPath: 'build/ios/',
      files: [{
        destination: 'Variables.swift',
        format: 'ios-swift/class.swift'
      }]
    },
    android: {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [{
        destination: 'colors.xml',
        format: 'android/colors'
      }]
    }, */
  }
}; 