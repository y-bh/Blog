/*
 * @Author: 陈昊天
 * @LastEditors: 朱占伟
 * @description: 帮助中心数据层
 * @Date: 2022-05-16 16:30:24
 * @LastEditTime: 2022-05-19 12:55:22
 */
const service= require("utils/request")
const api = require("src/config/api.config.js")

//获取首页的文章列表
const getHelpList = async (params = null) => {
  const url = api.HELP_HELP
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('getHelpList_Dao: ', error)
  }
}

//文章详情
const getBlogDetail = async (params = null) => {
  const url = api.HELP_HELP_DETAILS
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('getBlogDetail_Dao: ', error)
  }
}


//文章列表
const postArticleDao = async (params = null) => {
  const url = api.HELP_ARTICLE_LIST
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('postArticleDao: ', error)
  }
}









module.exports = {
  getHelpList,
  getBlogDetail,
  postArticleDao
}