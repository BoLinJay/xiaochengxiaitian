export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    insertCart( state, payload) {
      const index = state.list.findIndex( item => item.skuId === payload.skuId)
      if(index > -1) {
        // 有相同商品
        const count = state.list[index].count
        payload.count += count
        // 删除原来的购物车
        state.list.splice(index, 1)
      } 
      // 在前面添加新商品
      state.list.unshift(payload)
    }
  },
  actions: {
    insertCart(context, payload) {
      return new Promise((reslove, reject) => {
        // 已经登录  rootState  拿到所有store中的数据
        if(context.rootState.user.profile.token) {

        } else {
          context.commit('insertCart', payload)
          reslove()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
  }
}
