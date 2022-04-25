/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 应用状态管理
 * @Date: 2021-07-20 10:23:19
 * @LastEditTime: 2021-07-20 10:34:19
 */

import { createStore } from 'vuex';
// 应用状态
const state = () => {
  return {
    loginInfo: { name: '朱占伟' }
  };
};

// 操作管理
const mutations = {
  // 保存登录信息
  SET_LOGIN(state, data = null) {
    state.loginInfo = data;
  }

};

// 可异步操作
const actions = {
  saveLogin({ commit }, data = null) {
    commit('SET_LOGIN', data);
  }
};

export default function(app) {
  const store = createStore({
    state,
    mutations,
    actions
  });
  app.use(store);
}
