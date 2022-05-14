/*
 * @Author: 朱占伟
 * @LastEditors: 陈昊天
 * @description: 个人中心入口文件
 * @Date: 2022-04-25 15:58:48
 * @LastEditTime: 2022-05-14 14:59:31
 */

import { createApp } from 'vue';

import injectRouter from './routes'; //router
import injectUI from 'tools/injectUI.js'; // ui组件
import { get, post } from "tools/ajax"; //ajax 服务
import { dateFormat } from 'tools/dateFormat';

import injectState from '@/store'; //vuex
import App from './index.vue';
/** **************全局css管理 */
import "element-plus/packages/theme-chalk/lib/index";
import 'assets/css/elementUi.reset.scss';
import 'assets/css/public.scss';

import * as re from 'config/re.config';

const app = createApp(App);


// 注入ui
injectUI(app);

// 注入路由
const router = injectRouter(app);

// 注入store 状态管理
injectState(app);

//注入ajax 服务
app.config.globalProperties.$get = get;
app.provide('$get', get)
app.config.globalProperties.$post = post;
app.provide('$post', post)

//注入时间格式处理
app.config.globalProperties.$dateFormat = dateFormat;
app.provide('$dateForm',dateFormat)


//注入正则表达式管理
app.config.globalProperties.$re = re;
app.provide('$re', re)


router.isReady().then(() => app.mount('#app'));