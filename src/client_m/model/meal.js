/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 我的套餐接口
 * @Date: 2022-05-18 13:26:26
 * @LastEditTime: 2022-05-20 16:45:08
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

// 获取续费时长list
export const getRenewList = async (params = null) => {
  try {
    const res = await service.get(api.QUERY_RENEWINFO + '/' + params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};

// 获取可用红包
export const getRedPackage = async (params = null) => {
  try {
    const res = await service.get(api.GET_REDPACKAGE, params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};

// 获取补量价格
export const getPrice = async (params = null) => {
  try {
    const res = await service.get(api.GET_SUPPLEMENTPRICE + '/' +  params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};

// 获取时效信息
export const getDuration = async (params = null) => {
  try {
    const res = await service.get(api.GET_DURATION + '/' +  params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};

// 续费支付
export const renewPay = async (params = null) => {
  try {
    const res = await service.post(api.POST_RENEWPAY, params);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};