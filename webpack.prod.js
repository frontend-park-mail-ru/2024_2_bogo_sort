const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/sw.js', to: ''},
            ],
        }),
    ],
    mode: 'production'
};