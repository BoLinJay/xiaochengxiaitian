<template>
  <div class="app-header-sticky" :class="{show:y>78,hide:y<78}" >
    <div class="container" v-show="y>78">
      <RouterLink class="logo" to="/" />
      <HeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from './Header-nav'
import { ref, onMounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'HeaderSticky',
  components: { HeaderNav },
  setup() {
    //   组合式API方式吸顶
     const { y } = useWindowScroll()
    //传统方式吸顶
      /* const y = ref(0)
      onMounted(() => {
          window.onscroll = () => {
            const screenTop = document.documentElement.scrollTop
            y.value = screenTop
          }
      }) */

      return { y }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  &.hide {
      transition: all .5s linear;
      transform: translateY(-100%);
  }
  &.show {
    transition: all .5s linear;
    transform: none;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>