import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user/index.js'
import userlist from './module/userlist/index.js'
import article from './module/article/index.js'
import role from './module/role/index.js'
import resource from './module/resource/index.js'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    userlist,
    article,
    role,
    resource,
    app
  }
})
