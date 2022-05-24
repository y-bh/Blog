/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 个人中心路由
 * @Date: 2022-04-25 16:06:50
 * @LastEditTime: 2022-05-21 11:04:33
 */

import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes/data/routes.js';

import { getCookie } from "tools/dateFormat"

export default function (app) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  router.onError((handler) => {
    console.log('error:', handler);
  });

  router.beforeEach(async (to, from, next) => {
    //判断当前是否登录
    const token = getCookie("TQ-TOKEN")
    //未登录,跳转登录页
    if (!token) {
      return window.open(`/login?back=${to.fullPath}`, '_self')
    }
    next()
  })
  app.use(router);
  return router;
}
