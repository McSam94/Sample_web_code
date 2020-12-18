module.exports = {
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    ignorePatterns: ['/node_modules/**', '/www/index.bundle.js'],
    rules: {
        'no-unused-vars': ['warn', { args: 'none', argsIgnorePattern: 'req|res|next|val' }],
        'prettier/prettier': ['error'],
        'react/display-name': ['off'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
