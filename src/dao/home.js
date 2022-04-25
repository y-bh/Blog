/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 首页数据层
 * @Date: 2022-04-25 10:33:13
 * @LastEditTime: 2022-04-25 11:13:58
 */


const post = require("utils/request")
const getTest = async ()=>{
  const url = "http://localhost:8089/test"
  const res = await post(url)

  console.info("dao 层:",res)
  return res
}

module.exports = {getTest}