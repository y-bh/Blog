
import axios from 'axios';


class Request {

  constructor(baseURL, timeout = 4000) {
    let service = axios.create({
      baseURL,
      withCredentials: true,
      timeout
    });


    // 客户端 | 服务端 响应拦截器
    service.interceptors.response.use(response => {

      console.log("------------------Response-----------------")

      return response

    },
      error => {
        console.log("--------响应拦截----出错了------");
        return Promise.resolve({
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
