<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span v-if="!fullLocation" class="placeholder">{{placeholder}} </span>
      <span class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
    <span v-if="loading" class="loading"></span>
    <template v-else>
      <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.id">{{item.name}}</span>
    </template>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { ref, reactive, computed } from 'vue'
 // 配送返回
      // 获取城市数据
      // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
      // 2. 何时获取？打开城市列表的时候，做个内存中缓存
      // 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const GetCityData = () => {
  return new Promise( (resolve, reject) => {
    if(window.cityData) {
      resolve(window.cityData)
    } else {
      let url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then( res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
export default {
    name: 'City',
    props: {
      fullLocation: {
        type: Object,
        default: () => {}
      },
      placeholder: {
      type: String,
      default: '请选择所在地区'
    }
    },
    setup(prop, { emit }) {
            // 城市数据
      const allcityData = ref([])
      const active = ref(false)
      const loading = ref(false)
      const changeResult = reactive({
            provinceCode: '',
            provinceName: '',
            cityCode: '',
            cityName: '',
            countyCode: '',
            countyName: '',
            fullLocation: ''  
          })
          
          const open = () => {
            active.value = true
            loading.value = true
              GetCityData().then( data => {
                allcityData.value = data
                loading.value = false
            })
            // 清空选择结果
            for (const key in changeResult) {
              changeResult[key] = ''
            }
          }
          const show = () => {
            active.value = false
          }
          const toggleDialog = () => {
            active.value? show() : open() 
          }
          const target = ref(null)
          onClickOutside(target, () => {
            show()
          })
        const changeItem = (item) => {
          // 省份
          if (item.level === 0) {
            changeResult.provinceCode = item.code
            changeResult.provinceName = item.name
          }
          // 市
          if (item.level === 1) {
            changeResult.cityCode = item.code
            changeResult.cityName = item.name
          }
           // 地区
          if (item.level === 2) {
            changeResult.countyCode = item.code
            changeResult.countyName = item.name
            changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
            show()
            emit('change', changeResult)
          }
        }
      
       // 定义计算属性
      const currList = computed(() => {
        // 省份
        let currList = allcityData.value
        // 城市
        if (changeResult.provinceCode) {
          currList = currList.find(p => p.code === changeResult.provinceCode).areaList
        }
        // 地区
        if (changeResult.cityCode) {
          currList = currList.find(c => c.code === changeResult.cityCode).areaList
        }
        return currList
      })

      return { active, toggleDialog, target, allcityData, loading, changeResult, changeItem, currList }
    }
}
    

</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;  
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }

}
</style>