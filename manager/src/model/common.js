/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 通用接口
 * @Date: 2021-07-27 15:01:21
 * @LastEditTime: 2022-03-14 16:40:41
 */
import { post } from '../utils/request.js';

/**
 * @Date: 2021-07-27 15:01:54
 * @LastEditTime:
 * @description: 获取国家和地区
 * @param {*}
 * @return {*}
 */
export const getCountry = async(url, params = null) => {
  try {
    const res = await post(url, params);
    return res;
  } catch (error) {
    console.error('getCountry', error);
    return Promise.resolve(null);
  }
};
