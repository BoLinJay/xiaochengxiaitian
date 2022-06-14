import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
 export const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */
 export const mergeLocalCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
 export const findCartList = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
 export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
 export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', {ids})
}

/**
 * 修改购物车商品的状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
 export const updateCart = (goods) => {
  return request('/member/cart/' + goods.skuId, 'put', goods)
}

/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 有效商品skuId集合
 * @returns Promise
 */
 export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
 export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
 export const editAddress = (address, id) => {
  return request(`/member/address/${id}`, 'put', address)
}

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
 export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}