/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-11 13:39:49
 * @LastEditTime: 2022-05-18 13:59:27
 */
const { getProxyMealList } = require("dao/package")

const renderPackage = async () => {
  const res = await getProxyMealList()
  console.info("业务层:", res)
  let packageObj = {
    activityVoMap: {},//打折活动
    countMeal: [],//IP价格
    rechargeMeals: [],//选择预充值金额
    proxyTimes: [],//选择IP时效
    mealDates: []//选择购买时长
  }
  if (res.code == 0) {
    let data = res.data ? res.data : {};

    //转换选择IP时效数据
    let proxyTimes = data.proxyTimes ? data.proxyTimes : []
    let tempProxyTimesArr = [];
    for (let key in proxyTimes) {
      let obj = { second: key, minute: parseInt(parseInt(key) / 60), price: proxyTimes[key] }
      tempProxyTimesArr.push(obj);
    }
    packageObj = {
      activityVoMap: data.activityVoMap ? data.activityVoMap : {},
      countMeal: data.countMeal ? data.countMeal : [],//IP价格
      rechargeMeals: data.rechargeMeals ? data.rechargeMeals : [],//选择预充值金额
      proxyTimes: tempProxyTimesArr,//选择IP时效
      mealDates: data.mealDates ? data.mealDates : []//选择购买时长
    }
  }
  return packageObj
}

module.exports = { renderPackage }