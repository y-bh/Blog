/*
 * @Author: 李云涛
 * @LastEditors: 李云涛
 * @description: footer
 * @Date: 2022-05-10 15:49:31
 * @LastEditTime: 2022-05-10 16:02:32
 */

const { getQueryLinkData } = require("dao/footer")

const getQueryLink = async () => {
  let arr = null

  const res = await getQueryLinkData()
  console.log(res);
  try {
    if (+res.code === 0) {
      let data = res.data || []
      arr = data.map(({ linkName, linkUrl, linkTarget }) => {
        return {
          link: linkUrl,
          title: linkName,
          target: linkTarget,
        }
      })
    }
  } catch (error) {
    console.error("Query_link_Service: ", error);
  }

  return arr
}

module.exports = {
  getQueryLink, //友情链接
}