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

import { AESAUTH, encrypt, decrypt } from "./AES";

class ServiceAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout)
    // 请求拦截器
    this.service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';

      //参数加密
      if (AESAUTH[config.url]) {
        if (typeof config.data === 'string') {
          config.data = config.data.trim()
          config.data = JSON.parse(config.data)
        }
        config.data.data = encrypt(config.data.data)
      }

      //自定义headers
      if (config.token) {
        console.log("服务端cookie")
        config.headers['TQ-TOKEN'] = config.token;
      }

      console.log("请求参数:",config.data)
      return config;
    }, error => {
      return Promise.reject(error);
    });

  }


  /**
 * 封装get方法
 * @param url
 * @param data
 * @param token  登录后token
 * @returns {Promise}
 */
  get(url, params = {}, token) {
    try {
      return this.service({
        url,
        params,
        method: 'GET',
        token
      });
    } catch (error) {

    }

  }



  /**
* 封装post请求
* @param url
* @param data
* @param token  登录后token
* @returns {Promise}
*/
  post(url, data = {}, token) {
    try {
      return this.service({
        url,
        method: 'POST',
        data: JSON.stringify(data),
        token
      });
    } catch (error) {

    }
  }

}


const service = new ServiceAjax(baseURL)
module.exports = service