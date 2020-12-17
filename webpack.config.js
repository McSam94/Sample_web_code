const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'index.bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'resolve-url-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production',
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: require('./src/styles/index.js'),
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './www/index.html',
            filename: './index.html',
            inject: false,
        }),
    ],
    resolve: {
        alias: {
            Utils: path.resolve(__dirname, 'src/utils/index.js'),
            Images: path.resolve(__dirname, 'src/assets/images/index.js'),
            Icons: path.resolve(__dirname, 'src/assets/icons/index.js'),
            Pages: path.resolve(__dirname, 'src/view/pages/index.js'),
            Components: path.resolve(__dirname, 'src/view/components/index.js'),
            Stores: path.resolve(__dirname, 'src/store/index.js'),
            Navigations: path.resolve(__dirname, 'src/navigation/index.js'),
            Services: path.resolve(__dirname, 'src/services/index.js'),
        },
        extensions: ['.js'],
    },
    devServer: {
        compress: false,
        historyApiFallback: true,
        open: true,
        hot: true,
        overlay: true,
    },
};
