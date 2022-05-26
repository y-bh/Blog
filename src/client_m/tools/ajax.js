/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: Ajax 封装
 * @Date: 2022-04-26 13:45:01
 * @LastEditTime: 2022-05-26 14:47:22
 */


import Requeset from "nodeUtils/baseRequest"
import { AESAUTH, encrypt, decrypt } from "nodeUtils/AES";
let baseURL = '/javaProxy';


class ClientAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout = 4000)
    this.service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';  //联调需要，可以删掉
      let token = getCookie('TQ-TOKEN')
      if (token) {
        config.headers['TQ-TOKEN'] = token;
      }

      // 部分接口加密  && process.env.NODE_ENV !== 'development'
      if (AESAUTH[config.url]) {
        if (typeof config.data === 'string') {
          config.data = config.data.trim()
          config.data = JSON.parse(config.data)
        }

        //因为本地代理走node 代理，造成二次加密， 这边特殊处理下本地开发环境下
        if (process.env.APP_ENV === 'local') {
          return config
        }

        config.data.data = encrypt(config.data.data)
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });


  }
}













const service = new ClientAjax(baseURL)

// console.log("service--------------------》",service)
export default service



