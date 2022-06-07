import  request  from "@/utils/request";
// 获取nav商品分类名称
export const GetAllCategory = () => {
    return request('/home/category/head', 'get')
}
/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
 export const GetTopCategory = (id) => {
    return request('/category', 'get', { id })
  }

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
 export const GetSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
 export const GetSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}