<template>
  <div class="member-home">
      <!-- 用户信息 -->
      <HomeOverView/>
      <!-- 收藏 -->
      <HomePanel title="我的收藏">
        <GoodsItem v-for="item in goods" :key="item.id" :goods="item" />
      </HomePanel>
      <!-- 足迹 -->
      <HomePanel title="我的足迹">
        <GoodsItem v-for="item in goods" :key="item.id" :goods="item" />
      </HomePanel>
      <!-- 猜你喜欢 -->
      <GoodsRelevant></GoodsRelevant>
  </div>
</template>
<script>
import HomeOverView from './components/home-overview.vue'
import HomePanel from './components/home-panel'
import GoodsRelevant from '@/views/Goods/component/GoodsRelevant'
import GoodsItem from '@/views/Category/component/GoodsItem.vue'
import { findCollect } from '@/api/member'
import { ref } from 'vue'
export default {
  name: 'MemberHome',
  components: { HomeOverView, HomePanel, GoodsRelevant, GoodsItem },
  setup() {
    const goods = ref([])
   findCollect({ page: 1, pageSize: 4}).then((data)=> {
     goods.value = data.result.items
   })
      return { goods }
  }
}
</script>
<style scoped lang="less">

:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>