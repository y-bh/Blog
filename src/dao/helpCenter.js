/*
 * @Author: 陈昊天
 * @LastEditors: 秦琛
 * @description: 帮助中心数据层
 * @Date: 2022-05-16 16:30:24
 * @LastEditTime: 2022-05-19 15:32:02
 */
const service= require("utils/request")
const api = require("src/config/api.config.js")

//获取首页的文章列表
const getHelpList = async (params = null) => {
  const url = api.POST_HELP_HELP
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('getHelpList_Dao: ', error)
  }
}

//文章详情
const getBlogDetail = async (params = null) => {
  const url = api.POST_HELP_HELP_DETAILS
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('getBlogDetail_Dao: ', error)
  }
}


//文章列表

//文章列表
const postArticleDao = async (params = null) => {
  const url = api.POST_HELP_ARTICLE_LIST
  let data = null;
  try {
    const res = await service.post(url, params)
    if (res.code === 200) {
      data = res.data;
    }
    return data;
  } catch (error) {
    console.error('postArticleDao: ')
    return Promise.resolve(data)
  }
}


//获取文章栏目类型
const getArticleTypeDao = async () => {
  let data = [];
  try {
    const res = await service.get(api.articleType);
    if (res.code === 200 && res.data.length > 0) {
      data = res.data;
    }
    return data;
  } catch (error) {
    console.error('getArticleTypeDao: ')
    return Promise.resolve(data)
  }
}

const getArticleListDao = async () => {
  let data = [];
  try {
    const res = await service.get(api.getIndexArticles);
    if (res.code === 200 && res.data.length > 0) {
      data = res.data;
    }
    return data;
  } catch (error) {
    console.error('getArticleListDao: ')
    return Promise.resolve(data)
  }
}





module.exports = {
  getHelpList,
  getBlogDetail,
  postArticleDao,
  getArticleTypeDao,
  getArticleListDao
}