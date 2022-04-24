/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-24 11:23:11
 */

const path = require("path")

var config = {
  //静态文件目录
  static: path.join(__dirname, '../client/static'),

  //模板文件目录
  templates: path.join(__dirname, '../client/views'),

  //应用端口
  appPort: '8080',

  //个人中心本地开发环境代理


  //个人中心服务端口



  //个人中心服务地址

  //seo 页面
  src: path.join(__dirname, '../client'),

  //输出目录
  desc: path.join(__dirname, '../dist'),

  replace: {
    '__URL__': "http://**.com"
  },
}


config = {
  ...config,
  replace_reg: new RegExp(Object.keys(config['replace']).join("|"), "g")
};


module.exports = config;