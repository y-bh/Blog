/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-31 11:04:48
 * @LastEditTime: 2022-05-31 11:16:32
 */
import service from 'tools/ajax.js';
const api = require("config/api.config.js")

export const getDiaOneThousand = async (params = null) => {
  try {
    const res = await service.post(api.POST_PROXY_RECEIVE_NEW_USERMEAL);
    return res;
  } catch (error) {
    return Promise.resolve(null);
  }
};