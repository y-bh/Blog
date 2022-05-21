/*
 * @Author: 陈昊天
 * @LastEditors: dengxiujie
 * @description: 帮助中心数据层
 * @Date: 2022-05-16 16:30:24
 * @LastEditTime: 2022-05-20 13:38:55
 */
const service = require("utils/request")
const api = require("src/config/api.config.js")


//文章详情
const getBlogDetail = async (params = null) => {
  const url = api.POST_HELP_HELP_DETAILS
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    
  }
}


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
    
    return Promise.resolve(data)
  }
}

const getArticleListDao = async () => {
  let data = [];
  try {
    const res = await service.get(api.getIndexArticles);
    if (res.code === 200 && res.data) {
      data = res.data;
    }
    return data;
  } catch (error) {
    
    return Promise.resolve(data)
  }
}

//文章详情页
const getArticleDetailDao = async (id) => {
  const url = `${api.GET_HELP_ARTICLE_DETAIL}/${id}`
  let data = null;
  let { articleKeyWords, prefix, suffix, related, articleDetailVO } = [[], null, null, [], null]
  try {
    const res = await service.get(url);
    if (res.code === 200) {
      data = res.data;
    }
    return data;
  } catch (error) {
    
    return Promise.resolve({ articleKeyWords, prefix, suffix, related, articleDetailVO })
  }
}


//获取关键词聚合页列表
const postKeywordsDao = async (params) => {
  let data = [];
  try {
    const res = await service.post(api.POST_KEYWORD_PAGE,params);
    if (res.code === 200 && res.data) {
      data = res.data;
    }
    return data;
  } catch (error) {
    
    return Promise.resolve(data)
  }
}












module.exports = {
  getBlogDetail,
  postArticleDao,
  getArticleTypeDao,
  getArticleListDao,
  getArticleDetailDao,
  postKeywordsDao
}