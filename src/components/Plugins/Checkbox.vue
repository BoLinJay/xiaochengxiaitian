<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'Checkbox',
   props: {
      modelValue: {
        type: Boolean,
        dafault: false
      }
    },
  setup (props, { emit }) {
    const checked = ref(false)
    // 监听父组件传来的值
    watch( () => props.modelValue, (newV) => {
      checked.value = newV
    }, { immediate: true})

    const changeChecked = () => {
      checked.value = !checked.value
        // 使用emit通知父组件数据的改变
      emit('change', checked.value)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>