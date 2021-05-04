const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "src/client/images",
                to: "images"     
            }],
        }),
        new WorkboxPlugin.GenerateSW()
    ],
};