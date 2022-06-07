<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区域 -->
      <SubFilter @filter-change="FilterChange" /> 
     <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="SortChange" />
          <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <GoodsItem :goods="goods" :path="`/product/${goods.id}`" />
          </li>
        </ul>
         <!-- 加载 -->
       <InfiniteLoading :loading="loading" :finished="finished" @infinite="getData"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import SubBread from './component/SubBread.vue'
import SubSort from './component/SubSort.vue'
import SubFilter from './component/SubFilter.vue'
import GoodsItem from './component/GoodsItem.vue'
import InfiniteLoading from './component/InfiniteLoading.vue'
import { GetSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
    name: 'CategorySub',
    components: { SubBread, SubFilter, SubSort, GoodsItem, InfiniteLoading},
    setup() {
      const route = useRoute()
      const isChieckedAll = ref(true)
      // 加载中。。。
      const loading = ref(false)
      // 加载完成
      const finished = ref(false)
       // 查询参数
      let reqParams = {
        page: 1,
        pageSize: 20
      }
      const goodsList = ref([])
      // 进入可视区后调用该函数，子组件调用
      const getData = () => {
        loading.value = true
        reqParams.categoryId = route.params.id
        GetSubCategoryGoods(reqParams).then( ( { result} ) => {
          // console.log(result);
          if(result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
          } else {
            // 加载完毕
            finished.value = true
          }
          // 请求结束
            loading.value = false
        }) 
      }

      // 监听二级路由的变化
      watch(() => route.params.id, (newV) => {
        if( newV && `/category/sub/${newV}` === route.path) {
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
        }
      })

      // 点击排序重新获取数据
      const SortChange = (sortParams) => {
        // 合并参数
        reqParams = {...reqParams, ...sortParams}
        reqParams.page = 1
        goodsList.value = []
        finished.value = false
      }
      // 筛选区域重新获取数据
     // 监听筛选区改变
    const FilterChange = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
      return { isChieckedAll, loading, finished, getData, goodsList, SortChange, FilterChange }
    }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>