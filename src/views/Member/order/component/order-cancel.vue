<template>
    <Dialog title="取消订单" v-model:visible="visibleDialog" class="dialog">
    <!-- 组件内容 -->
    <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            v-for="(item, i) in cancelReason"
            :key="i"
            href="javascript:;"
            @click="curText = item"
            :class="{ active: curText === item }"
          >
            {{ item }}
          </a>
        </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <Button type="gray" @click="visibleDialog=false" style="margin-right:20px">取消</Button>
      <Button type="primary" @click="submit">确认</Button>
    </template>
  </Dialog>
</template>

<script>
import { ref } from 'vue'
import {cancelReason} from '@/api/constants'
import { cancelOrder } from '@/api/member'
import Message from '@/components/Plugins/Message'
export default {
    name: 'orderCancel',
    setup() {
      const curText = ref(null)
      const order = ref(null)
      const visibleDialog = ref(false)
        const open = (goods)=> {
            order.value = goods
            visibleDialog.value = true
        }
      // 确认
      const submit = () => {
        if(!curText.value) Message({text:'请选择取消原因'})
        cancelOrder(order.value.id, curText.value).then( data => {
          Message({text:'取消订单成功'})
        // 更新订单状态 
        order.value.orderState = 6
        // 关闭对话框
        visibleDialog.value = false
        })
      }
        return { open, visibleDialog, cancelReason, curText, submit}
    }    
}
</script>

<style lang="less" scoped>
.dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>