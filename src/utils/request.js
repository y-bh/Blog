/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-17 17:54:00
 */



let request = require('async-request')
const appConfig = require("config/app.config")





async function axios(url, data = null, method = 'POST', headers = null) {
  let response;
  try {
    if (!url.includes('http')) {
      url = `${appConfig.url}${url}`
    }
    response = await request(url, {
      method,
      data,
      headers
    });
  } catch (e) {
    console.error('axios:', e)
  }
  console.log("获取处理结果1:", response)
  //处理响应
  if (response.statusCode === 200) {
    // console.log("获取处理结果2:",response)
    return JSON.parse(response.body)
  }
  return console.error('post', response)
}




async function post(url, data = null, headers = null) {
  let response;
  try {
    if (!url.includes('http')) {
      url = `${appConfig.url}${url}`
    }
    response = await request(url, {
      method: 'POST',
      data,
      headers
    });
  } catch (e) {
    console.error('post:', e)
  }

  //处理响应
  if (response.statusCode === 200) {
    return JSON.parse(response.body)
  }
  return console.error('post', response)
}
async function get(url, data = null, headers = null) {
  let response;
  try {
    if (!url.includes('http')) {
      url = `${appConfig.url}${url}`
    }
    response = await request(url, {
      method: 'GET',
      data,
      headers
    });
  } catch (e) {
    console.error('GET:', e)
  }

  //处理响应
  if (response.statusCode === 200) {
    return JSON.parse(response.body)
  }
  return console.error('GET', response)
}
module.exports = { post, get ,axios}