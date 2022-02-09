import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: false,
    rol: "",
    userId: "",
    token: "",
    username: ""
  },
  mutations: {
    logIn(state) {
      state.isLogged = true
    },
    logOut(state) {
      state.isLogged = false
      state.rol = null,
      state.userId = null,
      state.token = null,
      state.username = null
    },
    setRol(state, rol) {
      state.rol = rol
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setToken(state, token) {
      state.token = token
    },
    setUsername(state, username) {
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
