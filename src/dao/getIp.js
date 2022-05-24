/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: 提取ip dao层
 * @Date: 2022-05-17 18:15:04
 * @LastEditTime: 2022-05-24 19:56:06
 */

const service= require("utils/request")
const api = require("src/config/api.config.js")

//获取提取套餐城市列表
const getProxyCityDao = async (params = null) => {
  const url = api.PROXY_API_CITY
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('getProxyCity_Dao: ', error)
  }
}

//获取提取套餐下拉列表
const getProxyMenuDao = async (token) => {
  const url = api.PROXY_API_MENU
  try {
    const res = await service.get(url,null, token)
    return res
  } catch (error) {
    console.error('getProxyMenu_Dao: ', error);
  }
}

/**
 * @Date: 2022-05-23 09:46:05
 * @LastEditTime: LiYuntao
 * @description: 获取白名单接口
 * @return {*}
 */
const getWhiteListApiDao = async(token, params = null) => {
  const url = api.MANAGER_WHITE_LIST_PAGE
  try {
    const res = await service.post(url,params, token)
    return res
  } catch (error) {
    console.error('getWhiteListApi_Dao: ', error);
  }
}

/**
 * @Date: 2022-05-24 18:26:01
 * @LastEditTime: LiYuntao
 * @description: 获取天启币
 * @param {*} params
 * @return {*}
 */
const getIconDao = async(token, params = {}) => {
  const url = api.POST_AUTH_GETMINEINFO
  try {
    const res = await service.post(url,params, token)
    console.log(res, 'daooooooooooooooo');
    return res
  } catch (error) {
    console.error('getWhiteListApi_Dao: ', error);
  }
}

module.exports = {
  getProxyCityDao,
  getProxyMenuDao,
  getWhiteListApiDao,
  getIconDao,
}

