<!-- 人气推荐模块 -->
<template>
    <div class="home-hot">
    <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
      <template #right><More path="/" /></template>
      <!-- 面板内容 -->
      <transition name="fade" mode="">
        <ul v-if="goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img v-lazyload="item.picture" alt="">
            <p class="name">{{item.title}}</p>
            <p class="desc">{{item.alt}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else/>
      </transition>
      
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '../HomePanel'
import { GetHot } from '@/api/home'
import { ref } from 'vue'
import { useLazyData} from '@/hooks'
export default {
    name: 'HomeHot',
    components: { HomePanel },
    setup() {
      // const goods = ref([])
      // GetHot().then( data => {
      //   goods.value = data.result
      // })
      // 数据懒加载
      const { target, result} = useLazyData(GetHot)
      return { goods:result, target }
    }
}
</script>

<style scoped lang="less">
.fade{
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity .5s .2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    .hoveShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>