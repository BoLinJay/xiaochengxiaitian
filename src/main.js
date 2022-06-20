import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 使用自定义全局组件
import UI from '@/components/Plugins'
// 重置样式的库
import 'normalize.css'
// 自己定义的样式库
import '@/assets/styles/common.less'
import './Mock'
createApp(App).use(store).use(router).use(UI).mount('#app')
