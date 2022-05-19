/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: Ajax 封装
 * @Date: 2022-04-26 13:45:01
 * @LastEditTime: 2022-05-19 15:02:30
 */


import Requeset from "nodeUtils/baseRequest"

let baseURL = '/javaProxy';
const service = new Requeset(baseURL)

console.log("service--------------------》",service)
export default service



