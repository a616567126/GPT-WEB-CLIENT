/*
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 20:49:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-28 11:29:14
 * @FilePath: /chat_gpt/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    total: 0
  },
  getters,
  mutations: {
    SET_OPEN: (state, data) => {
      state.drawer = data
    },
    SET_TOTAL: (state, data) => {
      state.total = data
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
