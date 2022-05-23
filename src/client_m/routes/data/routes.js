/*
 * @Author: dengxiujie
 * @LastEditors: liyuntao
 * @description: 静态路由数据
 * @Date: 2022-04-27 13:26:51
 * @LastEditTime: 2022-05-21 21:05:39
 */
let prefix = '/manager';
let path404 = `${prefix}/404`;
//let path403 = `${prefix}/403`;
import Layout from 'views/layout'

export const routes = [
  { // 首页
    path: '/manager/',
    name: 'manager',
    ignore: true,
    component: () => import('views/home/index.vue'),
  },
//   { // 首页
//     path: '/manager/package',
//     name: 'package',
//     ignore: true,
//     component: () => import('views/package/index.vue')
//   },
//   {//领取关注福利
//     path: `${prefix}/wxLogin`,
//     name: 'wxLogin',
//     ignore: true,
//     component: () => import('views/wxLogin'),
//     meta: { ignore: true }
//   },
  {//个人中心
    path: `${prefix}`,
    name:"personCenter",
    component: Layout,
    redirect: `${prefix}/user`,
    meta: {
      title: "个人中心",
      icon: ""
    },
    children: [
      {//个人账户
        path: 'user',
        name: 'user',
        meta: {
          title: "个人账户",
          icon: ""
        },
        component: () => import('views/userAccount'),
      },
      {
        path: 'setMeal',
        name: 'setMeal',
        meta: {title: "我的套餐",icon: ""},
        component: () => import('views/setMeal'),
      },
      {//IP白名单
        path: 'whiteListIp',
        name: 'whiteListIp',
        meta: {title: "白名单",icon: ""},
        component: () => import('views/whiteListIp'),
      },
      { //购买记录
        path: 'payRecord',
        name: 'payRecord',
        meta: {title: "购买记录",icon: ""},
        component: () => import('views/payRecord'),
      },
      {
        path: 'giftManage',
        name: 'giftManage',
        // ignore: true,
        meta: {title: "礼券管理",icon: ""},
        component: () => import('views/giftManage'),
      },
      {
        path: 'submitTicket',
        name: 'submitTicket',
        // ignore: true,
        meta: {title: "提交工单",icon: ""},
        component: () => import('views/submitTicket'),
      },
    ],
  },
  // pathMatch 是参数的名称，例如，跳转到 /not/found 会得到
  // { params: { pathMatch: ['not', 'found'] } }
  // 这要归功于最后一个 *，意思是重复的参数，如果你
  // 打算直接使用未匹配的路径名称导航到该路径，这是必要的
  {
    path: '/manager/:pathMatch(.*)*',
    name: 'notFound',
    ignore: true,
    component: () => import('views/404')
  },
];
