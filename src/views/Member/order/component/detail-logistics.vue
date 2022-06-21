<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{logistics.list[0].time}}</span>
      <span>{{logistics.list[0].text}}</span>
    </p>
    <a href="javascript:;" @click="onOrderLogistics(order)">查看物流</a>
    <!-- 查看物流 -->
    <OrderLogistics ref="OrderLogistics"/>
  </div>
</template>
<script>
import { logisticsOrder } from '@/api/member'
import { ref } from 'vue'
import { getOrderLogistics } from '../index'
import OrderLogistics from './OrderLogistics'
export default {
  name: 'DetailLogistics',
  components: { OrderLogistics },
  props: {
      order: {
          type: Object,
          default: ()=>{}
      }
  },
  setup(props) {
      const logistics = ref(null)
      logisticsOrder(props.order.id).then(data=> {
          logistics.value = data.result
      })
      return { logistics, ...getOrderLogistics() }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>