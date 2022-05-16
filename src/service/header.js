/*
 * @Author: 秦琛
 * @LastEditors: 朱占伟
 * @description: header业务层代码
 * @Date: 2022-05-16 11:34:07
 * @LastEditTime: 2022-05-16 17:44:05
 */
const { getMealActivity } = require("dao/header")


const { active_tab } = require("config/app.key.config")
const { setStore, getStore } = require("store")

const renderTab = async () => {
  let data = null;

  //如果缓存有数据
  if (getStore(active_tab)) {
    data = getStore(active_tab)
    return data
  }

  //无数据 从接口获取
  const res = await getMealActivity();
  if (+res.code === 200) {
    data = res.data
    setStore(active_tab, data)
  }
  console.info("活动tab:", res)
  return data
}

module.exports = { renderTab }