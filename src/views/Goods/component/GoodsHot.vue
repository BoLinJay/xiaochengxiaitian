<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
     <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item"/>  
    </div>  
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { GetHotGoods } from '@/api/goods'
import GoodsItem from '@/views/Category/component/GoodsItem.vue'
export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
        type: String,
        default: ''
    }
  },
  setup (props) {
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })
    const goodsList = ref([])
    GetHotGoods({ id: props.goodsId, type: props.type }).then( ({ result }) => {
        goodsList.value = result.map( item => {
            item.tag = item.desc
            return item
        })
    })
    return { title, goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>