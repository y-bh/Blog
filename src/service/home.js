/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 业务层代码
 * @Date: 2022-04-25 11:06:41
 * @LastEditTime: 2022-04-25 11:25:35
 */


const { getTest } = require("dao/home")

const renderHome = async () => {

  const res = await getTest()
  let obj = null
  if (+res.code === 0) {
    let data = res.data
    obj = {
      name: data.name,
      url: data.url
    }
  }

  console.info("业务层:",res)

  return obj
}

module.exports = { renderHome }