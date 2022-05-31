/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 个人中心开发环境配置
 * @Date: 2022-04-25 16:16:31
 * @LastEditTime: 2022-05-26 14:46:46
 */

const gulp = require('gulp');
const path = require("path")

const webpack = require("webpack")
const webpackStream = require('webpack-stream');

const webpackConfig = require("../config/webpack.config");
const appConfig = require("config/app.config.js")

//webpack 本地开发任务
async function webpackDev () {
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
        watch: true,
        plugins: [
          ...webpackConfig.plugins,
          new webpack.DefinePlugin({
            'process.env.APP_ENV': "'local'",
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
          }),
          //设置全局变量
          new webpack.DefinePlugin({
            'process.env.common': appConfig.globalConfig,
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
          })
        ]
      }
    ))
    .pipe(gulp.dest('src/client/public'));
}


//webpack 生产打包任务
async function webpackProd () {
  console.log("个人中心:生产环境构建任务")
  return await gulp.src('src/client_m/index.js')
    .pipe(webpackStream(
      {
        mode: 'production',
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins,
          //设置全局变量
          new webpack.DefinePlugin({
            'process.env.common': appConfig.globalConfig
          })
        ]


      }
    ))
    .pipe(gulp.dest('src/client/public'));
}



module.exports = { webpackProd, webpackDev }