/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 公共接口
 * @Date: 2022-05-16 19:16:37
 * @LastEditTime: 2022-05-31 15:41:20
 */

const { getQueryLinkData, getMealActivity } = require("dao/commonDao")
const { randomNum } = require("utils/dateFormat")

const { active_tab, links, ipNumTotal, ipNumUpdate } = require("config/app.key.config")
const { setStore, getStore } = require("store")



//获取顶部活动数据
const renderTab = async () => {
  // 赋予初始值  防止ssr渲染出错
  let data = { maxRechargeGift: null, minPurchaseRate: null, maxPurchaseGift: null };

  //如果缓存有数据
  if (getStore(active_tab)) {
    data = getStore(active_tab) || null
    return data
  }

  //无数据 从接口获取
  const res = await getMealActivity();
  if (res && res.code === 200) {
    data = res.data
    setStore(active_tab, data)
  }

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

  }

  return arr
}


//获取每日ip随机数
const getDayIpNums = () => {
  //randomNum

  let obj = {
  }

  //今日可用IP总数
  if (getStore(ipNumTotal)) {
    obj.ipNumTotal = getStore(ipNumTotal)
    console.log("走缓存获取随机值", obj)
  } else {
    let tem = randomNum(2000000, 2999999);
    obj.ipNumTotal = tem
    console.log("新获取", obj)
    setStore(ipNumTotal, tem, {
      maxAge: 1000 * 3600 * 12,
      ttl: 1000 * 3600 * 12,
    })
  }


  //今日更新IP数
  if (getStore(ipNumUpdate)) {
    obj.ipNumUpdate = getStore(ipNumUpdate)
    console.log("走缓存获取随机值2", obj)
  } else {
    let tem = randomNum(7000000, 1300000);
    obj.ipNumUpdate = tem
    console.log("新获取2", obj)
    setStore(ipNumUpdate, tem, {
      maxAge: 1000 * 3600 * 12,
      ttl: 1000 * 3600 * 12,
    })
  }


  return obj
}






module.exports = { renderTab, getQueryLink, getDayIpNums }