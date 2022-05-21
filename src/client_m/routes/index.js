/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 个人中心路由
 * @Date: 2022-04-25 16:06:50
 * @LastEditTime: 2022-05-21 11:04:33
 */

import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes/data/routes.js';

export default function (app) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  router.onError((handler) => {
    console.log('error:', handler);
  });

  router.beforeEach(async (to, from, next) =>{
    // console.log("路由访问了",to, from)
    next()
  })
  app.use(router);
  return router;
}
