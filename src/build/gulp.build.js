/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 官网页面生产环境工程
 * @Date: 2022-04-22 16:57:34
 * @LastEditTime: 2022-05-18 16:24:51
 */

const gulp = require('gulp');
var shell = require('shelljs');
const localConfig = require("../config/app.config")

// js
const Uglify = require('gulp-uglify');          // 压缩js
const babel = require('gulp-babel');

// css
const Minifycss = require('gulp-minify-css');   // 压缩css
const Sass = require("gulp-sass")(require('sass')) //编辑sass
const Autoprefixer = require('gulp-autoprefixer');  // 浏览器前缀
const px2rem = require('gulp-px2rem'); //浏览器适配

// image
const imagemin = require('gulp-imagemin'); //压缩图片

// 清理目录
const Clean = require('gulp-clean');



// css 编译sass 文件 并压缩，加入浏览器前缀
const px2remOptions = {
  replace: true
};
const postCssOptions = {
  map: false
};


async function CssComplie() {
  console.info("编译css任务")
  return await gulp.src([localConfig.sourceDir + "/css/*.scss", localConfig.sourceDir + "/css/*.css"])
    .pipe(Sass()) //编译sass
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(Autoprefixer({
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: false, //是否去掉不必要的前缀 默认：true
    }))
    .pipe(Minifycss({   // 压缩css
      //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: true,
      //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: '',
      //类型：Boolean 默认：false [是否保留换行]
      keepBreaks: false,
      //保留所有特殊前缀 当你用autoprefixer生成浏览器前缀，如果不加这个参数，可能将会删除你的部分前缀        
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest(localConfig.static + "/css")) //当前对应css文件
}



// js 检查js文件并压缩，拷贝
async function JsComplie() {
  console.info("编译js任务")
  return await gulp.src(localConfig.sourceDir + '/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(Uglify()) // 压缩js
    .pipe(gulp.dest(localConfig.static + '/js'))
}


// 拷贝image文件并压缩
async function ImageComplie() {
  console.info("压缩images")
  return await gulp.src(localConfig.sourceDir + "/images/**/*.*")
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(localConfig.static + "/images"));
}


//处理三方库
async function ThirdPlugin() {
  console.info("处理第三方组件")
  try {
    return await gulp.src(localConfig.sourceDir + "/lib/**").pipe(gulp.dest(localConfig.static + "/lib", { sourcemaps: false }))
  } catch (error) {
    console.error("ThirdPlugin:", error)
  }
}


//处理字体
async function HandleFont() {
  console.info("处理字体文件")
  try {
    return await gulp.src(localConfig.sourceDir + "/font/**").pipe(gulp.dest(localConfig.static + "/font", { sourcemaps: false }))
  } catch (error) {
    console.error("HandleFont:", error)
  }
}



// clean 清空dist文件内容
async function cleanDir() {
  // 不设置allowEmpty: true会报File not found with singular glob
  return await gulp.src(localConfig.static, { allowEmpty: true }).pipe(Clean());
}


//设置环境变量任务
function setEnv(env) {

  console.log("设置环境白哦了:", env)

  return function (cb) {
    cb()
  }
}







//打包前先删除
shell.rm('-rf', localConfig.static);

module.exports = { setEnv, CssComplie, JsComplie, ImageComplie, cleanDir, ThirdPlugin, HandleFont }