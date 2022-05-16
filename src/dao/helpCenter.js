/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 帮助中心数据层
 * @Date: 2022-05-16 16:30:24
 * @LastEditTime: 2022-05-16 16:36:53
 */
const { post } = require("utils/request")

const api = require("src/config/api.config.js")

//获取首页的文章列表
const getHelpList = async () => {
  const url = api.HELP_HELP
  try {
    const res = await post(url)
    return res
  } catch (error) {
    console.error('getHelpList_Dao: ', error)
  }
}

module.exports = {
  getHelpList,
}