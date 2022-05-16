/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 帮助中心业务代码
 * @Date: 2022-05-16 16:37:33
 * @LastEditTime: 2022-05-16 16:46:32
 */
const { getHelpList } = require("dao/helpCenter")

//获取首页的文章列表
const getHelpListS = async () => {
  const res = await getHelpList()
  try {
    if (+res.code === 200) {
      return res;
    }
  } catch (error) {
    console.error("getHelpList_Service: ", error);
  }
}

module.exports = {
  getHelpListS,
}