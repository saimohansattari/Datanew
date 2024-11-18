module.exports = {
    extends: [
      'stylelint-config-standard', // Standard set of rules
    ],
    plugins: ['stylelint-scss'], // Use the SCSS plugin if you're working with SCSS
    rules: {
      'block-no-empty': true, // Prevent empty blocks
      'color-no-invalid-hex': true, // Disallow invalid hex colors
      'declaration-colon-newline-after': null, // Disable rule if unnecessary
      'max-empty-lines': [2, { "ignore": ["comments"] }], // Limit empty lines, allow exceptions
      'no-duplicate-selectors': true, // Prevent duplicate selectors
      'selector-pseudo-element-colon-notation': 'double', // Use double colon for pseudo-elements
    },
  };
  