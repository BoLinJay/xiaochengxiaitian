<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
            <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
            <li><a href="javascript:;" @click="exit">退出登录</a></li>
        </template>
        <template v-else>
            <li><a @click="enter">请先登录</a></li>
            <li><a href="javascript:;">免费注册</a></li>
        </template>
            <li><a href="javascript:;">我的订单</a></li>
            <li><a href="javascript:;">会员中心</a></li>
            <li><a href="javascript:;">帮助中心</a></li>
            <li><a href="javascript:;">关于我们</a></li>
            <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Navbar',
  setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      const profile = computed(() => {
          return store.state.user.profile
      })
      // 退出登录
      const exit = () => {
        store.commit('user/setUser', {})
        store.dispatch('cart/setCart').then(() => {
          router.push('/login')
        })
      }
      // 登录
      const enter = () => {
        store.commit('user/setUrl', route.path)
        router.push('/login')
      }
      return { profile, exit, enter}
  }
}
</script>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>