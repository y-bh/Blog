/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 接口封装
 * @Date: 2022-04-26 13:52:46
 * @LastEditTime: 2022-04-26 13:54:37
 */

import { post } from 'tools/ajax.js';
const api = require("config/api.config.js")
/**
 * @Date: 2021-07-27 15:01:54
 * @LastEditTime:
 * @description: 获取国家和地区
 * @param {*}
 * @return {*}
 */
export const getTest = async (params = null) => {
  try {
    const res = await post(api.test, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};
