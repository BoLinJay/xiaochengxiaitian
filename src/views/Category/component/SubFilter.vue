<template>
	<!-- 筛选区 -->
   <div class="sub-filter" v-if="FilterList && !filterLoading">
     <div class="item">
       <div class="head">品牌：</div> 
       <div class="body">
         <a 
         :class="{ active: FilterList.selectedBrand === item.id }" 
         href="javascript:;" 
         v-for=" item in FilterList.brands" 
         :key="item.id"
         @click="ListFilter( item )"
         >{{item.name}} </a>
       </div>
     </div> 
     <div class="item" v-for="sub in FilterList.saleProperties " :key="sub.id">
       <div class="head">{{sub.name}} </div>
       <div class="body">
         <a 
         :class="{ active: sub.selectedProp === pop.id }" 
         href="javascript:;"
          v-for=" pop in sub.properties" 
          :key="pop.id"
          @click="SubFilter(sub , pop)"
          >{{pop.name}} </a>
       </div>
     </div>
   </div>
   <!-- 骨架屏 -->
   <div v-else class="sub-filter">
    <Skeleton class="item" width="800px" height="40px" animated />
    <Skeleton class="item" width="800px" height="40px" animated />
    <Skeleton class="item" width="600px" height="40px" animated />
    <Skeleton class="item" width="600px" height="40px" animated />
    <Skeleton class="item" width="600px" height="40px" animated />
  </div>
</template>
<script>
import { GetSubCategoryFilter } from '@/api/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',
  setup(prop, { emit }) {
    const FilterList = ref(null)
    const route = useRoute()
    const filterLoading = ref(false)

    watch(() => route.params.id, (newV) => {
      if( newV && `/category/sub/${newV}` === route.path) {
         filterLoading.value = true
        GetSubCategoryFilter(route.params.id).then( ({ result }) => {
          result.selectedBrand = null // 选中的样式
          // 加上“全部”数据
          result.brands.unshift( {id: null, name: '全部'} )
          result.saleProperties.forEach(element => {
            element.selectedProp = null //选中的样式
            element.properties.unshift( {id:null, name: '全部'} )
          });
        FilterList.value = result 
        filterLoading.value = false
    })
      } 
    }, {immediate: true})
    
    // 获取数据参数的函数
    const GetFilterParams = () => {
      const obj = {brandId: null, attrs:[]}
      // 品牌数据
      obj.brandId = FilterList.value.selectedBrand
      // 属性数据
      FilterList.value.saleProperties.forEach( item => {
          const props = item.properties.find( prop => { prop.id === item.selectedProp})
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
      })
      if(obj.attrs.length === 0) obj.attrs = null
      return obj
    }
    // 品牌筛选
    const ListFilter = (item) => {
      if(FilterList.value.selectedBrand === item.id) return
      FilterList.value.selectedBrand = item.id
      emit('filter-change', GetFilterParams() )
    }
    // 属性筛选
    const SubFilter = (sub, pop) => {
      if(sub.selectedProp === pop.id) return 
      sub.selectedProp = pop.id
      emit('filter-change', GetFilterParams() )
    }
    return { FilterList, filterLoading, ListFilter,  SubFilter}
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;  
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
    .xtx-skeleton {
      padding: 10px 0
    }
  }
</style>