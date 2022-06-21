<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
    <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{item.label}}
        </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单详情 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderGoods.length === 0">暂无数据</div>
      <orderItem 
      :orderGoods="orderGoods"
      @on-cancel-order="onCancelOrder" 
      @order-delete="orderDelete" 
      @on-confirm-order="onConfirmOrder"
      @on-order-logistics="onOrderLogistics"  />
    </div>
    <!-- 分页器 -->
    <Pagination 
     v-if="total > params.pageSize"
      @current-change="params.page=$event"
      :total="total"
      :pageSize="params.pageSize"
      :currentPage="params.page"  />
      <!-- 取消订单 -->
      <orderCancel ref="target" />
      <!-- 查看物流 -->
      <OrderLogistics ref="OrderLogistics"/>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import orderItem from './component/orderItem'
import orderCancel from './component/order-cancel'
import { delteOrder, findOrderList, confirmOrder } from '@/api/member'
import Confirm from '@/components/Plugins/Confirm'
import Message from '@/components/Plugins/Message'
import OrderLogistics from './component/OrderLogistics'
export default {
  name: 'MemberOrder',
  components: { orderItem, orderCancel, OrderLogistics },
  setup () {
    const getOrderList = () => {
       loading.value = true
       findOrderList(params).then(data => {
        orderGoods.value = data.result
        total.value = data.result.counts
        loading.value = false
       })
    }
     // 加载
    const loading = ref(false)
    const activeName = ref('all')
    // 分页器
    const total = ref(0)
    const params = reactive({
      orderState: '',
      page: 1,
      pageSize: 5
    })
    const orderGoods = ref([])
    // tab栏切换改变数据
    const tabClick = ({index}) => {
      params.page = 1
      params.orderState = index
    }
    watch(params, newV => {
      getOrderList()
    }, { immediate: true})
    // 删除订单
    const orderDelete = (goods) => {
      Confirm({text:'确认删除该订单吗？'}).then(()=> {
        delteOrder([goods.id]).then(()=> {
          Message({text: '删除成功'})
          getOrderList()
        })
      }).catch(()=> {

      })
    }
    return { 
      activeName, 
      orderStatus, 
      orderGoods, 
      tabClick, 
      loading, 
      total, 
      params, 
      orderDelete,
      ...useCanel(), 
      ...ConfirmOrder(),
      ...getOrderLogistics()
      }
  }
}
// 取消订单
export const useCanel = ()  => {
  const target = ref(null)
  const onCancelOrder = (goods) => {
    target.value.open(goods)
  }
  return { onCancelOrder , target }
}
 // 确认收货
 export const ConfirmOrder = () => {
    const onConfirmOrder = (goods) => {
      Confirm({text: '确认收货吗?'}).then(()=> {
         confirmOrder(goods.id).then(()=> {
           Message({text:'收货成功'})
           goods.orderState = 4
      })
      }).catch(()=>{

      })
    }

    return { onConfirmOrder }
 }
//  查看物流
export const getOrderLogistics = () => {
  const OrderLogistics = ref(null)
  const onOrderLogistics = (order) => {
    OrderLogistics.value.open(order)
  }

  return { onOrderLogistics, OrderLogistics }
}
</script>
<style scoped lang="less">
.order-list {
  background-color: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>