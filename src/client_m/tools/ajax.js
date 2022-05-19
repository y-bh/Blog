/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: Ajax 封装
 * @Date: 2022-04-26 13:45:01
 * @LastEditTime: 2022-05-19 12:49:48
 */


import Requeset from "nodeUtils/baseRequest"

let baseURL = '/proxy';
const service = new Requeset(baseURL)

console.log("service--------------------》",service)
export default service



