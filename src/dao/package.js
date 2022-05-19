/*
 * @Author: dengxiujie
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-05-11 13:40:13
 * @LastEditTime: 2022-05-19 12:55:47
 */
const service = require("utils/request")

const api = require("src/config/api.config.js")

const getProxyMealList = async () => {
  const res = await service.get(api.proxyMealList,null,{xx_uid:7797})
  //console.info("dao 层:", api.proxyMealList, res)
  return res
}

module.exports = { getProxyMealList}