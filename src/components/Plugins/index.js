// 封装插件
// import Skeleton from './Skeleton.vue'
// import Carousel from './Carousel.vue'
// import More from './More.vue'
// import HomeSkeleton from './HomeSkeleton.vue'
// import Bread from './Bread.vue'
// import BreadItem from './BreadItem.vue'

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) 文件名称数组
import Message from './Message'

export default {
    install(app) {
        // 全自动批量注册   牛逼克拉斯 
        importFn.keys().forEach(key => {
                // 导入组件
            const component = importFn(key).default
                  // 注册组件
            app.component(component.name, component)
        });
        // 挂在到原型函数上的方法
        app.config.globalProperties.$message = Message// 原型函数
    
    // // 骨架屏插件
    //     app.component('Skeleton', Skeleton)
    // // 轮播图插件
    //     app.component('Carousel', Carousel)
    // // 查看更多
    //     app.component('More', More)
    // // 面板骨架屏
    //     app.component('HomeSkeleton', HomeSkeleton)
    // // 面包屑
    //     app.component('Bread', Bread)
    //     app.component('BreadItem', BreadItem)
    // 图片懒加载自定义指令
        DirectiveImage(app)
    }
}

import defaultImg from '@/assets/images/200.png'

const DirectiveImage = (app) => {
    // 图片懒加载指令
    app.directive('lazyload', {
        mounted(el, binding) {
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if(isIntersecting) {
                    // 进入可视区后停止观察
                    observer.unobserve(el)
                    // 图片加载失败显示默认图片
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    // 替换src
                        el.src = binding.value
                }
            },
            {
                threshold:0.01
            })
            // 开始观察
            observer.observe(el)
        }
    })
}



