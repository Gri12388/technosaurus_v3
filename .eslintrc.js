module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'max-len': 0,
    'vuejs-accessibility/label-has-for': 0,
    'vuejs-accessibility/form-control-has-label': 0,
    'import/prefer-default-export': 0,
    'no-else-return': 0,
    'import/extensions': 0,
  },
};
