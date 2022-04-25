/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心开发环境配置
 * @Date: 2022-04-25 16:16:31
 * @LastEditTime: 2022-04-25 18:09:29
 */

const gulp = require('gulp');
const webpack = require('webpack-stream');


// gulp.task('default', function () {
//   return gulp.src('src/entry.js')
//     .pipe(webpack())
//     .pipe(gulp.dest('dist/'));
// });



//webpack 本地开发任务
async function webpackDev() {
  console.log("开始构建webpack")
  return await gulp.src('src/client_m/index.js')
    .pipe(webpack(
      {
        ...require("../config/webpack.config"),
        mode: 'development',
      }
    ))
    .pipe(gulp.dest('src/client/views'));
}



//webpack 生产打包任务
async function webpackProd() {
  console.log("开始构建 生产环境webpack")
  return await gulp.src('src/client_m/index.js')
    .pipe(webpack(
      {
        ...require("../config/webpack.config"),
        mode: 'production',
      }
    ))
    .pipe(gulp.dest('src/client/public'));
}


async function webpackTemplate() {
  console.log("转译模板")
  return await gulp.src('src/client/public/manager.html')
    .pipe(gulp.dest('src/client/views/manager.html'));
}

module.exports = { webpackDev ,webpackProd,webpackTemplate}