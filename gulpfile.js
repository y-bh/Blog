
/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 前端工程文件
 * @Date: 2022-04-11 13:50:30
 * @LastEditTime: 2022-05-23 17:51:59
 */

require('module-alias/register')
const webpackConfig = require('./src/build/webpack')
var gulp = require('gulp')
var nodemon = require('gulp-nodemon')


//本地开发环境任务
require("./src/build/gulp.dev");
gulp.task('develop', gulp.series("clean", "JsComplie", "CssComplie", 'ImageComplie', "ThirdPlugin", 'HandleFont', 'DownloadZip', webpackConfig.webpackDev, function (done) {
  console.info("开发环境工程编译完成,开启启动应用")
  var stream = nodemon({
    script: './start.js',
    env: { 'NODE_ENV': 'development' }
    , ext: 'js'
    , ignore: ['./node_modules', './client', './client_m'],
    "delay": 1000,
    stdout: true,
    done: done,
  }
  )
  stream.on("restart", function (err, res) {
    console.log("重启nodemon", err)

    //监听css/scss 变化
    gulp.watch([
      'src/client/static/css/*.scss', 'src/client/static/css/*.css'
    ], gulp.series('CssComplie'))


    //监听js 变化
    gulp.watch([
      'src/client/static/js/*.js'
    ], gulp.series('JsComplie'))


    //监听imagers 变化
    gulp.watch([
      'src/client/static/images/**'
    ], gulp.series('ImageComplie'))

    //监听三方组件 变化
    gulp.watch([
      'src/client/static/lib/**'
    ], gulp.series('ThirdPlugin'))


    //监听三方组件 变化
    gulp.watch([
      'src/client/static/font/**'
    ], gulp.series('HandleFont'))

    //监听下载zip 变化
    gulp.watch([
      'src/client/static/download/**'
    ], gulp.series('DownloadZip'))
  })
}
))


//生产环境打包任务 【官网seo页面 与 个人中心 同步构建】
const prodServer = require("./src/build/gulp.build")
function buildCompile() {
  return gulp.series(webpackConfig.webpackProd, prodServer.JsComplie, prodServer.CssComplie, prodServer.ThirdPlugin, prodServer.HandleFont, prodServer.ImageComplie,prodServer.DownloadZip)
}

//生产环境
exports.build = buildCompile()

//暂定 以后可能会用到
exports["build:test"] = gulp.parallel(prodServer.setEnv('test'), buildCompile())











