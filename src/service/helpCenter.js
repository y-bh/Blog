/*
 * @Author: 陈昊天
 * @LastEditors: 秦琛
 * @description: 帮助中心业务代码
 * @Date: 2022-05-16 16:37:33
 * @LastEditTime: 2022-05-19 15:32:24
 */
const { getHelpList, getArticleTypeDao, postArticleDao } = require("dao/helpCenter")
const { dateFormat } = require("utils/dateFormat")

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


//获取文章详情
let tabList = [
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

//相关文章
let sameBlog = [
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

//标签
let tagList = [
  {
    id: 1,
    tag: '标签1'
  },
  {
    id: 2,
    tag: '标签2'
  },
]
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






//获取帮助中心文章列表
const postArticleService = async (data) => {



  try {
    const res = await postArticleDao(data)
    console.log("获取帮助中心文章列表", res)
  } catch (error) {
    console.error("postArticleService: ", error);
  }
}







const getHelpService = async (data) => {
  let articleTypes = []
  let lists = []
  try {
    //获取文章类型
    const articleTypes = await getArticleTypeDao()

    if (!articleTypes.length) {
      return {
        articleTypes,
        lists
      }
    }

    



    const params = {
      pageSize: data.pageSize || 10,
      pageNum: data.pageNum || 0,
      types:data.types || []
    }
    if (!params.types.length) {
      params.types = [articleTypes[0].id]
    }

    //文章列表
    lists = await postArticleDao(params)
    console.log("cccccccccccccccccccccccccc",lists)


    //兜底分页
    if (!lists.totalPage) {
      lists.totalPage = Math.ceil(lists.totalSize / params.pageSize)
    }



    return {
      articleTypes,
      lists
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




module.exports = {
  getHelpListS,
  getBlogDetailS,
  getKeyWordPageS,
  postArticleService,
  getHelpService
}