<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{label}}</div>
    <div class="numbox">
      <a @click="step(-1)" href="javascript:;">-</a>
      <input type="text" readonly v-model="num">
      <a @click="step(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'NumBox',
   props: {
        label: {
        type: String,
        default: ''
        },
        modelValue: {
        type: Number,
        default: 1
        },
        min: {
        type: Number,
        default: 1
        },
        max: {
        type: Number,
        default: 100
        }
    },
    setup(props, { emit }) {
        const num = useVModel(props, 'modelValue', emit)
        const step = (val) => {
            const newV = num.value + val
            if( newV > props.max || newV < props.min) return 
            num.value = newV
            emit('change', newV)
        }

        return { step, num}
    }
  
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right:1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left:1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>