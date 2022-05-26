/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-26 14:22:56
 */


const appConfig = require("config/app.config")
import Requeset from "./baseRequest"
let baseURL = `${appConfig.url}`;
class proxyAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout)
    // 请求拦截器
    this.service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';

      //自定义headers
      if (config.token) {
        config.headers['TQ-TOKEN'] = config.token;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

  }
}

const service = new proxyAjax(baseURL)
module.exports = service