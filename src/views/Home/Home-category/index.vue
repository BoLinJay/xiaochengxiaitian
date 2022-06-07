<template>
  <div class='home-category' @mouseleave="categoryId = null">
    <ul class="menu" >
      <li :class="{active: categoryId === ele.id}" v-for="ele in menyList" :key="ele.id" @mouseenter="categoryId = ele.id" >
        <RouterLink :to="`/category/${ele.id}`">{{ele.name}} </RouterLink>
        <template v-if="ele && ele.children">
        <RouterLink 
        v-for="sun in ele.children"
        :key="sun.id"
        :to="`/category/sub/${sun.id}`" >
        {{sun.name}} 
        </RouterLink>
        </template>
        <!-- 骨架屏 -->
        <template v-else>
           <Skeleton width="60px" height="18px" bg="rgba(255,255,255,0.2)" class="shan"/>
+          <Skeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" class="shan"/>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="categoryAll">{{categoryAll.id === 'brand'?'品牌':'分类' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="categoryAll && categoryAll.goods">
        <li v-for="item in categoryAll.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name">{{item.name}}</p>
              <p class="desc">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌推荐 -->
      <ul v-if="categoryAll && categoryAll.brands">
        <li class="brand" v-for="item in categoryAll.brands" :key="item.id">
            <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
                <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
                <p class="name ellipsis">{{item.name}}</p>
                <p class="desc ellipsis-2">{{item.desc}}</p>
            </div>
            </RouterLink>
        </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { Getbrand } from '@/api/home.js'
import Skeleton from '@/components/Plugins/Skeleton.vue';
export default {
    name: "HomeCategory",
    setup() {
        // 左侧栏数据
        const store = useStore();
        const brand = reactive({
            id: "brand",
            name: "品牌",
            children: [{ id: "brand-ch", name: "品牌推荐" }],
            brands: []
        });
        const menyList = computed(() => {
            const list = store.state.category.list.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    children: item.children && item.children.slice(0, 2),
                    goods: item.goods
                };
            });
            list.push(brand);
            return list;
        });
        // 弹出层数据
        const categoryId = ref(null);
        const categoryAll = computed(() => {
            return menyList.value.find(item => item.id === categoryId.value);
        });
        // 品牌推荐数据获取
        Getbrand().then(data => {
            brand.brands = data.result;
        });
        return { menyList, categoryAll, categoryId };
    },
    components: { Skeleton }
}
</script>

<style lang="less" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,&.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
//   弹层样式
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    z-index:999;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {     
            background: #e3f9f4;
          }
          img {
              width: 95px;
              height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
		    width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
     .brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>