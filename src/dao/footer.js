/*
 * @Author: 李云涛
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-05-10 15:49:53
 * @LastEditTime: 2022-05-10 16:00:43
 */
const post = require("utils/request")

const api = require("src/config/api.config.js")

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
  getQueryLinkData, //友情链接接口
}