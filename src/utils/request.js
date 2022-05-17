/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-17 20:24:20
 */



// let request = require('async-request')
const appConfig = require("config/app.config")





// async function axios(url, data = null, method = 'POST', headers = null) {
//   let response;
//   try {
//     if (!url.includes('http')) {
//       url = `${appConfig.url}${url}`
//     }
//     console.log("java点传参:",url, data)
//     response = await request(url, {
//       method,
//       data,
//       headers
//     });
//   } catch (e) {
//     console.error('axios:', e)
//   }
//   console.log("获取处理结果1:", response)
//   //处理响应
//   if (response.statusCode === 200) {
//     // console.log("获取处理结果2:",response)
//     return JSON.parse(response.body)
//   }
//   return console.error('post', response)
// }




// async function post(url, data = null, headers = null) {
//   let response;
//   try {
//     if (!url.includes('http')) {
//       url = `${appConfig.url}${url}`
//     }

//     console.log("java点传参:",url, JSON.stringify(data))
//     response = await request(url, {
//       method: 'POST',
//       data:{
//         data:data
//       },
//       headers :{
//         "content-type":"application/json"
//       },
//     });
//   } catch (e) {
//     console.error('post:', e)
//   }

//   //处理响应
//   if (response.statusCode === 200) {
//     return JSON.parse(response.body)
//   }
//   return console.error('post', response)
// }
// async function get(url, data = null, headers = null) {
//   let response;
//   try {
//     if (!url.includes('http')) {
//       url = `${appConfig.url}${url}`
//     }
//     response = await request(url, {
//       method: 'GET',
//       data,
//       headers
//     });
//   } catch (e) {
//     console.error('GET:', e)
//   }

//   //处理响应
//   if (response.statusCode === 200) {
//     return JSON.parse(response.body)
//   }
//   return console.error('GET', response)
// }




import axios from 'axios';

axios.defaults.withCredentials = true;

// 基础地址
let baseURL = `${appConfig.url}`;

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
  console.log(error);
  return Promise.reject(error);
});


// 响应拦截器
service.interceptors.response.use(response => {
  // 响应正确
  console.log("response->>>>>>>>>>>>>>", response.data)
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
    console.log(error);
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
    console.error('get:', error);
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
    console.error('post:', error);
  }
}







module.exports = { post, get }