/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 首页接口
 * @Date: 2021-07-20 10:37:46
 * @LastEditTime: 2022-03-14 16:40:46
 */

import { post } from '../utils/request.js';
export const postTest = async(url, params = null) => {
  try {
    const res = await post(url, params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};
