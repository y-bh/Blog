/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-25 11:21:03
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


  //个人中心本地开发环境代理


  //个人中心服务端口


  //个人中心服务地址


}



module.exports = config;