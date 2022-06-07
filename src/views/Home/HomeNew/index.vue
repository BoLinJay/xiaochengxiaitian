<!-- 新鲜好物模块 -->
<template>
    <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><More path="/" /></template>
          <!-- 面板内容 -->
      <transition name="fade" mode="">
        <ul v-if="goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img v-lazyload="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else bg="#f0f9f4"/>
      </transition>

    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '../HomePanel'
import { GetNew } from '@/api/home'
import { ref } from 'vue'
import { useLazyData} from '@/hooks'
export default {
    name: 'HomeNew',
    components: { HomePanel },
    setup() {
        // 获取数据
        // const goods = ref([])
        // GetNew().then( data => {
        //     goods.value = data.result
        // })
        // 数据懒加载
        const { target, result} = useLazyData(GetNew)
        return { goods:result, target }
    }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
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