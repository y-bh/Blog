/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: 个人中心入口文件
 * @Date: 2022-04-25 15:58:48
 * @LastEditTime: 2022-05-19 16:15:39
 */

import { createApp } from 'vue';

import injectRouter from './routes'; //router
import injectUI from 'tools/injectUI.js'; // ui组件
// import { get, post } from "tools/ajax"; //ajax 服务

import $global from 'tools/global.js';  // 全局变量


import injectState from '@/store'; //vuex
import App from './index.vue';
/** **************全局css管理 */
import "element-plus/packages/theme-chalk/lib/index";
import 'assets/css/elementUi.reset.scss';
import 'assets/css/public.scss';
import 'assets/css/iconfont.scss'

import * as re from 'config/re.config';

const app = createApp(App);


import service from "tools/ajax"

// 注入全局变量
app.provide('_global', $global);
// 注入ui
injectUI(app);

// 注入路由
const router = injectRouter(app);

// 注入store 状态管理
injectState(app);

//注入ajax 服务
app.config.globalProperties.$service = service;
app.provide('$service', service)
// app.config.globalProperties.$post = service.post;
// app.provide('$post', post)
// app.config.globalProperties.$del = service.del;
// app.provide('$put', del)
// app.config.globalProperties.$put = service.put;
// app.provide('$del', put)

//注入正则表达式管理
app.config.globalProperties.$re = re;
app.provide('$re', re)


router.isReady().then(() => app.mount('#app'));