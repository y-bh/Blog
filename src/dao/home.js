/*
 * @Author: 朱占伟
 * @LastEditors: dengxiujie
 * @description: 首页数据层
 * @Date: 2022-04-25 10:33:13
 * @LastEditTime: 2022-05-11 14:57:49
 */


const {post} = require("utils/request")

const api = require("src/config/api.config.js")

const getTest = async ()=>{
  const url = "/test"
  const res = await post(api.test)

  console.info("dao 层:",api.test,res)
  return res
}

module.exports = {getTest}