/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-11 13:40:13
 * @LastEditTime: 2022-05-25 14:47:41
 */
const service = require("utils/request")

const api = require("src/config/api.config.js")

const getProxyMealList = async () => {
  const res = await service.get(api.proxyMealList,null)
  //console.info("dao 层:", api.proxyMealList, res)
  return res
}

module.exports = { getProxyMealList}