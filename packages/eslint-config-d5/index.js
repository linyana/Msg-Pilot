module.exports = {
  extends: ['react', 'airbnb'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
      },
    },
  ],
  rules: {
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    camelcase: 0,
    'max-len': [
      0,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/jsx-filename-extension': [
      0,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/static-property-placement': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1,
      },
    ],
    'react/destructuring-assignment': 0,
    'react/no-danger': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': [
      0,
      {
        ignore: ['antd-mobile'],
      },
    ],
    'no-unused-vars': 0,
    'no-console': ['error', {
      allow: ['warn', 'error', 'info'],
    }],
    'consistent-return': 0,
    'react/jsx-no-useless-fragment': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        minProperties: 1,
        consistent: true,
      },
    ],
  },
}
