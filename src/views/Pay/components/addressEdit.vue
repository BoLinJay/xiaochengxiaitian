<template>
  <Dialog :title="(formData.id?'修改':'添加')+ '收货地址'" v-model:visible="dialogVisible">
    <form class="address-edit">
       <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <City :fullLocation="fullLocation"  @change="changeCty"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input v-model="formData.address" class="input" placeholder="请输入详细地址" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
          <input v-model="formData.postalCode" class="input" placeholder="请输入邮政编码" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input  v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
        </div>
      </div>
    </div>
    </form>
    <template v-slot:footer>
      <Button @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</Button>
      <Button @click="submit" type="primary">确认</Button>
    </template>
  </Dialog>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import { addAddress, editAddress } from '@/api/cart'
import Message from '@/components/Plugins/Message'
export default {
  name: 'AddressEdit',
  emits: ['on-success'],
  props: {
    addressList: {
      type: Array,
      default: ()=>[]
    }
  },
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    // 打开函数
    const open = (address) => {
      if(address.id) {
        for(let key in address) {
          formData[key] = address[key]
        }
        fullLocation.value = address.fullLocation
      } else {
        for(let key in formData) {
        if(key === 'isDefault') {
          formData[key] = 0
        } else {
          formData[key] = null
        }
      }
      }
      dialogVisible.value = true
    }
        // 表单数据
    const formData = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0,
    })
    const  fullLocation = ref('')
    // 选择地区
    const changeCty = (data) => {
      formData.provinceCode = data.provinceCode
      formData.cityCode = data.cityCode
      formData.countyCode = data.countyCode
      fullLocation.value = data.fullLocation
    }
    // 提交
    const submit = () => {
      if(formData.id) {
        // 修改
        editAddress(formData,formData.id).then(data => {
          // 修改成功
          Message({ text: '修改收货地址成功'})
          dialogVisible.value = false
          emit('on-success', formData)
        })
      } else  {        
          
        addAddress(formData).then(data => {
        Message({text: '添加地址成功'})
        formData.id = data.result.id
        dialogVisible.value = false
        emit('on-success', formData)
      })
      }
      
    }
    return { dialogVisible, open, changeCty, formData, submit, fullLocation  }
  }
}
</script>
<style scoped lang="less">
.address-edit {
.xtx-dialog {
  :deep(.wrapper){
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
}
</style>