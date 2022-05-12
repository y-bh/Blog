/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-11 13:40:13
 * @LastEditTime: 2022-05-11 15:19:27
 */
const {post,get} = require("utils/request")

const api = require("src/config/api.config.js")

const getProxyMealList = async () => {
  const res = await get(api.proxyMealList,null,{xx_uid:7797})
  //console.info("dao 层:", api.proxyMealList, res)
  return res
}

module.exports = { getProxyMealList}