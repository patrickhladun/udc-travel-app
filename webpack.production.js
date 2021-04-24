const { merge } = require('webpack-merge');
const config = require('./webpack.config');

const mode = 'production';

module.exports = merge(config, {
    mode
});