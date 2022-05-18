/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 首页数据层
 * @Date: 2022-04-25 10:33:13
 * @LastEditTime: 2022-05-18 17:08:31
 */


const { post, get} = require("utils/request")
const api = require("src/config/api.config.js");

const articleType = async () => {
  const res = await get(api.articleType);
  console.log("=====================文章类型============",res)
  let data = [];
  if (res.code === 0 && res.data.length > 0) {
    data = res.data;
  }
  return data;
}
const articleList = async () => {
  const res = await get(api.getIndexArticles);
  console.log("----文章列表2222222222----", res);
  let data = {};
  if (res.code === 0 && res.data) {
    data = res.data;
  }
  return data;
}
module.exports = { articleType, articleList }