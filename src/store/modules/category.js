// 初始化分类名称
import { Initcategory } from "@/api/constants";
// 获取分类名称数据
import { GetAllCategory } from "@/api/category";
export default {
  namespaced: true,
  state: {
    list: [...Initcategory]
  },
  mutations: {
// 获取分类名称数据
    setList(state, payload) {
        state.list = payload
    },
    // 二级分类导航栏交互
    show(state, item) {
      const category = state.list.find( category => category.id === item.id)
      category.open = true
    },
    hide(state, item) {
      const category = state.list.find( category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
// 获取分类名称数据
    async getList({ commit }) {
      const { result } = await GetAllCategory()
      result.forEach(element => {
          element.open = false
      });
      commit('setList', result)
    }
  },
  getters: {

  }
}
