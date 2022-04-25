/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 预生产环境配置项
 * @Date: 2021-07-16 13:20:18
 * @LastEditTime: 2021-09-03 14:23:18
 */

module.exports = {
  NODE_NAME: '"预生产环境"',
  NODE_ENV: '"release"',
  API: "'http://localhost:81'", // 域名
  ProxyApi: "'http://1.117.101.113:8081'" // 代理的地址
};
