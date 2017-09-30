const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'main': './source/app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    devServer: {
        contentBase: 'source/',
        host: 'localhost',
        port: '3000',
        // hot: true,
        inline: true
    },
    devtool: "cheap-inline-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?name=images/[name].[ext]?[hash]'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?name=fonts/[name].[ext]?[hash]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: './source/index.hbs',
            minify: {
                collapseWhitespace: false
            },
            hash: true
        }),
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new CleanWebpackPlugin(['dist'])
    ]

};
