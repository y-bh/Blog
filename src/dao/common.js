/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 公共数据部分
 * @Date: 2022-05-16 19:17:49
 * @LastEditTime: 2022-05-16 19:18:58
 */

const { post, get } = require("utils/request")
const api = require("src/config/api.config.js")

//获取顶部导航 活动
const getMealActivity = async () => {
  try {
    const res = await get(api.QUERY_ACTIVITY, null)
    return res
  } catch (error) {
    return error
  }
}

//获取友情链接
const getQueryLinkData = async () => {
  const url = api.QUERY_LINK
  try {
    const res = await post(url)
    return res
  } catch (error) {
    console.error('Query_Link_Dao: ', error)
  }
}

module.exports = {
  getMealActivity,//获取顶部导航 活动
  getQueryLinkData, //友情链接接口
}