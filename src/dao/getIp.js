/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 提取ip dao层
 * @Date: 2022-05-17 18:15:04
 * @LastEditTime: 2022-05-18 10:09:46
 */
const { post,get } = require("utils/request")

const api = require("src/config/api.config.js")

//获取提取套餐城市列表
const getProxyCity = async (params = null) => {
  const url = api.PROXY_API_CITY
  try {
    const res = await post(url, params)
    return res
  } catch (error) {
    console.error('getProxyCity_Dao: ', error)
  }
}

//获取提取套餐下拉列表
const getProxyMenu = async () => {
  const url = api.PROXY_API_MENU
  try {
    const res = await get(url,null)
    return res
  } catch (error) {
    console.error('getProxyMenu_Dao: ', error);
  }
}

module.exports = {
  getProxyCity,
  getProxyMenu
}