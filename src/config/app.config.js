/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 应用配置文件
 * @Date: 2022-04-22 16:09:16
 * @LastEditTime: 2022-04-22 16:11:13
 */

const path = require("path")

 module.exports = {
   //静态文件目录
   static: path.join(__dirname,'../client/static'),

   //模板文件目录
   templates :  path.join(__dirname,'../client/views')
   
 }