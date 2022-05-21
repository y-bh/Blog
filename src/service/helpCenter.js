/*
 * @Author: 陈昊天
 * @LastEditors: 秦琛
 * @description: 帮助中心业务代码
 * @Date: 2022-05-16 16:37:33
 * @LastEditTime: 2022-05-19 15:32:24
 */
const { getHelpList, getArticleTypeDao, postArticleDao, getArticleDetailDao, postKeywordsDao } = require("dao/helpCenter")
const { dateFormat } = require("utils/dateFormat")
const { cateTypes } = require("config/app.key.config")
const { setStore, getStore } = require("store")






//标题省略
const csubstr = (str, len) => {
  if (str.length > len) {
    return str.substring(0, len) + '......'
  } else {
    return str
  }
}

//获取首页的文章列表
const getHelpListS = async () => {
  const res = await getHelpList()
  console.log("fffffffffffffffffffffffff", res)
  try {
    if (+res.code === 200) {
      const { articlePageRespDTO, articleTypes, alive, title } = res.data

      //文章列表
      articlePageRespDTO.data.map(i => {
        i.title = csubstr(i.title, 18)
        i.createTime = dateFormat(i.createTime)
        i.updateTime = dateFormat(i.updateTime)
      })

      return {
        articlePageRespDTO: articlePageRespDTO, articleTypes, alive, title
      };
    }
  } catch (error) {
    console.error("getHelpList_Service: ", error);
  }
}

const getBlogDetailS = async () => {
  try {
    const helpDetail = {
      tabList,
      sameBlog,
      tagList
    }
    return helpDetail
  } catch (error) {
    console.error('getBlogDetail_Service:', error)
  }
}

//聚合页
let total = 80;
let leftBlogList = [
  {
    id: 1,
    month: '01',
    day: '11',
    title: '第一篇文章',
    desc: '第一篇文章第一篇文章第一篇文章第一篇文章'
  },
  {
    id: 2,
    month: '02',
    day: '12',
    title: '第二篇文章',
    desc: '第二篇文章第二篇文章第二篇文章第二篇文章'
  },
  {
    id: 3,
    month: '03',
    day: '13',
    title: '第三篇文章',
    desc: '第三篇文章第三篇文章第三篇文章第三篇文章'
  },
]

let tabListKeyword = [
  {
    type: 'detail',
    typeAlias: '详情',
    blogList: [
      {
        id: 1,
        title: '标题1'
      },
      {
        id: 2,
        title: '标题2'
      },
    ]
  },
  {
    type: 'news',
    typeAlias: '新闻',
    blogList: [
      {
        id: 1,
        title: '标题1'
      },
      {
        id: 2,
        title: '标题2'
      },
      {
        id: 3,
        title: '标题3'
      },
    ]
  },
  {
    type: 'note',
    typeAlias: '说明',
    blogList: [
      {
        id: 1,
        title: '标题1'
      },
      {
        id: 2,
        title: '标题2'
      },
      {
        id: 3,
        title: '标题3'
      },
    ]
  }
]

let sameBlogKeyword = [
  {
    id: 1,
    title: '标题1'
  },
  {
    id: 2,
    title: '标题2'
  },
  {
    id: 3,
    title: '标题3'
  },
]
const getKeyWordPageS = async () => {
  try {
    const keyWordPage = {
      leftBlogList,
      tabListKeyword,
      sameBlogKeyword,
      page: total % 8 === 0 ? total / 8 : total / 8 + 1
    }
    return keyWordPage
  } catch (error) {
    console.error('getKeyWordPage_Service:', error)
  }
}

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
  try {
    if (!articleTypes.length) {
      return {
        articleTypes,
        lists
      }
    }

    //2. 获取文章列表
    const params = {
      pageSize: data.pageSize || 2,
      pageNum: +data.pageNum || 1,
    }

    let title = null
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
        lists
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
      pageSize: data.pageSize || 2,
      pageNum: data.pageNum || 10,
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
  getHelpListS,
  getBlogDetailS,
  getKeyWordPageS,
  postKeywordsService,
  getHelpService,
  getArticleDetailService,
  getCateTypes
}