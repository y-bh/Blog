/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心入口文件
 * @Date: 2022-04-25 15:58:48
 * @LastEditTime: 2022-04-25 17:36:33
 */


import { createApp } from 'vue';

import injectRouter from './routes'; //router


import App from './index.vue';

const app = createApp(App);


// 注入路由
const router = injectRouter(app);

router.isReady().then(() => app.mount('#app'));