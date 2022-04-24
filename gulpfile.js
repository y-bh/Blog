
/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 前端工程文件
 * @Date: 2022-04-11 13:50:30
 * @LastEditTime: 2022-04-24 16:56:35
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
const localServerConfig = require("./src/config/ssr.config")



var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

const path = require("path")





//本地开发环境任务
require("./src/build/local.dev");
gulp.task('develop', gulp.series("JsComplie","CssComplie", "ThirdPlugin", function (done) {
  console.info("开发环境工程")

  var stream = nodemon({
    script: './start.js'
    , ext: 'js html css scss'
    , ignore: ['./node_modules'],
    "delay": 1000,
    stdout: false,
    done: done,
    tasks: function (changedFiles = []) {
      var tasks = []
      const sourceDIR = (path.dirname(localServerConfig.sourceDir)).slice(2) + `${path.sep}${path.basename(localServerConfig.sourceDir)}`;

      console.log("changedFiles 过滤前", sourceDIR, changedFiles)
      //获取需要gulp 编译的文件
      changedFiles = changedFiles.filter((file) => {
        let dirs = (path.dirname(file)).slice(2)
        return dirs.includes(sourceDIR)
      })
      console.log("changedFiles 过滤后", changedFiles)

      if (!changedFiles.length) return tasks;


      changedFiles.forEach(function (file) {
        let ext = (path.extname(file)).slice(1)
        console.info("ext", ext)

        //处理css 任务
        if ((ext === 'scss' || ext === 'css') && !~tasks.indexOf('CssComplie')) {
          tasks.push('CssComplie')
        }


        //处理js任务
        if (ext === 'js' && !~tasks.indexOf('JsComplie')) {
          tasks.push('JsComplie')
        }


      })
      return tasks
    }
  }
  )
  // stream.on("restart", function (err, res) {
  //   console.log("重启nodemon", err)
  // })
}
))




