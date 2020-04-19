import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations, // mutations唯一的目的就是修改state中的状态
  actions,   // mutations中的方法尽可能完成的事件比较单一一点
  getters,
}) 

export default store