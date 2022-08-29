
 const service= require("utils/request")

 // HitoKoto 一言
 const getHitokotoService = async (params = null) => {
  const url = 'https://v1.hitokoto.cn'
  try {
    const res = await service.post(url, params)
    return res
  } catch (error) {
    console.error('getProxyCity_Dao: ', error)
  }
}


module.exports = {
  getHitokotoService
}