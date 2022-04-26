/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-26 13:49:05
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
}



module.exports = config;