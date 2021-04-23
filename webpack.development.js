const { merge } = require('webpack-merge');
const config = require('./webpack.config');

const mode = 'development';

module.exports = merge(config, {
    mode,
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    }
});