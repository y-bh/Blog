/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 本地开发环境工程
 * @Date: 2022-04-22 16:57:08
 * @LastEditTime: 2022-04-24 17:20:44
 */


const gulp = require('gulp');

const localConfig = require("../config/ssr.config")




// css
const Sass = require('gulp-sass')(require('sass')) //编辑sass
const Autoprefixer = require("gulp-autoprefixer"); // 添加 CSS 浏览器前缀
const px2rem = require('gulp-px2rem'); //浏览器适配


//js


//清空目录
const Clean = require("gulp-clean"); // 清理目录


//注册js编译任务
gulp.task('JsComplie', function () {
  console.info("编译js任务")
  return gulp.src(localConfig.sourceDir + "/js/*.js")
    .pipe(gulp.dest(localConfig.destDir + "/js")) // 拷贝
})



//注册css编译任务
const px2remOptions = {
  replace: false
};
const postCssOptions = {
  map: true
};

gulp.task('CssComplie', function () {
  console.info("编译css任务")
  return gulp.src([localConfig.sourceDir + "/css/*.scss", localConfig.sourceDir + "/css/*.css"])
    .pipe(Sass()) //编译sass
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(Autoprefixer({
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: false, //是否去掉不必要的前缀 默认：true
    }))
    .pipe(gulp.dest(localConfig.destDir + "/css")) //当前对应css文件
})


//注册处理三方库
gulp.task('ThirdPlugin', function () {
  console.log("处理三方库任务")
  return gulp.src(localConfig.sourceDir + "/lib/**").pipe(gulp.dest(localConfig.destDir + "/lib", { sourcemaps: false }))
})




//注册图片任务
gulp.task('ImageComplie', function () {
  console.log("编译图片任务")
  return gulp.src(localConfig.sourceDir + "/images/**/*.*")
    .pipe(gulp.dest(localConfig.destDir + "/images"));
})





gulp.task('clean', function () {
  console.log("清空目录任务")
  return gulp.src(localConfig.destDir, { allowEmpty: true }).pipe(Clean());
})





