/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description:  全局共用的数据储存
 * @Date: 2022-05-16 17:28:39
 * @LastEditTime: 2022-05-16 17:31:39
 */

const LRU = require('lru-cache');
const options = {
  max: 500,
  maxAge: 1000 * 10
};
const cache = new LRU(options);

//设置缓存值
function setStore(key, value) {
  console.log("设置的缓存值:", key, value)
  cache.set(key, value)
}

//获取缓存值
function getStore(key) {
  return cache.get(key)
}


module.exports = { setStore, getStore }






