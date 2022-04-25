/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-25 13:44:10
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
  m_dest: path.join(__dirname, '../client/views/manager'),  //个人中心打包目录
  
  m_address: 'http://localhost', //spa 服务地址

  m_port: 8081,//服务端口

  m_stylelint: false, //是否开启css检查

  m_eslint: false, // 是否开启js检查

  m_devtool: 'inline-source-map',

  m_assetsPublicPath: '/',//web访问目录
}



module.exports = config;