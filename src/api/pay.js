import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
 export const findOrder = (id) => {
  return request('/member/order/' + id, 'get')
}