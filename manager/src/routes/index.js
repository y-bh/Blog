/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 前端路由配置文件
 * @Date: 2021-07-19 14:10:16
 * @LastEditTime: 2022-03-14 16:43:45
 */
import { createRouter ,createWebHistory} from 'vue-router';
// import { EVENTS } from 'src/event.config.js';
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { // 首页
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
];

export default function(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  router.onError((handler) => {
    console.log('error:', handler);
  });
  app.use(router);
  return router;
}
