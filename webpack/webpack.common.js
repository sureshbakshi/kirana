const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var MakeDirWebpackPlugin = require('make-dir-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')



module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                // Typescript loader
                test: /\.(ts|tsx|js|jsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            }, {
                // SCSS loader
                test: /\.scss$/,
                include: path.join(__dirname, '../styles/scss'),
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // CSS loader
                test: /\.css$/,
                use: [
                    'style-loader?./css/[name].[hash:6].[ext]',
                    'css-loader?name=./css/[name].[hash:6].[ext]'
                ]
            },
            {
                // Images loader
                test: /\.(ico|png|svg|jpg|gif)$/,
                use: [
                    'file-loader?name=./images/[name].[hash:6].[ext]'
                ]
            },
            {
                // Fonts laoder
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=./fonts/[name].[hash:6].[ext]'
                ]
            },
            {
                // CSV and TSV  loader
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader?name=./app_data/[name].[hash:6].[ext]'
                ]
            },
            {
                //  XML Loader
                test: /\.xml$/,
                use: [
                    'xml-loader?name=./app_data/[name].[hash:6].[ext]'
                ]
            },
            {
                //  JSON Loader
                test: /\.json$/,
                use: [
                    'file-loader?name=./app_data/[name].[hash:6].[ext]'
                ]
            },
            // {
            //     // background image in styles
            //     test: /\.(png|jpg)$/,
            //     loader: 'url-loader'
            //  }
        ],
    },
    resolve: {
        extensions: [
            '*',
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.ts',
            '.js',
            '.json',
            '.scss',
            '.css'
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({ filename: 'app.bundle.css' }),
        new HtmlWebpackPlugin({
            title: 'kwizzy',
            template: './src/index.html',
        }),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        }),
        new FaviconsWebpackPlugin('./src/assets/images/favicon.ico'),
        // new MakeDirWebpackPlugin({
        //     dirs: [
        //         { path: './build/download/android' },
        //     ]
        // })
    ],
    optimization: {
        // minimizer: [new UglifyJsPlugin()],
    },
    output: {
        path: path.resolve(__dirname, '../', 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './build',
        port: 9001,
        hot: true,
        host:'0.0.0.0',
        open: true,
        historyApiFallback: true,

    },
};