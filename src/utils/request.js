/*
 * @Author: 朱占伟
 * @LastEditors: dengxiujie
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-26 10:20:10
 */


const appConfig = require("config/app.config")
import Requeset from "./baseRequest"
let baseURL = `${appConfig.url}`;

import { AESAUTH, encrypt, decrypt } from "./AES";

const toString = Object.prototype.toString

class ServiceAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout)
    // 请求拦截器
    this.service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';

      //自定义headers
      if (config.token) {
        config.headers['TQ-TOKEN'] = config.token;
      }
      //参数加密
      if (AESAUTH[config.url]) {

        //因为本地代理走node 代理，造成二次加密， 这边特殊处理下本地开发环境下
        if (process.env.APP_ENV === 'local') {
          try {
            if (config.data) {
              config.data = JSON.parse(config.data)
              if (config.data && config.data.data && toString.call(JSON.parse(config.data.data)) === '[object Object]') {
                config.data.data = encrypt(config.data.data)
              } else {
                return config
              }
            }
            return config
          } catch (error) {
            return config
          }
        }

        //非本地开发环境  走nginx 代理; 无需处理二次加密异常
        if (typeof config.data === 'string') {
          config.data = config.data.trim()
          config.data = JSON.parse(config.data)
        }
        config.data.data = encrypt(config.data.data)
      }


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