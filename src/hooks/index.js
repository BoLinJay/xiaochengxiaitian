// 复用逻辑函数
// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { onUnmounted, ref } from 'vue'

// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },{
      threshold: 0
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}


/**
 * 订单支付倒计时函数
 * 
 */
export const usepayTime = () => {
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume} = useIntervalFn(()=> {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm秒ss分')
    if(time.value <= 0) {
      pause()
    }
  }, 1000, false)

  const start = (countDown) => {
    if(countDown > -1) {
      time.value = countDown
      timeText.value = dayjs.unix(time.value).format('mm秒ss分')
      resume()
    }
  }

  onUnmounted(()=> {
    pause()
  })
  return {
    start,
    timeText,
    time
  }
}