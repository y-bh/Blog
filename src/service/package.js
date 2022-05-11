/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-11 13:39:49
 * @LastEditTime: 2022-05-11 14:10:55
 */
const { getProxyMealList } = require("dao/package")

const renderPackage = async () => {
  const res = await getProxyMealList()
  

  console.info("业务层:",res)

  return res
}

module.exports = { renderPackage }