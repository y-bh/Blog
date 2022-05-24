/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 提供给node 端和 客户端的基础ajax 服务
 * @Date: 2022-05-19 12:31:07
 * @LastEditTime: 2022-05-24 12:41:15
 */

import axios from 'axios';
import { AESAUTH, encrypt, decrypt} from "./AES";

class Request {

  constructor(baseURL, timeout = 10000) {
    let service = axios.create({
      baseURL,
      withCredentials: true,
      timeout
    });


    // 请求拦截器
    service.interceptors.request.use(config => {
      // 去除所有空格
      console.log(config.data,'参数');

      // 部分接口加密  && process.env.NODE_ENV !== 'development'
      if(AESAUTH[config.url] ){
        config.headers['Content-Type']='text/plain';

        console.log(typeof config.data,'参数type值');

        if(typeof config.data === 'string'){
          config.data = config.data.trim()
          config.data = JSON.parse(config.data)
          console.log(config.data, '转格式data');
        }
        console.log(config.data.data,'转过格式data');
        config.data.data = encrypt(config.data.data)
        console.log(config.data.data,'加密数据');
        
      } else {
        config.headers['Content-Type'] = 'application/json';  //联调需要，可以删掉
      }

      try {
        //客户端使用 场景
        if (getCookie && document) {
          let token = getCookie('TQ-TOKEN')
          if (token) {
            config.headers['TQ-TOKEN'] = token;
          }
          console.log("客户端请求")

        }
      } catch (error) {

      }
      console.log(config.data.data,'=======');
      return config;
    }, error => {

      return Promise.reject(error);
    });

    // 响应拦截器
    service.interceptors.response.use(response => {
      // 响应正确
      if (response.status >= 200 && response.status <= 210) {
        const data = response.data;
        console.log(data,'响应');
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
        console.error("接口报错:", error)
        return Promise.resolve({
          code: data.code ||-1,
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
  get(url, params = {}) {
    try {
      return this.service({
        url,
        params,
        method: 'GET'
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
