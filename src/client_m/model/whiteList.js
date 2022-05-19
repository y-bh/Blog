/*
 * @Author: 李云涛
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-05-13 15:40:19
 * @LastEditTime: 2022-05-19 12:52:57
 */
import { post } from 'tools/ajax.js';
const api = require("config/api.config.js")

import service from 'tools/ajax.js';

/**
 * @Date: 2022-05-13 16:33:37
 * @LastEditTime: LiYuntao
 * @description: 获取list
 * @param {*} params
 * @return {*}
 */
export const getWhiteListFunc = async (params = null) => {
  try {
    const res = await service.post(api.MANAGER_WHITE_LIST_PAGE, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};

/**
 * @Date: 2022-05-13 16:35:29
 * @LastEditTime: LiYuntao
 * @description: 增加白名单
 * @param {*} params
 * @return {*}
 */
export const addWhiteIpFunc = async (params = null) => {
  try {
    const res = await service.post(api.MANAGER_WHITE_LIST_ADD, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};

/**
 * @Date: 2022-05-13 16:36:04
 * @LastEditTime: LiYuntao
 * @description: 删除白名单
 * @param {*} params
 * @return {*}
 */
export const removeWhiteIpFunc = async (params = null) => {
  try {
    const res = await service.post(api.MANAGER_WHITE_LIST_REMOVE, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};

/**
 * @Date: 2022-05-13 16:36:34
 * @LastEditTime: LiYuntao
 * @description: 更新白名单备注
 * @param {*} params
 * @return {*}
 */
export const updateWhiteIpDescFunc = async (params = null) => {
  try {
    const res = await service.post(api.MANAGER_WHITE_LIST_UPDATE, params);
    return res
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};
