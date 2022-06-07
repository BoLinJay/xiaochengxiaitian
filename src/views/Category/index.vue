<template>
<div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <transition name="fade-right" mode="out-in">
          <BreadItem :key="CateGoryList.id" >{{CateGoryList.name}} </BreadItem>
        </transition>
      </Bread>
      <!-- 轮播图 -->
      <Carousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" >
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in CateGoryList.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in Toplists" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <More :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCarousel } from '@/api/home'
import { GetTopCategory } from '@/api/category'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from './component/GoodsItem.vue'
export default {
    name: 'Category',
    components: { GoodsItem },
    setup() {
      // 轮播图数据
      const sliders = ref([])
       GetCarousel().then( data => {
         sliders.value = data.result
       })

      //  全部分类数据以及面包屑
      const store = useStore()
      const route = useRoute()
      const CateGoryList = computed( () => {
          // return store.state.category.list.find( item => {
          //   return item.id === route.params.id
          // })
            let cate = {}
            const item = store.state.category.list.find(item => {
              return item.id === route.params.id
            })
            if (item) cate = item
              return cate
    })
    
      // 关联商品数据
      const Toplists = ref([])
      const GetSubList = () => { 
      GetTopCategory(route.params.id).then( data => {
        Toplists.value = data.result.children
      })}
      // 监听路由id实现动态跳转
      watch(() => route.params.id, (newV) => {
        //  newV && GetSubList()
        if(newV && `/category/${newV}` === route.path) GetSubList()
      },{ immediate: true})
    return { sliders, CateGoryList, Toplists }
    }
}
</script>

<style scoped lang="less">
.fadeAnimation();
 .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>