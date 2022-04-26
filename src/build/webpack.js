/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心开发环境配置
 * @Date: 2022-04-25 16:16:31
 * @LastEditTime: 2022-04-26 12:02:45
 */

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpackConfig = require("../config/webpack.config");
const path = require("path")



//webpack 本地开发任务
async function webpackDev() {
  console.log("个人中心:本地开发环境构建任务")
  return await gulp.src('src/client_m/index.js')
    .pipe(webpackStream(
      {
        ...webpackConfig,
        mode: 'development',
        entry: '../client_m/index.js',
        output: {
          path: path.resolve(__dirname, "../client/public"),
          filename: 'manager/js/[name].[contenthash].js',
          publicPath: '/'
        },
        watch: true
      }
    ))
    .pipe(gulp.dest('src/client/public'));
}



//webpack 生产打包任务
async function webpackProd() {
  console.log("个人中心:生产环境构建任务")
  return await gulp.src('src/client_m/index.js')
    .pipe(webpackStream(
      {
        ...webpackConfig,
        mode: 'production',
      }
    ))
    .pipe(gulp.dest('src/client/public'));
}



module.exports = { webpackProd, webpackDev }