<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" :class="{disabled: index === 0} " class="iconfont icon-angle-left prev" @click="goto(-1)"></a>
      <a href="javascript:;" :class="{disabled: index === 1} " class="iconfont icon-angle-right next" @click="goto(1) "></a>
    </template>
    <div class="box" ref="box">
      <ul class="list" v-if="BrandList.length" :style="{transform:`translateX(${-index*1240}px)`}" >
        <li v-for="item in BrandList" :key="item.id">
          <RouterLink to="/">
            <img v-lazyload="item.picture" alt="">
          </RouterLink>
        </li>
      </ul>
      <div v-else class="skeleton">
+          <Skeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
+     </div>
    </div>
  </HomePanel>
</template>

<script>
import { Getbrand } from '@/api/home'
import { useLazyData } from '@/hooks'
import HomePanel from '../HomePanel'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup() {
    // 注意：useLazyData需要的是API函数，如果遇到要传参的情况，自己写函数再函数中调用API 懒加载
    const { target, result } = useLazyData(() => Getbrand(10))

    // 按钮切换
    const index = ref(0)
    const goto = (steps) => {
        const newV = index.value + steps
        if(newV < 0 || newV > 1) return 
        index.value = newV
    }

    return { BrandList: result, target, goto, index }
  }
}
</script>

<style scoped lang='less'>
.skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>