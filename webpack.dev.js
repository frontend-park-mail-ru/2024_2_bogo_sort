const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMaps: true,
                        presets: [
                            ['@babel/preset-typescript', {sourceMaps: 'both', allowNamespaces: true}]
                        ]
                    }
                },
            },
            // {
            //     test: /\.ts$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/
            // },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            }
            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/sw.js', to: ''},
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: false,
        hot: true,
        watchFiles: ['src/**/*'],
        port: 9000
    },
    mode: 'development'
};