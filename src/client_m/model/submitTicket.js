/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-14 11:14:10
 * @LastEditTime: 2022-05-14 11:16:14
 */
import { post } from 'tools/ajax.js';
const api = require("config/api.config.js")




/**
 * @Date: 2022-05-14 11:14:30
 * @LastEditTime: LiYuntao
 * @description: 提交工单
 * @param {*} params
 * @return {*}
 */
export const submitTicketFunc = async (params = null) => {
  try {
    const res = await post(api.MANAGER_SUBMIT_TICKET, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};