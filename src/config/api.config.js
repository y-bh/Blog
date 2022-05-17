/*
 * @Author: 朱占伟
 * @LastEditors: 陈昊天
 * @description: 接口统一管理
 * @Date: 2022-04-26 13:37:42
 * @LastEditTime: 2022-05-16 20:22:46
 */

module.exports={
  'test':'/test',
  'QUERY_ACTIVITY': '/activity/tab',  // 获取套餐tab优惠信息
  //友情链接
  'QUERY_LINK': '/link/queryList',
  //套餐购买
  proxyMealList:"/proxyMeal/list",
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
  'HELP_HELP':'/help/help', //获取首页的文章列表
  'HELP_FIND_BY_ARTICLE_KEYWORD': '/help/findByArticleKeyword', //查看文章关键词聚合页
  'HELP_HELP_DETAILS': '/help/helpDetails', //文章详情
}