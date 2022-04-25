
/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 前端工程文件
 * @Date: 2022-04-11 13:50:30
 * @LastEditTime: 2022-04-25 18:26:50
 */


const localServerConfig = require("./src/config/ssr.config")

var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
const path = require("path")



const webpackConfig = require('./src/build/webpack')

//webpack打包任务
exports.webpack = gulp.series(webpackConfig.webpackProd)


//本地开发环境任务
require("./src/build/local.dev");
gulp.task('develop', gulp.series("clean", "JsComplie", "CssComplie", 'ImageComplie', "ThirdPlugin", function (done) {
  console.info("开发环境工程编译完成,开启启动应用")
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


//服务端生产环境任务
const prodServer = require("./src/build/serve.build")
exports.build = gulp.series(webpackConfig.webpackProd, prodServer.JsComplie, prodServer.CssComplie, prodServer.ThirdPlugin, prodServer.HandleFont, prodServer.ImageComplie)




