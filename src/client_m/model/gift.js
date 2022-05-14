/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-14 11:17:13
 * @LastEditTime: 2022-05-14 11:18:32
 */
import { get } from 'tools/ajax.js';
const api = require("config/api.config.js")




/**
 * @Date: 2022-05-14 11:14:30
 * @LastEditTime: LiYuntao
 * @description: 获取礼券
 * @param {*} params
 * @return {*}
 */
export const getGiftFunc = async (params = null) => {
  try {
    const res = await get(api.MANAGER_GET_GIFT, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};