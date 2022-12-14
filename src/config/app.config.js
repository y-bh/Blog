

const path = require("path")
const resolve = (dir) => {
  return path.join(__dirname, "../" + dir);
}

const envConfig = require(`@/.env.${process.env.APP_ENV || 'local'}`)

console.log("环境配置文件:", process.env.APP_ENV ,envConfig)

var config = {
  //html模板目录
  templates: resolve('/client/views'),

  //静态资源构建前 源目录
  sourceDir: resolve("/client/static"),

  //静态资源 构建后输出目录
  static: resolve('/client/public'),

  //本应用启动端口
  appPort: '3000',

  //与java端通信地址
  url: envConfig.API,


  //个人中心相关工程配置 带前缀 m

  //个人中心源码目录
  client_m: resolve('/client_m'),

  //全局变量配置
  globalConfig: envConfig

}



module.exports = config;