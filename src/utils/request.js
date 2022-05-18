/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-18 17:08:14
 */
const appConfig = require("config/app.config")
import axios from 'axios';

axios.defaults.withCredentials = true;

// 基础地址
let baseURL = `${appConfig.url}`;
console.log(baseURL,'baseURL');
const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
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
  // 响应正确
  
  if (response.status >= 200 && response.status <= 210) {
    const data = response.data;
    if (+data.code === 200) {
      return {
        code: 0,
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
    
    const status = error.response.status;
    const data = error.response.data;

  });






/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function get(url, params = {}) {
  try {
    return service({
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
function post(url, data = {}) {
  try {
    return service({
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
 function put(url, data = {}) {
  try {
    return service({
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
 function del(url, data = {}) {
  try {
    return service({
      url,
      method: 'DELETE',
      data: JSON.stringify(data)
    });
  } catch (error) {
    
  }
}


module.exports = { post, get,put,del }