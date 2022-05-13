/*
 * @Author: 朱占伟
 * @LastEditors: 李云涛
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-05-13 13:53:57
 */

const path = require("path")
const resolve = (dir) => {
  return path.join(__dirname, "../" + dir);
}


var config = {
  //html模板目录
  templates: resolve('/client/views'),

  //静态资源构建前 源目录
  sourceDir: resolve("/client/static"),

  //静态资源 构建后输出目录
  static: resolve('/client/public'),

  //本应用启动端口
  appPort: '8080',

  //与java端通信地址
  // url: 'http://127.0.0.1:17001',


  //个人中心相关工程配置 带前缀 m

  //个人中心源码目录
  client_m: resolve('/client_m'),

  //开发环境全局变量配置
  development_m: {
    NODE_NAME: '"开发环境"',
    NODE_ENV: '"development"',
    API: "'http://localhost:8089'", // 域名
  },

  //生产环境全局变量配置
  production_m: {
    NODE_NAME: '"生产环境"',
    NODE_ENV: '"production"',
    API: "'https://risk.shenlongip.com'", // 域名
  }
}



module.exports = config;