/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 提供给node 端和 客户端的基础ajax 服务
 * @Date: 2022-05-19 12:31:07
 * @LastEditTime: 2022-05-24 19:54:58
 */

import axios from 'axios';

export const getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}


class Request {

  constructor(baseURL, timeout = 4000) {
    let service = axios.create({
      baseURL,
      withCredentials: true,
      timeout
    });


    // 客户端 | 服务端 响应拦截器
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
            message: JSON.stringify(data.message) || '接口异常'
          };
        }
      }
      return response && response.data || response;
    },
      error => {

        return Promise.resolve({
          code: error.response && error.response.data && error.response.data.code || -1,
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
