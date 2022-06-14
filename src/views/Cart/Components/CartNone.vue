<template>
  <div class="box">
      <img src="../../../assets/images/none.png" alt="">
      <p>您还没有添加任何商品</p>
      <Button class="primary" @click="checkOut">继续康康</Button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: 'CartNone',
    setup() {
        const router = useRouter()
        const checkOut = () => {
            router.push('/')
        }
        return { checkOut }
    }
}
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    height: 600px;
    text-align: center;
    padding-top: 180px;
    line-height: 50px;
    background-color: #fff;
}
</style>