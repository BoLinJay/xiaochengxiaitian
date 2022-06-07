import { createStore } from 'vuex'

import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// 数据持久化插件
import createPersistedstate from 'vuex-persistedstate'
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    // 数据持久化
    createPersistedstate({
      key: 'xiaotuxian',
      paths: ['user', 'cart']
    })]
})
