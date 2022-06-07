import request from '@/utils/request'
/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
 export const GetRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
}

  /**
 * 获取热榜商品
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const GetHotGoods = ({id,type, limit = 3}) => {
  return request('/goods/hot', 'get', {id, type, limit })
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
 export const GetCommentInfoByGoods = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 * @param {Object} params -评价筛选数据
 */
 export const GetCommentListByGoods = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}