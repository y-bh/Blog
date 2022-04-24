/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 本地开发环境工程
 * @Date: 2022-04-22 16:57:08
 * @LastEditTime: 2022-04-24 10:44:34
 */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require("../config/app.config")


// css
//配置css适配
const px2remOptions = {
  replace: false
};
const postCssOptions = {
  map: true
};

const Sass = require('gulp-sass')(require('sass')) //编辑sass
const Autoprefixer = require("gulp-autoprefixer"); // 添加 CSS 浏览器前缀
const px2rem = require('gulp-px2rem'); //浏览器适配





// css 编译sass 文件 并加入浏览器前缀
async function css() {
  console.log("任务运行了")
  return await gulp.src(config.src + "/static/css/*.scss")
    .pipe(Sass()) //编译sass
    .pipe(gulp.src(config.src + "/static/cssmin/*.css"))
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(Autoprefixer({
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(30deg);
      //        transform: rotate(30deg);
      remove: false, //是否去掉不必要的前缀 默认：true
    }))
    .pipe(gulp.dest(config.src + "/static/cssmin")) //当前对应css文件
}

function cssMin() {
  gulp.task('cssMin', function () {
    var stream = gulp.src(config.src + "/static/css/*.scss")
      .pipe(Sass()) //编译sass
      .pipe(gulp.src(config.src + "/static/cssmin/*.css"))
      .pipe(px2rem(px2remOptions, postCssOptions))
      .pipe(Autoprefixer({
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(30deg);
        //        transform: rotate(30deg);
        remove: false, //是否去掉不必要的前缀 默认：true
      }))
      .pipe(gulp.dest(config.src + "/static/cssmin")) //当前对应css文件


    return stream // important for gulp-nodemon to wait for completion
  })
}





module.exports = { css,cssMin }