/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-24 14:03:32
 */

const path = require("path")

var config = {
  //静态文件目录
  static: path.join(__dirname, '../client/public'),

  //模板文件目录
  templates: path.join(__dirname, '../client/views'),

  //应用端口
  appPort: '8080',

  //个人中心本地开发环境代理


  //个人中心服务端口



  //个人中心服务地址

  //seo 页面

  //打包源码目录
  src: path.join(__dirname, '../client'),


}



module.exports = config;