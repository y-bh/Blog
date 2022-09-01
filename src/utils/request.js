

const appConfig = require("config/app.config")
import Requeset from "./baseRequest"
let baseURL = `${appConfig.url}`;

class ServiceAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout)
    // 请求拦截器
    this.service.interceptors.request.use(config => {

      console.log("------------interceptors Request----------------")

      console.log("----------------", config, "--------------------")

      return config;
    }, error => {
      return Promise.reject(error);
    });

    this.service.interceptors.response.use(config => {

      console.log("------------interceptors Reponse----------------")

      if(config.status === 200) {
        return config.data
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

    /**
* 封装post请求
* @param url
* @param data
* @param token  登录后token
* @returns {Promise}
*/
postJson(url, data = {}, token) {
  try {
    return this.service({
      url,
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      },
      token
    });
  } catch (error) {

  }
}

}


const service = new ServiceAjax(baseURL)
module.exports = service