/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 提供给node 端和 客户端的基础ajax 服务
 * @Date: 2022-05-19 12:31:07
 * @LastEditTime: 2022-05-21 20:58:27
 */

import axios from 'axios';
import { inject } from "vue";
class Request {
  
  constructor(baseURL, timeout = 10000) {
    let service = axios.create({
      baseURL,
      withCredentials: true,
      timeout
    });

    let message = inject('message');

    // 请求拦截器
    service.interceptors.request.use(config => {
      config.headers.xx_uid = 7567
      config.headers['Content-Type'] = 'application/json';  //联调需要，可以删掉
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
          console.log("ccccccccc",data, data.message)
          // message.error({
          //   message: data.msg || data.message || '接口异常',
          //   showClose: true
          // })
          return {
            code: -1,
            message:  data.message || '接口异常'
          };
        }
      }
      return response && response.data || response;
    },
      error => {
        
      });

    this.service = service
  }



  /**
   * 封装proxyAxios方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  proxyAxios(url, method, data,headers) {
    
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
