

const LRU = require('lru-cache');
const options = {
  max: 500,
  maxAge: 1000 * 10
};
const cache = new LRU(options);

//设置缓存值
function setStore(key, value, options = options) {
  

  cache.set(key, value, options)
}

//获取缓存值
function getStore(key) {
  return cache.get(key)
}


module.exports = { setStore, getStore }






