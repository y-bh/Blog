/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 我的套餐接口
 * @Date: 2022-05-18 13:26:26
 * @LastEditTime: 2022-05-19 14:58:00
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
    console.log(params,'params$$$$$$$$');
    const res = await service.post(api.QUERY_LIST, params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};

// 获取续费时长list
export const getRenewList = async (params = null) => {
  try {
    const res = await post(api.QUERY_RENEWINFO, params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};