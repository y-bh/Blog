/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 公共接口
 * @Date: 2022-05-16 19:16:37
 * @LastEditTime: 2022-05-23 10:33:10
 */

const { getQueryLinkData, getMealActivity } = require("dao/common")


const { active_tab, links } = require("config/app.key.config")
const { setStore, getStore } = require("store")



//获取顶部活动数据
const renderTab = async () => {
  let data = null;

  //如果缓存有数据
  if (getStore(active_tab)) {
    data = getStore(active_tab)
    return data
  }

  //无数据 从接口获取
  const res = await getMealActivity();
  if (res && res.code === 200) {
    data = res.data
    setStore(active_tab, data)
  }
  console.info("活动tab:", res)
  return data
}


//获取底部友情链接
const getQueryLink = async () => {
  let arr = null

  //如果缓存有数据
  if (getStore(links)) {
    arr = getStore(links)
    return arr
  }


  try {
    const res = await getQueryLinkData()
    if (+res.code === 200) {
      let data = res.data || []
      arr = data.map(({ linkName = null, linkUrl = null, linkTarget = null }) => {
        return {
          link: linkUrl,
          title: linkName,
          target: linkTarget,
        }
      })

      setStore(links, arr)
    }
  } catch (error) {
    console.error("getQueryLink: ", error);
  }

  return arr
}

module.exports = { renderTab, getQueryLink }