const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = override(
    addWebpackAlias({
        '@adminModals': path.resolve(__dirname, 'src/adminModals'),
        '@categories': path.resolve(__dirname, 'src/categories'),
        '@customerModals': path.resolve(__dirname, 'src/customerModals'),
        '@form': path.resolve(__dirname, 'src/form'),
        '@header': path.resolve(__dirname, 'src/header'),
        '@layout': path.resolve(__dirname, 'src/layout'),
        '@materials': path.resolve(__dirname, 'src/materials'),
        '@orders': path.resolve(__dirname, 'src/orders'),
        '@pages': path.resolve(__dirname, 'src/Pages'),
        '@productRatings': path.resolve(__dirname, 'src/productRatings'),
        '@products': path.resolve(__dirname, 'src/products'),
        '@support': path.resolve(__dirname, 'src/support'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@wishlist': path.resolve(__dirname, 'src/wishlist'),
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