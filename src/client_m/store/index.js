/*
 * @Author: 朱占伟
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-04-26 15:25:53
 * @LastEditTime: 2022-05-30 15:04:34
 */
import { createStore } from 'vuex';

// 应用状态
const state = () => {
  return {
    userInfo: { name: '朱占伟' }
  };
};

// 操作管理
const mutations = {
  // 保存登录信息
  SET_USERINFO(state, data = null) {
    state.userInfo = data;
  }

};

// 可异步操作
const actions = {
  saveUserinfo({ commit }, data = null) {
    commit('SET_USERINFO', data);
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
