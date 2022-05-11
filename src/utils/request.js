/*
 * @Author: 朱占伟
 * @LastEditors: dengxiujie
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-05-11 14:30:03
 */



let request = require('async-request')
const appConfig = require("config/app.config")

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
module.exports = { post, get }