let gulp = require('gulp');
let webpack = require('webpack');
let replace = require('gulp-replace');
let webpackdevserver = require('webpack-dev-server');
let webpackConfig = require('./webpack.config.js').webpackConfig;
let Config = require('./webpack.config.js').config;
let spawn = require('child_process').spawn;
const del = require('del');


/**
 * 删除dist文件
 */
let delDist = function () {
    del.sync(webpackConfig.output.path);
};

/**
 * 编译并返回compiler
 * @returns {*}
 */
let compile = function () {
    return webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw err;
        }
    });
};

/**
 * 获取webpack-server配置
 * @param makeProxy
 * @returns {{inline: boolean, contentBase: *, hot: boolean, disableHostCheck: boolean, historyApiFallback: boolean, stats: {colors: boolean}}}
 */
let getServerConfig = function () {
    let serverConfig = {
        inline: true,
        contentBase: webpackConfig.output.path,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    };
    if (Config.makeProxy && Config.proxyTarget) {
        serverConfig.proxy = {
            "/api": {
                target: Config.proxyTarget,
                changeOrigin: true
            }
        };
    }
    return serverConfig;
};


/**
 * gulp dev
 * 本地不要压缩代码 不要公用处理 需要设置proxy
 */
gulp.task('dev', function () {
    webpackConfig.plugins = webpackConfig.plugins.slice(0, 1);
    webpackConfig.output.publicPath='/';
    let compiler = compile();
    const server = new webpackdevserver(compiler, getServerConfig());
    server.listen(8084, '127.0.0.1', function () {
    });
    setTimeout(function () {
        spawn('open', ['http://h6.crmpre.adbaitai.com'])
    }, 20000);
});


/**
 * 本地开发
 * 使用代理接口
 * 注意：登录接口不能代理
 */
gulp.task('devproxy', function () {
    let reaplaceLoader = {
        test: /config\.js$/,
        loader:"string-replace-loader",
        query:{
            search:"//crmpre.adbaitai.com",
            replace:""
        }
    };
    webpackConfig.module.loaders.push(reaplaceLoader);
    delete webpackConfig.entry.mock;
    Config.makeProxy = true;
    gulp.start('dev');
});

/**
 * 本地开发
 * 使用预发接口
 */
gulp.task('devpre', function () {
    delete webpackConfig.entry.mock;
    gulp.start('dev');
});

/**
 * 预发发布
 * 去除devtool和mock
 */
gulp.task('pre', function () {
    delete webpackConfig.devtool;
    delete webpackConfig.entry.mock;
    compile();
    gulp.src('./src/app/viewer/tpl/*.html')
        .pipe(gulp.dest(webpackConfig.output.path+'/tpl'))
});

/**
 * 上线
 * 比预发多了一个replace操作
 */
gulp.task('replace', function () {
    gulp.src(webpackConfig.output.path + '/**/**')
        .pipe(replace('//gamepre.ltyun.cc', '//game.ltyun.cc'))
        .pipe(replace('//crmpre.adbaitai.com', '//crm.adbaitai.com'))
        .pipe(gulp.dest(webpackConfig.output.path));
});

