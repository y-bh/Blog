/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-19 12:57:38
 */


const appConfig = require("config/app.config")
import Requeset from "./baseRequest"
let baseURL = `${appConfig.url}`;
const service = new Requeset(baseURL)
module.exports = service