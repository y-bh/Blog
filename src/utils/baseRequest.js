/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 提供给node 端和 客户端的基础ajax 服务
 * @Date: 2022-05-19 12:31:07
 * @LastEditTime: 2022-05-24 16:37:56
 */

import axios from 'axios';
import { AESAUTH, encrypt, decrypt } from "./AES";

class Request {

  constructor(baseURL, timeout = 4000) {
    let service = axios.create({
      baseURL,
      withCredentials: true,
      timeout
    });


    // 请求拦截器
    service.interceptors.request.use(config => {
      // 去除所有空格


      // 部分接口加密  && process.env.NODE_ENV !== 'development'
      if (AESAUTH[config.url]) {
        // config.headers['Content-Type']='text/plain';
        if (typeof config.data === 'string') {
          config.data = config.data.trim()
          config.data = JSON.parse(config.data)

        }
        
        config.data.data = encrypt(config.data.data)

        
      } else {
        config.headers['Content-Type'] = 'application/json';  //联调需要，可以删掉
      }


      if(config.token){
        config.headers['TQ-TOKEN'] = config.token;
      } else {
        try {
          //客户端使用 场景
          if (getCookie && document) {
            let token = getCookie('TQ-TOKEN')
            if (token) {
              config.headers['TQ-TOKEN'] = token;
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      

      return config;
    }, error => {

      return Promise.reject(error);
    });

    // 响应拦截器
    service.interceptors.response.use(response => {
      // 响应正确
      if (response.status >= 200 && response.status <= 210) {
        const data = response.data;

        if (+data.code === 200) {
          return {
            code: 200,
            data: data.data
          };
        } else {

          return {
            code: data.code || -1,
            message: data.message || '接口异常'
          };
        }
      }
      return response && response.data || response;
    },
      error => {
        
        return Promise.resolve({
          code: error.response && error.response.data && error.response.data.code ||-1,
          message: error
        })
      });

    this.service = service
  }



  /**
   * 封装proxyAxios方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  proxyAxios(url, method, data, headers) {

    try {
      return this.service({
        url,
        data,
        method,
        headers
      });
    } catch (error) {

    }
  }

  /**
   * 封装get方法
   * @param url
   * @param data
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
  * @returns {Promise}
  */
  post(url, data = {}) {
    try {
      return this.service({
        url,
        method: 'POST',
        data: JSON.stringify(data)
      });
    } catch (error) {

    }
  }

  /**
  * 封装put请求
  * @param url
  * @param data
  * @returns {Promise}
  */
  put(url, data = {}) {
    try {
      return this.service({
        url,
        method: 'PUT',
        data: JSON.stringify(data)
      });
    } catch (error) {

    }
  }

  /**
  * 封装put请求
  * @param url
  * @param data
  * @returns {Promise}
  */
  del(url, data = {}) {
    try {
      return this.service({
        url,
        method: 'DELETE',
        data: JSON.stringify(data)
      });
    } catch (error) {

    }
  }

}


export default Request
