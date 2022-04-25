/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 业务层代码
 * @Date: 2022-04-25 11:06:41
 * @LastEditTime: 2022-04-25 11:11:04
 */


const {getTest} = require("dao/home")

const renderHome = async ()=>{

  const res = await getTest()

  console.info("业务层:",res)

  return res
}

module.exports={renderHome}