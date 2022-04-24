/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 服务端渲染 工程配置目录
 * @Date: 2022-04-24 14:06:51
 * @LastEditTime: 2022-04-24 14:10:03
 */

const path = require("path");

const resolve = (dir) => {

  return path.join(__dirname, "../" + dir);
}



module.exports = {
  // 静态资源源码目录
  sourceDir: resolve("/client/static"),


  //静态资源输出目录
  destDir: resolve("/client/public")



}