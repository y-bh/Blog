/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-04-25 11:25:59
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

module.exports = post