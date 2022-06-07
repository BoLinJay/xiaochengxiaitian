<template>
   <ul class="navs">
        <li class="home"><RouterLink to="/">首页</RouterLink></li>
        <li 
        v-for="item in list" 
        :key="item.id"
        @mousemove="show(item)"
        @mouseleave="hide(item)"
        @click="hide(item)"
        >
        <router-link :to="`/category/${item.id}`" >{{item.name}}</router-link>
            <div class="layer" :class="{open: item.open}">
            <ul>
            <li 
            v-for="sub in item.children" 
            :key="sub.id"
            @click="hide(item)"
            >
                <router-link :to="`/category/sub/${sub.id}`">
                <img :src="sub.picture">
                <p>{{sub.name}}</p>
                </router-link>
            </li>
            </ul>
            </div>
        </li>
      </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'HeaderNav',
  setup() {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    const show = (item) => {
      store.commit('category/show', item)
    }
    const hide = (item) => {
      store.commit('category/hide', item)
    }

    return { list, show, hide}
  }

}
</script>
    
<style lang="less" scoped>
  .navs {
    position:relative;
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    > li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      //   > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
      }
    }
  }
  .layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  z-index:999;
   &.open {
      height: 132px;
      opacity: 1;
    }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>