const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.hbs$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'handlebars-loader',
                options: {
                    runtime: path.resolve(__dirname, 'src/utils/hbsHelpers')
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'sass-loader',
                ]
            }
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/sw.js', to: ''},
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },
    mode: 'production',

    devServer: {
        historyApiFallback: true,
        static: [
            path.resolve(__dirname, '../src/dist'), path.resolve(__dirname, '../src')
        ],
        compress: true,
        hot: true,
        port: 8001,
    }
};