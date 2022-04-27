/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 项目启动文件
 * @Date: 2022-04-22 15:36:56
 * @LastEditTime: 2022-04-25 16:10:07
 */

//加babel 编译
require('babel-register')({
  presets: ['env']
})
require('babel-polyfill');
require('module-alias/register')

module.exports = require("./src/App")