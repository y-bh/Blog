/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 业务层代码
 * @Date: 2022-04-25 11:06:41
 * @LastEditTime: 2022-05-19 13:19:34
 */


const { getArticleListDao } = require("dao/helpCenter")
const { getCateTypes } = require("service/helpCenter")


//获取文章给类型下的数据 以及某一文章类型对应的名字
const renderHome = async (type = null) => {
  //文章类型
  let typeList = await getCateTypes();
  let typeObj = null
  if (typeList && typeList.length > 0) {
    if (typeList.length > 3) {
      typeList = typeList.slice(0, 3)
    }
    //根据id获取文章列表

    let articleDetail = await getArticleListDao();
    typeList.forEach(item => {
      let typeId = item.id + "";

      //获取传参对应栏目类型的数据
      if (type && type === item.id) {
        typeObj = {
          id: item.id,
          type: item.type,
          typeAlias: item.typeAlias
        }
      }

      item.articleDetail = [];
      if (typeId && articleDetail[typeId]) {

        articleDetail[typeId].forEach((articleItem) => {
          // console.log(3333, articleItem.createTime)
          let dateNum = new Date(parseInt(articleItem.createTime) * 1000)
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
  return { typeList, typeObj };
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