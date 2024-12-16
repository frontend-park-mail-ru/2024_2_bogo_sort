const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
                            ['@babel/preset-typescript', {allowNamespaces: true}]
                        ]
                    }
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
    resolve: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components/'),
          '@pages': path.resolve(__dirname, 'src/pages/'),
          '@modules': path.resolve(__dirname, 'src/modules/'),
          '@constants': path.resolve(__dirname, 'src/constants/'),
          '@utils': path.resolve(__dirname, 'src/utils/')
        },
        extensions: ['.js', '.ts']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.sharpMinify,
                  options: {
                    encodeOptions: {
                      jpeg: {
                        quality: 100,
                      },
                      webp: {
                        lossless: true,
                      },
                    },
                  },
                },
              }),
        ],
    },
    mode: 'production'
};
