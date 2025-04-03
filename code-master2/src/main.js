import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mLibs from './libs'
import mDirective from './directives'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import './permission'

import './styles/index.scss'
import 'virtual:svg-icons-register'

// 设置 rem
useREM()
// 初始化主题
useTheme()
createApp(App).use(router).use(store).use(mLibs).use(mDirective).mount('#app')
