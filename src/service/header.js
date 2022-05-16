/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: header业务层代码
 * @Date: 2022-05-16 11:34:07
 * @LastEditTime: 2022-05-16 13:28:11
 */
const { getMealActivity } = require("dao/header")

const renderTab = async () => {
  const res = await getMealActivity();
  let data = null;
  if (+res.code === 200) {
    data = res.data
  }
  console.info("活动tab:",res)
  return data
}

module.exports = { renderTab }