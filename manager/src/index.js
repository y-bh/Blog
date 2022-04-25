/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 项目入口文件
 * @Date: 2021-07-16 13:15:04
 * @LastEditTime: 2022-03-14 16:32:28
 */

import { createApp } from 'vue';
import injectUI from 'utils/injectUI.js'; // ui组件
import {get,post} from "utils/request"; //ajax 服务
import injectRouter from 'src/routes'; //router
import injectState from 'src/store'; //vuex

import moment from 'moment';
import api from 'config/api.config';
import * as re from 'config/re.config';

import App from './index.vue';

/** **************全局css管理 */
import 'assets/css/reset.css';
import 'assets/css/icon.css';
import 'assets/css/public.scss';
import 'assets/css/elementUi.reset.scss';
/** **********配置全局組件 */

const app = createApp(App);

// 注入ui
injectUI(app);

// 注入路由
const router = injectRouter(app);

// 注入store 状态管理
injectState(app);

// 将api 注入url管理
app.config.globalProperties.$api = api;
app.provide('$api',api)

//注入ajax 服务
app.config.globalProperties.$get = get;
app.provide('$get',get)
app.config.globalProperties.$post = post;
app.provide('$post',post)

//注入正则表达式管理
app.config.globalProperties.$re = re;
app.provide('$re',re)



app.config.globalProperties.$moment = moment;


router.isReady().then(() => app.mount('#app'));
