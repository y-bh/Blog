/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-04-22 17:18:50
 * @LastEditTime: 2022-04-24 11:33:54
 */
/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 前端工程文件
 * @Date: 2022-04-11 13:50:30
 * @LastEditTime: 2022-04-12 16:15:50
 */




// //本地开发环境
// const {localServe} = require('./src/build/local.dev.js');


// //本地开发环境热更新功能
// function gulpWatch() {
//   gulp.watch('src/component/**', devConfig.html); // 监听HTML变化
//   gulp.watch('src/views/**/*.html', devConfig.html); // 监听HTML变化
//   gulp.watch('src/js/*.js', gulp.series(devConfig.js)); // 监听js变化
//   gulp.watch(['src/css/*.scss','src/css/*.css'], gulp.series(devConfig.css)); // 监听css变化
//   gulp.watch('src/images/*', gulp.series(devConfig.image)); // 监听image变化
// }
// console.log("xxxxxxxxxxxxxxxx",localServe())

// exports.dev = gulp.series(localServe);


const localServe = require("./src/build/local.dev")
const config = require("./src/config/app.config")

var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
 
  const { task } = require('gulp');

  const Replace = require('gulp-replace');//替换h内容
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



  gulp.task('cssMin', function () {
    var stream = gulp.src(config.src + "/static/css/*.scss")
      .pipe(Sass()) //编译sass
      .pipe(px2rem(px2remOptions, postCssOptions))
      .pipe(Autoprefixer({
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove: false, //是否去掉不必要的前缀 默认：true
      }))
      .pipe(gulp.dest(config.src + "/static/cssmin")) //当前对应css文件
    return stream 
  })


gulp.task('develop',gulp.series( function () {
  var stream = nodemon({ script: './start.js'
          , ext: 'css scss'
          , ignore: ['./node_modules'],
            watch:    [config.src+'/static/css/home.scss']
          , tasks: ['cssMin'] })
 
  stream
      .on('restart', function () {
        console.log('restarted!')
      })
}))



exports.css = gulp.series(localServe.css)