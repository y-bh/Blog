/*
 * @Author: 朱占伟
 * @LastEditors: dengxiujie
 * @description: 业务层代码
 * @Date: 2022-04-25 11:06:41
 * @LastEditTime: 2022-05-17 09:41:18
 */


const { articleType, articleList } = require("dao/home")

const renderHome = async () => {
  //文章类型
  let typeList = await articleType();
  //console.log("----文章类型----", typeList);
  let allTypeIds = [];
  if (typeList && typeList.length > 0) {
    typeList.forEach(item => {
      allTypeIds.push(item.id)
    });
    let params = {
       id: 0,
       ids: [8, 20, 10],
       typeId: 0,
      "pageNum": 1,
      "pageSize": 10,
    }
    //根据id获取文章列表
    let articleDetail = await articleList(params);

    console.log("----文章列表----", articleDetail);
    typeList.forEach(item => {
      let typeId = item.id + "";
      item.articleDetail = [];
      if (typeId && articleDetail[typeId]) {
        item.articleDetail = articleDetail[typeId];
      }
    });
  }
  return typeList;
}

module.exports = { renderHome }