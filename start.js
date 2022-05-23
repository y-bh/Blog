/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 项目启动文件
 * @Date: 2022-04-22 15:36:56
 * @LastEditTime: 2022-05-18 16:51:58
 */

//加babel 编译
require('babel-register')({
  presets: ['env']
})
require('babel-polyfill');
require('module-alias/register')

//获取当前环境

const lists = process.argv
console.log("ccccccccccccccccccccccccccccc",lists)
let envs = lists[lists.length - 1].slice(2).trim()
console.log("vvvvvvvvvvvvvvvvv",envs)
//当前项目环境: 目前有 测试环境  开发环境【develop】 测试环境【test】 生产环境【production】
const allEnvs = ['local', 'develop', 'test', 'production']


//兜底开发环境
if (!envs || !allEnvs.includes(envs)) {
  envs = allEnvs[0]
}

process.APP_ENV = `${envs}`

console.log("envs----------》:", envs, process.APP_ENV)






module.exports = require("./src/App")