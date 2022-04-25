/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心入口文件
 * @Date: 2022-04-25 15:58:48
 * @LastEditTime: 2022-04-25 16:10:57
 */


import { createApp } from 'vue';

import injectRouter from './routes'; //router



const app = createApp(App);


// 注入路由
const router = injectRouter(app);

router.isReady().then(() => app.mount('#app'));