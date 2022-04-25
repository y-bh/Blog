/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心开发环境配置
 * @Date: 2022-04-25 16:16:31
 * @LastEditTime: 2022-04-25 16:31:24
 */

const gulp = require('gulp');
const webpack = require('webpack-stream');


// gulp.task('default', function () {
//   return gulp.src('src/entry.js')
//     .pipe(webpack())
//     .pipe(gulp.dest('dist/'));
// });


async function webpackDev() {
  console.log("开始构建webpack")
  return await gulp.src('src/client_m/index.js')
    .pipe(webpack(
      require("../config/webpack.config")
    ))
    .pipe(gulp.dest('src/client/views'));
}


module.exports = {webpackDev}