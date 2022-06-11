import { findCartList, getNewCartGoods, mergeLocalCart, insertCart, deleteCart, updateCart, checkAllCart } from '@/api/cart'
export default {
  namespaced: true, 
  state: {
    list: []
  },
  mutations: {
    // 加入购物车
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
    },
    // 更新购物车数据
    updataCart(state, goods) {
      const updataGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if(goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updataGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车数据
    deleteCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车列表
    setCart(state, list) {
      state.list = list
    }
  },
  actions: {
    // 合并本地购物车
    async mergeCart( context) {
      // 进行购物车合并，提取需要的参数
      const arrList = context.getters.validList.map(({skuId, selected, count}) => {
        return {skuId, selected, count}
      })
      // API调用
      await mergeLocalCart(arrList)
      // 清空本地购物车
      context.commit('setCart', [])
    },
    // 清空失效商品
    delInvalidList( context ) {
      return new Promise((reslove, reject) => {
        // 已经登录  rootState  拿到所有store中的数据
        if(context.rootState.user.profile.token) {

        } else {
          context.getters.invalidList.forEach( item => {
            context.commit('deleteCart', item.skuId)
          })
          reslove()
        }
      })
    },
    // 加入购物车
    insertCart(context, payload) {
      return new Promise((reslove, reject) => {
        // 已经登录  rootState  拿到所有store中的数据
        if(context.rootState.user.profile.token) {
          insertCart(payload).then(()=> {
            return findCartList()
          }).then(({result})=> {
            context.commit('setCart', result)
            reslove()
          })
        } else {
          context.commit('insertCart', payload)
          reslove()
        }
      })
    },
    // 登录后获取购物车列表
    findCart(context) {
      return new Promise((reslove, reject) => {
        // 已经登录  rootState  拿到所有store中的数据
        if(context.rootState.user.profile.token) {
          findCartList().then(({result})=> {
            context.commit('setCart', result)
            reslove()
          })  
        } 
      })
    },
    // 更新购物车数据
    findGetList(context) {
      return new Promise((resolve, reject) => {
        const PromiseArr = context.state.list.map(item => {
          return getNewCartGoods(item.skuId)
        })
        Promise.all(PromiseArr).then(dataArr => {
          dataArr.forEach((data, i) => {
            context.commit('updataCart', { skuId: context.state.list[i].skuId, ...data.result })
          })
          resolve()
        })
      })
    },
    // 删除购物车数据
    DeleteCart(context, skuId) {
      return new Promise(( resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 登录 TODO
          deleteCart([skuId]).then(()=> {
            return findCartList()
          }).then(({result}) => {
            context.commit('setCart', result)
          })
        } else {
          // 本地
          context.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 批量删除商品
    deleteSelected( context ) {
      return new Promise((reslove, reject) => {
        // 已经登录  rootState  拿到所有store中的数据
        if(context.rootState.user.profile.token) {
          const ids = context.getters.selectedList.map(item => item.skuId)
          deleteCart(ids).then(()=> {
              return findCartList()
            }).then(({result}) => {
              context.commit('setCart', result)
            })
        } else {
          context.getters.selectedList.forEach( item => {
            context.commit('deleteCart', item.skuId)
          })
          reslove()
        }
      })
    },
    // 修改购物车商品的选中状态及商品数量
    updateCart (context, goods) {
      // goods 中：必须有skuId，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 登录 TODO
          updateCart(goods).then(() => {
             return findCartList()
           }).then((data) => {
            context.commit('setCart', data.result)
             resolve()
           })
        } else {
          // 本地
          context.commit('updataCart', goods)
          resolve()
        }
      })
    },
    //全选与反选
    updateCheckAll( context, selected ) {
       // goods 中：必须有skuId，其他想修改的属性 selected  count
       return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 登录 TODO
          const ids = context.getters.validList.map(item => {return item.skuId})
          checkAllCart({selected, ids}).then(()=> {
            return findCartList()
            }).then(({result}) => {
              context.commit('setCart', result)
            })
        } else {
          // 本地
          context.getters.validList.forEach(item => {
            context.commit('updataCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改sku规格函数
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 登录 TODO
           // 1. 获取原先商品的数量
           // 2. 删除原先商品
           // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
           // 4. 更新列表
           const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
           deleteCart([oldSkuId]).then(() => {
             return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
           }).then(() => {
             return findCartList()
           }).then((data) => {
             ctx.commit('setCartList', data.result)
             resolve()
           })
        } else {
          // 本地
          // 但你修改了sku的时候其实skuId需要更改，相当于把原来的信息移出，创建一条新的商品信息。
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2. 删除旧的商品
          ctx.commit('deleteCart', oldSkuId)
          // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 去插入即可
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
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
    //无效商品的列表
    invalidList(state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品的数量
    selectedNum(state, getters) {
      return getters.selectedList.reduce((t, v) => t + v.count, 0)
    },
    // 选中商品的总金额
    selectedMoney(state, getters) {
      return getters.selectedList.reduce((t, v) => t + (v.nowPrice * v.count * 100), 0) / 100
    },
    // 全选
    changeAll(state, getters) {
      return getters.selectedList.length !== 0 && getters.selectedList.length === getters.validList.length
    }
  }
}