/*
 * @Author: 秦琛
 * @LastEditors: 朱占伟
 * @description: 我的套餐接口
 * @Date: 2022-05-18 13:26:26
 * @LastEditTime: 2022-05-19 12:52:07
 */
import service from 'tools/ajax.js';
const api = require("config/api.config.js")
/**
 * @Date: 2021-07-27 15:01:54
 * @LastEditTime:
 * @description: 获取国家和地区
 * @param {*}
 * @return {*}
 */
export const getTableList = async (params = null) => {
  try {
    const res = await service.post(api.QUERY_LIST, params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};