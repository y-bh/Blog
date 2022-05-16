/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 顶部导航涉及seo接口
 * @Date: 2022-05-16 10:47:50
 * @LastEditTime: 2022-05-16 13:23:59
 */
const {post,get} = require("utils/request")

const api = require("src/config/api.config.js")

const getMealActivity = async () => {
  try {
    const res = await get(api.QUERY_ACTIVITY,null)
    return res
  } catch (error) {
    return error
  }
}

module.exports = { getMealActivity}