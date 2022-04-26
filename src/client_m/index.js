/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心入口文件
 * @Date: 2022-04-25 15:58:48
 * @LastEditTime: 2022-04-26 14:58:15
 */

import { createApp } from 'vue';

import injectRouter from './routes'; //router
import injectUI from 'tools/injectUI.js'; // ui组件
import { get, post } from "tools/ajax"; //ajax 服务

import App from './index.vue';
/** **************全局css管理 */
import 'assets/css/elementUi.reset.scss';

import * as re from 'config/re.config';

const app = createApp(App);


// 注入ui
injectUI(app);

// 注入路由
const router = injectRouter(app);


//注入ajax 服务
app.config.globalProperties.$get = get;
app.provide('$get', get)
app.config.globalProperties.$post = post;
app.provide('$post', post)


//注入正则表达式管理
app.config.globalProperties.$re = re;
app.provide('$re', re)


router.isReady().then(() => app.mount('#app'));