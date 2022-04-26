/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-26 14:14:40
 */

const path = require("path")

var config = {
  //静态资源目录
  static: path.join(__dirname, '../client/public'),

  //html模板目录
  templates: path.join(__dirname, '../client/views'),

  //本应用启动端口
  appPort: '8080',

  //与java端通信地址
  url: 'http://localhost:8089',


  //个人中心相关工程配置 带前缀 m

  //个人中心源码目录
  client_m: path.join(__dirname, '../client_m'),

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