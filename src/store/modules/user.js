export default {
  namespaced: true,
  state: {
    // 用户信息
    profile: {
      id: '',
      account:'',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    },
    redirectUrl: '/'
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    },
    setUrl ( state, url) {
      state.redirectUrl = url
      console.log(url);
    }
  },
  actions: {

  },
  getters: {

  }
}
