/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-13 16:36:57
 * @LastEditTime: 2022-05-13 16:36:57
 */
import { post } from 'tools/ajax.js';
const api = require("config/api.config.js")


/**
 * @Date: 2022-05-13 16:37:34
 * @LastEditTime: LiYuntao
 * @description: 更新用户信息
 * @param {*} params
 * @return {*}
 */
export const updateUserInfo = async (params = null) => {
  try {
    const res = await post(api.MANAGER_USER_UPDATE_INFO, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};