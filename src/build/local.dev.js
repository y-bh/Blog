/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 本地开发环境工程
 * @Date: 2022-04-22 16:57:08
 * @LastEditTime: 2022-04-24 13:46:33
 */


const gulp = require('gulp');
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



//注册css编译任务
// gulp.task('cssMin', function () {
//   var stream = gulp.src(config.src + "/static/css/*.scss")
//     .pipe(Sass()) //编译sass
//     .pipe(px2rem(px2remOptions, postCssOptions))
//     .pipe(Autoprefixer({
//       cascade: true, //是否美化属性值 默认：true 像这样：
//       remove: false, //是否去掉不必要的前缀 默认：true
//     }))
//     .pipe(gulp.dest(config.src + "/static/cssmin")) //当前对应css文件
//   return stream
// })



var cssSource = `${config.src}/static/css`
var cssDest = `${config.src}/static/css`

// css 编译sass 文件 并加入浏览器前缀
async function css() {
  console.log("编译css")
  return await gulp.src(cssSource + "/*.scss")
    .pipe(Sass()) //编译sass
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(Autoprefixer({
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: false, //是否去掉不必要的前缀 默认：true
    }))
    .pipe(gulp.dest(config.src + "/static/cssmin")) //当前对应css文件
}


gulp.task('cssMin2', function () {

  console.log("编译css2")
  return gulp.src(cssSource + "/*.scss")
    .pipe(Sass()) //编译sass
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(Autoprefixer({
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: false, //是否去掉不必要的前缀 默认：true
    }))
    .pipe(gulp.dest(config.src + "/static/cssmin")) //当前对应css文件
})






gulp.task('hotUpdate', function (cd) {
  // gulp.watch('src/component/**', devConfig.html); // 监听HTML变化
  // gulp.watch('src/views/**/*.html', devConfig.html); // 监听HTML变化
  // gulp.watch('staticsrc/js/*.js', gulp.series(devConfig.js)); // 监听js变化
  gulp.watch([`${cssSource}/*.scss`, `${cssSource}/*.css`], gulp.series(css)); // 监听css变化
  // gulp.watch('src/images/*', gulp.series(devConfig.image)); // 监听image变化
  cd()
})


function gulpWatch(cd) {
  console.log("开启监听")
  gulp.watch([`${cssSource}/*.scss`, `${cssSource}/*.css`], function(cb){

    console.log("文件变化")
   
  }); // 监听css变化
  cd()
}
module.exports = { css, gulpWatch }



