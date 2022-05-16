/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 帮助中心业务代码
 * @Date: 2022-05-16 16:37:33
 * @LastEditTime: 2022-05-16 20:14:34
 */
const { getHelpList } = require("dao/helpCenter")

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
  try {
    if (+res.code === 200) {
      res.data.articlePageRespDTO.data.map(e => {
        e.title = csubstr(e.title,18)
      })
      let total = res.data.articlePageRespDTO.totalSize
      const helpData = {
        tabList: res.data.articleTypes,  //tab类型
        articleList: res.data.articlePageRespDTO.data, //文章列表
        alive: res.data.alive, //当前的文章类型
        pageSize: res.data.articlePageRespDTO.pageSize,
        pageNum: res.data.articlePageRespDTO.pageNum,
        totalPage: res.data.articlePageRespDTO.totalPage,
        totalSize: res.data.articlePageRespDTO.totalSize,
        page: total % 8 === 0 ? total / 8 : total / 8 + 1
      }
      return helpData;
    }
  } catch (error) {
    console.error("getHelpList_Service: ", error);
  }
}

module.exports = {
  getHelpListS,
}