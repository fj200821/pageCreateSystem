const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


let plugins = [];
plugins.push(new HtmlWebpackPlugin({
    template: './src/app.html',
}));
plugins.push(new UglifyJSPlugin());
plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "commonjs",
    filename: "common.[chunkhash].js"
}));

const webpackConfig = {
    entry: {
        mock: "./mock/mock.js",
        index: "./src/index.js"
    },
    devtool: "dev-source-map",
    output: {
        filename: "bundle.[chunkhash].js",
        path: __dirname+ "/dist/page",
        publicPath: "/mofang/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {test: /\.(html|tpl)$/, loader: 'html-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.css/, loader: 'style-loader!css-loader'},
            {test: /\.ejs/, loader: 'ejs-loader?variable=data'}
        ]
    },
    plugins: plugins
};

const config = {
    proxyTarget:"http://192.168.10.120" //设置proxy需要 ./src/config.js apiHost将强制设置为空 协议头不能为空
};

module.exports = {
    webpackConfig:webpackConfig,
    config:config
};