/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 业务层代码
 * @Date: 2022-04-25 11:06:41
 * @LastEditTime: 2022-05-19 13:19:34
 */


const { getArticleListDao } = require("dao/helpCenter")
const { getCateTypes } = require("service/helpCenter")


const renderHome = async () => {
  //文章类型
  let typeList = await getCateTypes();
  console.log("cccccccccccccc",typeList)
  let allTypeIds = [];
  if (typeList && typeList.length > 0) {
    // typeList.forEach(item => {
    //   allTypeIds.push(item.id)
    // });
    // let params = {
    //    id: 0,
    //    ids: allTypeIds,
    //    typeId: 0,
    //   pageNum: 1,
    //   pageSize: 20,
    // }
    if (typeList.length > 3) {
      typeList = typeList.slice(0, 3)
    }
    //根据id获取文章列表
    let articleDetail = await getArticleListDao();
    //console.log("----文章列表----", articleDetail);
    typeList.forEach(item => {
      let typeId = item.id + "";
      item.articleDetail = [];
      if (typeId && articleDetail[typeId]) {
       
        articleDetail[typeId].forEach((articleItem)=>{
         // console.log(3333, articleItem.createTime)
          let dateNum = new Date(parseInt(articleItem.createTime)* 1000)
          articleItem.convertData = dateFormat1(dateNum);
         
        })
        //console.log(4444444, articleDetail[typeId]);
        if (articleDetail[typeId].length > 5) {
          item.articleDetail = articleDetail[typeId].slice(0, 5);
        } else {
          item.articleDetail = articleDetail[typeId];
        }
      }
    });
  }
  return typeList;
}

const dateFormat1 = (datetime) => {
  //datetime是拿到的时间戳
  let date = new Date(datetime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000 
  let year = date.getFullYear(),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    sdate = ("0" + date.getDate()).slice(-2);
    // hour = ("0" + date.getHours()).slice(-2),
    // minute = ("0" + date.getMinutes()).slice(-2),
    // second = ("0" + date.getSeconds()).slice(-2);
  // 拼接
  let result = year + "-" + month + "-" + sdate;
  // 返回
  return result;

}


module.exports = { renderHome }