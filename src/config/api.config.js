/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 接口统一管理
 * @Date: 2022-04-26 13:37:42
 * @LastEditTime: 2022-05-19 17:13:10
 */

module.exports = {
  'test': '/test',
  'QUERY_ACTIVITY': '/activity/tab',  // 获取套餐tab优惠信息
  //友情链接
  'QUERY_LINK': '/link/queryList',
  //套餐购买
  'proxyMealList': "/proxyMeal/list",
  'REGISTER': "/user/register",


  /* 个人中心白名单 */
  'MANAGER_WHITE_LIST_PAGE': "/whiteIp/page", //获取列表
  'MANAGER_WHITE_LIST_ADD': "/whiteIp/add", //增加白名单
  'MANAGER_WHITE_LIST_UPDATE': "/whiteIp/update", //编辑备注
  'MANAGER_WHITE_LIST_REMOVE': "/whiteIp/batch/remove", //删除白名单

  /* 工单 */
  'MANAGER_SUBMIT_TICKET': "/feedback/new", //提交工单

  /* 礼券 */
  'MANAGER_GET_GIFT': "/redPackage/user/list", //获取礼券


  /* 个人中心修改用户信息 */
  'MANAGER_USER_UPDATE_INFO': "/user/update/info", //个人中心修改用户信息

  /*帮助中心 */
  'articleType': "/article/getArticleType",//资讯中心--获取文章类型
  'getIndexArticles': "/article/getIndexArticles",//资讯中心--获取文章列表
  'POST_HELP_HELP': '/help/help', //获取首页的文章列表
  'POST_HELP_FIND_BY_ARTICLE_KEYWORD': '/help/findByArticleKeyword', //查看文章关键词聚合页
  'POST_HELP_HELP_DETAILS': '/help/helpDetails', //文章详情
  'POST_HELP_ARTICLE_LIST':"/article/getArticles",

  /*个人中心-购买记录 */
  'ORDER_LIST': '/order/list', //获取订单列表
  'ORDER_STATE': "/order/state", //获取订单状态
  'ORDER_DODEL': '/order/doDel', //批量删除订单


  //  用户相关接口
  'POST_USER_REGISTER': '/user/register', //用户注册
  'POST_USER_RESET' : '/user/forget/password/update', //重置密码
  'POST_USER_LOGIN' : '/auth/login', //登录

  // 我的套餐
  'QUERY_LIST': '/proxy/list',  // 获取套餐列表
  'QUERY_RENEWINFO': 'proxy/getProxyRenewInfo',
  'GET_REDPACKAGE': '/redPackage/enabled',  // 获取可用红包
  'QUERY_LOG': '/proxy/log',  // 变更记录

  /*企业服务*/
  'COMPANY_NEW':'/company/new', //提交企业服务

  /*提取ip*/
  'PROXY_API_CITY':'/proxy/api/city', //获取提取套餐城市列表
  'PROXY_API_MENU':'/proxy/api/menu', //获取提取套餐下拉列表
}