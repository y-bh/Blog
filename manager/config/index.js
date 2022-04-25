/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 生产/开发环境配置项
 * @Date: 2021-07-16 13:31:00
 * @LastEditTime: 2022-04-25 13:36:45
 */

module.exports = (env) => {
  const config = {
    development: {
      port: 8088, // development 启动服务端口 
      host: 'localhost',
      open: false,
      stylelint: false, // 是否开启stylelint
      eslint: false, // 是否开启eslint
      devtool: 'inline-source-map',
      analyzer: false, //是否打开webpack分析日志
      assetsPublicPath: '/',//web访问目录
    },
    production: {
      eslint: false, // 是否其他eslint
      devtool: 'source-map',
      analyzer: false,//是否打开webpack分析日志
      assetsPublicPath: '/',//web访问目录
    }
  };
  return config[env];
};
