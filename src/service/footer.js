/*
 * @Author: 李云涛
 * @LastEditors: liyuntao
 * @description: footer
 * @Date: 2022-05-10 15:49:31
 * @LastEditTime: 2022-05-16 09:51:57
 */

const { getQueryLinkData } = require("dao/footer")

const getQueryLink = async () => {
  let arr = null

  const res = await getQueryLinkData()
  try {
    if (+res.code === 200) {
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