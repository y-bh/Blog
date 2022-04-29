/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: 静态路由数据
 * @Date: 2022-04-27 13:26:51
 * @LastEditTime: 2022-04-28 11:24:14
 */
let prefix = '/manager';
let path404 = `${prefix}/404`;
//let path403 = `${prefix}/403`;
import Layout from 'views/layout'

export const routes = [
  { // 首页
    path: '/manager/',
    name: 'manager',
    component: () => import('views/home/index.vue'),
  },
  { // 首页
    path: '/manager/package',
    name: 'package',
    component: () => import('views/package/index.vue')
  },
  {//领取关注福利
    path: `${prefix}/wxLogin`,
    name: 'wxLogin',
    component: () => import('views/wxLogin'),
    meta: { ignore: true }
  },
  {//个人中心
    path: `${prefix}`,
    component: Layout,
    redirect: `${prefix}/user`,
    children: [
      {//个人账户
        path: 'user',
        name: 'userAccount',
        component: () => import('views/userAccount'),
      },
      {//资金明细
        path: 'finance',
        name: 'finance',
        component: () => import('views/finance'),
      },
      {//我的订单
        path: "myOrder",
        name: 'myOrder',
        component: () => import('views/myOrder'),
      },
      {
        path: 'setMeal',
        name: 'setMeal',
        component: () => import('views/setMeal'),
      },
      {
        path: 'longIp',
        name: 'longIp',
        component: () => import('views/longIp'),
      },
      {//IP白名单
        path: 'whiteListIp',
        name: 'whiteListIp',
        component: () => import('views/whiteListIp'),
      },
      {
        path: 'giftManage',
        name: 'giftManage',
        component: () => import('views/giftManage'),
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
    component: () => import('views/404')
  },
];
