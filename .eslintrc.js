module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/destructuring-assignment': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
  },
}
