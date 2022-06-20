import  request  from '@/utils/request'

/**
 * 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型，1为商品，2为专题，3为品牌
 * @returns
 */
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
 export const findOrderList = ({ orderState, page, pageSize }) => {
  return request('/member/order', 'get', { orderState, page, pageSize })
}
/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
 export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
 export const delteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}
/***
 * 确认收货
 * 
 */
export const confirmOrder = (id) => {
  return request(`/member/order/${id}/receipt`, 'put')
}

/**
 * 查看物流
 * @param {String} id - 订单ID
 * @returns
 */
 export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')

}