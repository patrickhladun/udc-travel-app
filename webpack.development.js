const { merge } = require('webpack-merge');
const config = require('./webpack.config');

const mode = 'development';

module.exports = merge(config, {
    mode,
    devServer: {
        port: 3000
    },
});