/*
 * @Author: 朱占伟
 * @LastEditors: dengxiujie
 * @description: 首页数据层
 * @Date: 2022-04-25 10:33:13
 * @LastEditTime: 2022-05-18 10:23:16
 */


const { post } = require("utils/request")
const api = require("src/config/api.config.js")

const articleType = async () => {
  const res = await post(api.articleType);
  let data = [];
  if (res.code == 200 && res.data.length > 0) {
    data = res.data;
  }
  return data;
}
const articleList = async (params) => {
  console.log(33333333333,params)
  params = {
     id: 0,
    ids: [8, 20, 10],
    typeId: 0,
   "pageNum": 1,
   "pageSize": 10,
 }
  const res = await post(api.getIndexArticles, params);
  console.log("----文章列表2222222222----", res);
  let data = {};
  if (res.code == 200 && res.data) {
    data = res.data;
  }
  return data;
}
module.exports = { articleType, articleList }