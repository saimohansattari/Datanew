module.exports = {
    extends: [
      'stylelint-config-standard',  // Standard set of rules
    ],
    plugins: ['stylelint-scss'],  // Use the SCSS plugin if needed
    rules: {
      'block-no-empty': true,
      'color-no-invalid-hex': true,
      'declaration-colon-newline-after': 'always',
      'max-empty-lines': 2,
      'no-duplicate-selectors': true,
      'selector-pseudo-element-colon-notation': 'double',
    },
  };