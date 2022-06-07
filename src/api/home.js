import  request  from '@/utils/request'
// 品牌推荐数据
/**
 * 获取品牌
 * @param {int} limit -品牌个数 
 * @returns Promise
 */
export const Getbrand = (limit = 6) => {
    return request('/home/brand', 'get', {limit})
}

// 轮播图数据
export const GetCarousel = () => {
    return request('/home/banner', 'get')
}

//新鲜好物数据
export const GetNew = () => {
    return request('/home/new', 'get')
}

// 人气推荐数据
export const GetHot = () => {
    return request('/home/hot', 'get')
  }

// 产品数据
export const GetGoods = () => {
    return request('home/goods', 'get')
  }

//   最新专题
export const GetSpecial = () => {
    return request('home/special', 'get')
  }

