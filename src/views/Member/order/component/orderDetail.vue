<template>
    <div class="detail-action">
      <div class="state">
        <span class="iconfont" :class="[`icon-order-${orderStatus[order.orderState].name}`]"></span>
        <p>{{orderStatus[order.orderState].label}}</p>
      </div>
      <div class="info">
        <p>订单编号：{{order.id}}</p>
        <p>下单时间：{{order.createTime}}</p>
      </div>
      <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <Button @click="$router.push('/member/pay?orderId='+order.id)" type="primary" size="small">立即付款</Button>
        <Button type="gray" size="small" @click="onCancelOrder(order)">取消订单</Button>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <Button type="primary" size="small" @click="$router.push(`/member/checkout?id=${order.id}`)">再次购买</Button>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <Button type="primary" size="small" @click="onConfirmOrder(order)">确认收货</Button>
        <Button type="plain" size="small">再次购买</Button>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <Button type="primary" size="small" @click="$router.push(`/member/checkout?id=${order.id}`)" >再次购买</Button>
        <Button type="plain" size="small">评价商品</Button>
        <Button type="gray" size="small">申请售后</Button>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <Button type="primary" size="small" @click="$router.push(`/member/checkout?id=${order.id}`)">再次购买</Button>
        <Button type="plain" size="small">查看评价</Button>
        <Button type="gray" size="small">申请售后</Button>
      </template>
      <!-- 已取消 -->
    </div>
    <!-- 取消订单 -->
      <orderCancel ref="target" />
    </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { useCanel, ConfirmOrder } from '../index.vue'
import orderCancel from './order-cancel'
export default {
  name: 'OrderDetailAction',
  components: { orderCancel },
  props: {
    order: {
      type: Object,
      default: ()=> {}
    }
  },
  setup() {
   return { orderStatus, ...useCanel(), ...ConfirmOrder() }
  }
}
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>