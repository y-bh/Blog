
/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 前端工程文件
 * @Date: 2022-04-11 13:50:30
 * @LastEditTime: 2022-04-24 13:59:28
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





const config = require("./src/config/app.config")



var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

const path = require("path")





//本地开发环境任务
require("./src/build/local.dev");
const local = require("./src/build/local.dev");

gulp.task('develop', gulp.series("cssMin2", function (done) {
  console.info("开发环境工程")

  var stream = nodemon({
    script: './start.js'
    , ext: 'js html css scss'
    , ignore: ['./node_modules'],
    done: done,
    tasks: function (changedFiles) {
      var tasks = []
      if (!changedFiles) return tasks;
      changedFiles.forEach(function (file) {

        console.log("文件改变",changedFiles)

        if (path.extname(file) === '.scss' && !~tasks.indexOf('cssMin2')) tasks.push('cssMin2')
      })
      return tasks
    }
  }
  )
  stream.on("restart", function (err, res) {
    console.log("重启nodemon", err)
  })
}
))




