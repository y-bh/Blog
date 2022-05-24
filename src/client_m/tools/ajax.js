/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: Ajax 封装
 * @Date: 2022-04-26 13:45:01
 * @LastEditTime: 2022-05-21 11:04:45
 */


import Requeset from "nodeUtils/baseRequest"
import { AESAUTH, encrypt, decrypt } from "nodeUtils/AES";
let baseURL = '/javaProxy';


class ClientAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout = 4000)
    this.service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';  //联调需要，可以删掉

      // 部分接口加密  && process.env.NODE_ENV !== 'development'
      if (AESAUTH[config.url]) {
        if (typeof config.data === 'string') {
          config.data = config.data.trim()
          config.data = JSON.parse(config.data)
        }
        config.data.data = encrypt(config.data.data)
      }

      let token = getCookie('TQ-TOKEN')
      console.log("客户端cookie", token)
      if (token) {
        config.headers['TQ-TOKEN'] = token;
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



