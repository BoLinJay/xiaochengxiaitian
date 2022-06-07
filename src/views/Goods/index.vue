<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem  :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}} </BreadItem>
        <BreadItem  :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}} </BreadItem>
        <BreadItem>{{goods.name}}</BreadItem>
      </Bread>
      <!-- 商品信息 -->
      <div class="goods-info">
           <div class="media">
            <GoodsImages :images="goods.mainPictures" />
            <GoodsSales/>
           </div>
          <div class="spec">
            <!-- 名字组件 -->
            <GoodsName :goods="goods" />
            <!-- sku组件 -->
            <GoodsSku :goods="goods" @change="changeSku" />
            <!-- 数量组件 -->
            <Numbox v-model="num" label="数量" max="999" />
            <!-- 按钮 -->
            <Button type="primary" style="margin-top:20px;">加入购物车</Button>
          </div>
      </div>
      <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs/>
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn/>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
            <GoodsHot :goods="goodsId" />
            <GoodsHot :goods="goodsId" :type="2"/>
            <GoodsHot :goods="goodsId" :type="3"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetGoods } from '@/api/product'
import GoodsRelevant from './component/GoodsRelevant'
import GoodsImages from './component/GoodsImages.vue'
import GoodsSales from './component/GoodsSales.vue'
import GoodsName from './component/GoodsName.vue'
import GoodsSku from './component/GoodsSku.vue'
import GoodsTabs from './component/GoodsTabs.vue'
import GoodsHot from './component/GoodsHot.vue'
import GoodsWarn from './component/GoodsWarn.vue'
import { useRoute } from 'vue-router'
import { nextTick, provide, ref, watch } from 'vue'

// 获取商品数据
const useGoods = () => {
    const goods = ref(null)
    const route = useRoute()
    watch(() => route.params.id, (newV) => {
      if( newV && `/product/${newV}` === route.path) {
         GetGoods(route.params.id).then(({ result }) => {
          goods.value = null
          result.skus.forEach(sku => {
            const sortSpecs = []
            result.specs.forEach(spec => {
              sortSpecs.push(sku.specs.find(item => item.name === spec.name))
            })
            sku.specs = sortSpecs
            })
          nextTick(() => {
            goods.value = result
          })
        })
      }
    }, { immediate: true})
   
    return goods
}

export default {
  name: 'GoodsPage',
  components: { GoodsRelevant, GoodsImages, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn},
  setup() {
    const goods = useGoods()
     const changeSku = (sku) => {
     if (sku.skuId) {
       goods.value.price = sku.price
       goods.value.oldPrice = sku.oldPrice
       goods.value.inventory = sku.inventory
     }
   }
    // 数量数据
    const num = ref(1)
  // 使用provide向后代传数据
    provide('goods', goods)
   return { goods, changeSku, num }
  }
  
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>