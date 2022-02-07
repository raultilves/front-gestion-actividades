import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: false
  },
  mutations: {
    logIn(state) {
      state.isLogged = true
    },
    logOut(state) {
      state.isLogged = false
    }
  },
  actions: {
  },
  modules: {
  }
})
