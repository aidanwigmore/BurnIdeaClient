const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = override(
    addWebpackAlias({
        '@adminModals': path.resolve(__dirname, 'src/adminModals'),
        '@category': path.resolve(__dirname, 'src/category'),
        '@content': path.resolve(__dirname, 'src/content'),
        '@customerModals': path.resolve(__dirname, 'src/customerModals'),
        '@form': path.resolve(__dirname, 'src/form'),
        '@header': path.resolve(__dirname, 'src/header'),
        '@layout': path.resolve(__dirname, 'src/layout'),
        '@adminLayout': path.resolve(__dirname, 'src/adminLayout'),
        '@materials': path.resolve(__dirname, 'src/materials'),
        '@content': path.resolve(__dirname, 'src/content'),
        '@pages': path.resolve(__dirname, 'src/Pages'),
        '@idea': path.resolve(__dirname, 'src/idea'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@theme': path.resolve(__dirname, 'src/theme'),
    }),
    (config) => {
        config.plugins = (config.plugins || []).concat([
            new Dotenv({
                path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
            }),
        ]);
        return config;
    }
);