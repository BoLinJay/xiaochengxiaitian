<template>
    <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <orderSteps :order="order"/>
    <!-- 物流栏 -->
    <DetailLogistics :order="order"/>
    <!-- 订单商品信息 -->
    <OrderInfo :order="order" />
  </div>
</template>

<script>
import { findOrder } from '@/api/pay'
import DetailAction from './component/orderDetail.vue'
import orderSteps from './component/orderSteps.vue'
import DetailLogistics from './component/detail-logistics.vue'
import OrderInfo from './component/order-info.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'Detail',
    components: { DetailAction, orderSteps, DetailLogistics, OrderInfo },
    setup() {
      const route = useRoute()
      const order = ref(null)
      findOrder(route.params.id).then(data => {
        order.value = data.result
      })

      return { order }
    }
}
</script>

<style lang="less" scoped>
.order-detail-page {
  background: #fff;
}
</style>