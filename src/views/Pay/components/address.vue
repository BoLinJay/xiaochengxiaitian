<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a @click="openAddressEdit(showAddress)"  v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <Button class="btn" @click="openAddress">切换地址</Button>
      <Button class="btn" @click="openAddressEdit({})">添加地址</Button>
    </div>
  </div>
  <!-- 切换地址弹出框 -->
  <Dialog title="切换收货地址" v-model:visible="dialogVisible" class="dialog"> 
  <div class="overflow">
    <div 
    class="text item" 
    v-for="item in list" 
    :key="item.id"
    @click="selectedAddress = item"
    :class="{active:selectedAddress && selectedAddress.id === item.id}"
    >
       <ul>
         <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
         <li><span>联系方式：</span>{{item.contact}}</li>
         <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
       </ul>
     </div>
  </div>
    <template #footer>
      <Button @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</Button>
      <Button @click="confirmAddress" type="primary">确认</Button>
    </template>
  </Dialog>
  <!-- 添加地址弹出框 -->
  <addressEdit @on-success="successHandler" ref="addressEdit" :addressList="list" />
</template>
<script>
import { ref } from 'vue'
import Dialog from '@/components/Plugins/Dialog'
import addressEdit from './addressEdit'
import { findCheckoutInfo } from '@/api/pay'
export default {
  name: 'CheckoutAddress',
  emits: ['change'],
  props: {
      list: {
          type: Array,
          default: ()=>[]
      }
  },
  components: { Dialog, addressEdit },
  setup(props, { emit }) {
      const showAddress = ref(null)
      // 处理默认地址
      const defaultAddress = props.list.find(item => item.isDefault === 0)
      if(props.list.length) {
      if(defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      } 
      }
      const dialogVisible = ref(false)
      // 通知父组件地址Id
      emit('change', showAddress.value && showAddress.value.id)
      // 选中的地址
      const selectedAddress = ref(null)
      // 确认按钮
      const confirmAddress = () => {
        dialogVisible.value = false
        showAddress.value = selectedAddress.value
        emit('change', selectedAddress.value?.id)
      }
      // 打开弹出框按钮
      const openAddress = () => {
        dialogVisible.value = true
        // 清除上一次选择的地址
        selectedAddress.value = null
      }
      // 打开添加地址框
      const addressEdit = ref(null)
      const openAddressEdit = (address) => {
        addressEdit.value.open(address)
      }
      // 接收新添加的地址
      const successHandler = (formData) => {
        const editAddress = props.list.find(item => item.id === formData.id)
        if(editAddress) {
          // 修改
          console.log(editAddress);
          for (const key in editAddress) {
           editAddress[key] = formData[key]
          } 
        } else {
          const json = JSON.stringify(formData)  // 需要克隆下，不然使用的是对象的引用
          // eslint-disable-next-line vue/no-mutating-props
          props.list.unshift(JSON.parse(json))
        }
      }
      return { 
        showAddress, 
        dialogVisible, 
        selectedAddress, 
        confirmAddress, 
        openAddress, 
        openAddressEdit, 
        addressEdit,
        successHandler,
        }
  }
}
</script>
<style scoped lang="less">
.dialog {
  .overflow {
    max-height: 270px;
    overflow: auto;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>