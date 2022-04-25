/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通信封装
 * @Date: 2022-04-25 10:37:04
 * @LastEditTime: 2022-04-25 10:45:07
 */



let request = require('async-request')

async function post(url, data = null, headers = null) {
  let response;
  try {
    response = await request(url, {
      method: 'POST',
      data,
      headers
    });
  } catch (e) {
    console.error('post:', e)
  }

  return response

}

module.exports = post