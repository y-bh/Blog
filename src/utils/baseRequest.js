/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 提供给node 端和 客户端的基础ajax 服务
 * @Date: 2022-05-19 12:31:07
 * @LastEditTime: 2022-05-19 15:29:48
 */

import axios from 'axios';
class Request {

  constructor(baseURL, timeout = 10000) {
    let service = axios.create({
      baseURL,
      withCredentials: true,
      timeout
    });
    // 请求拦截器
    service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';  //联调需要，可以删掉
      return config;
    }, error => {

      return Promise.reject(error);
    });

    // 响应拦截器
    service.interceptors.response.use(response => {
      // console.log(response,'response***********');
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
            code: -1,
            msg: data.message
          };
        }
      }
      return response.data;
    },
      error => {

        console.error("响应报错:", error)

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
