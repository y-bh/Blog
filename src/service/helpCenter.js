/*
 * @Author: 陈昊天
 * @LastEditors: 秦琛
 * @description: 帮助中心业务代码
 * @Date: 2022-05-16 16:37:33
 * @LastEditTime: 2022-05-19 15:32:24
 */
const { getArticleTypeDao, postArticleDao, getArticleDetailDao, postKeywordsDao } = require("dao/helpCenter")
const { dateFormat } = require("utils/dateFormat")
const { cateTypes } = require("config/app.key.config")
const { setStore, getStore } = require("store")


//获取栏目类型
const getCateTypes = async () => {
  let articleTypes = []
  try {
    //如果缓存有数据
    if (getStore(cateTypes)) {
      console.log("从缓存获取文章类型")
      articleTypes = getStore(cateTypes)
    } else {
      //获取文章类型
      console.log("从接口获取文章类型")
      articleTypes = await getArticleTypeDao()
      setStore(cateTypes, articleTypes, {
        maxAge: 1000 * 3600 * 12,
        ttl: 1000 * 3600 * 12,
      })
    }

    return articleTypes
  } catch (error) {
    return Promise.resolve(articleTypes)
  }
}

//获取帮助中心列表
const getHelpService = async (data, articleTypes = []) => {

  //1. 获取栏目类型
  if (!articleTypes.length) {
    articleTypes = await getCateTypes()
  }

  let lists = []
  let title = null
  try {
    if (!articleTypes.length) {
      return {
        articleTypes,
        lists
      }
    }

    //2. 获取文章列表
    const params = {
      pageSize: data.pageSize || 10,
      pageNum: +data.pageNum || 1,
    }

    if (data.typeAlias) {
      let tem = articleTypes.filter(({ typeAlias }) => typeAlias === data.typeAlias)
      if (tem.length > 0) {
        params.types = [tem[0].id]
        title = tem[0].type
      }
    }

    if (!params.types) {
      params.types = [articleTypes[0].id]
    }

    //文章列表
    lists = await postArticleDao(params)

    //兜底分页
    if (!lists.totalPage) {
      lists.totalPage = Math.ceil(lists.totalSize / params.pageSize)
    }

    //当前页
    lists.pageNum = params.pageNum

    //属于的文章类型
    lists.typeAlias = data.typeAlias || articleTypes[0]['typeAlias']

    //获取文章类型标题
    return {
      articleTypes,
      lists,
      title
    }
  } catch (error) {
    console.error("getHelpService: ", error);
    return Promise.resolve(
      {
        articleTypes,
        lists,
        title
      }
    )
  }
}


//文章详情页
const getArticleDetailService = async (id) => {
  if (!id) return null

  try {
    let { articleKeyWords, prefix, suffix, related, articleDetailVO } = await getArticleDetailDao(id)

    //详情页关键词
    let keywords = related && related.map((item) => item.title)
    if (keywords) {
      keywords = keywords.join(',')
    }

    //格式化详情页时间
    articleDetailVO.showTime = dateFormat(articleDetailVO.createTime * 1000)

    return {
      articleKeyWords, prefix, suffix, related, articleDetailVO, keywords
    }
  } catch (error) {
    console.error('getArticleDetailService:', error)
    return Promise.resolve({
      articleKeyWords, prefix, suffix, related, articleDetailVO
    })
  }
}


//获取关键词聚合页文章列表
const postKeywordsService = async (data) => {

  let lists = {
    totalPage: null,
    data: [], //文章列表
    keyWordsVO: null,//关键词数据
    recommendArticles: [], //推荐文章
    pageNum: data.pageNum || 1,
    typeAlias: data.keyAlias
  }

  try {
    if (!data.keyAlias) {
      return null
    }
    const params = {
      pageSize: data.pageSize || 10,
      pageNum: data.pageNum || 1,
      keywordAlias: data.keyAlias
    }
    console.log("传参数:", params)

    const { pageRespDTO, recommendArticles, keyWordsVO } = await postKeywordsDao(params)

    //兜底分页
    if (pageRespDTO && !pageRespDTO.totalPage) {
      lists.totalPage = Math.ceil(pageRespDTO.totalSize / params.pageSize)
    }

    //文章列表
    if (pageRespDTO && pageRespDTO.data) {
      lists.data = pageRespDTO.data
    }

    //推荐文章列表
    if (recommendArticles) {
      lists.recommendArticles = recommendArticles
    }

    //关键词信息
    if (keyWordsVO) {
      lists.keyWordsVO = keyWordsVO
    }

    console.log("获取关键词聚合页文章列表", lists)
    return lists
  } catch (error) {
    console.error("postKeywordsService: ", error);
  }
}

module.exports = {
  postKeywordsService,
  getHelpService,
  getArticleDetailService,
  getCateTypes
}