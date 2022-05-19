/*
 * @Author: 陈昊天
 * @LastEditors: 朱占伟
 * @description: 购买记录
 * @Date: 2022-05-17 14:01:57
 * @LastEditTime: 2022-05-19 12:52:18
 */
import service from 'tools/ajax.js';
const api = require("config/api.config.js")

/**
 * @Date: 2022-05-17 14:02:56
 * @LastEditTime: 
 * @description: 订单列表
 * @return {*}
 */
export const getOrderList = async (params = null) => {
  try {
    const res = await service.post(api.ORDER_LIST, params)
    return res;
  } catch (error) {
    console.error('getOrderList:',error);
  }
}

/**
 * @Date: 2022-05-17 14:24:04
 * @LastEditTime: 
 * @description: 批量删除订单
 * @return {*}
 */
 export const batchDelOrder = async (params = null) => {
  try {
    const res = await service.post(api.ORDER_DODEL, params)
    return res;
  } catch (error) {
    console.error('batchDelOrder:',error);
  }
}