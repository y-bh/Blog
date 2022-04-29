/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: Ajax 封装
 * @Date: 2022-04-26 13:45:01
 * @LastEditTime: 2022-04-28 17:23:48
 */

import axios from 'axios';
axios.defaults.withCredentials = true;

// 基础地址
 let baseURL = process.env.common['API'];

if (process.env.NODE_ENV === 'production') {
  baseURL = "/myApi";
}

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers.Authorization = '123';
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(response => {
  // 响应正确
  if (response.status >= 200 && response.status <= 210) {
    const data = response.data;
    if (!data.E) {
      return {
        code: 0,
        data: data.P
      };
    } else {
      return {
        code: -1,
        msg: data.E
      };
    }
  }
  return response.data;
},
  error => {
    const status = error.response.status;
    const data = error.response.data;
    // 跳转登录页
    if (status === 401) {
      return data;
      // removeToken();
      // router.replace('/login').catch(_ => {});
    } else {
      // return Promise.resolve(error.response.data);
    }
  });

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  try {
    return service({
      url,
      params,
      method: 'GET'
    });
  } catch (error) {
    console.error('get:', error);
  }
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  try {
    return service({
      url,
      method: 'POST',
      data
    });
  } catch (error) {
    console.error('post:', error);
  }
}
