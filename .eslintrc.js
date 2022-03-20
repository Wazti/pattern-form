module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '*.vue',
      ],
      rules: {
        'max-len': 'off',
        'vue/max-len': [
          'error',
          {
            code: 120,
            template: 9000,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
            ignoreStrings: true,
          },
        ],
      },
    },
  ],
};
