
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'  //引入不要错
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入初始化的样式文件
import '@/styles/common.scss'

import App from './App.vue'
import router from './router'
//测试接口函数
import {getCategory} from '@/api/testApi'

//定义懒加载组件并注册
import {lazyPlugin} from '@/directives'

//引入全局组件插件
import {componentPlugin} from '@/components'

getCategory().then((res)=>{

})
const app = createApp(App)

//创建实例并注册pinia
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

//注册组件插件
app.use(componentPlugin)

//注册懒加载插件
app.use(lazyPlugin)

app.mount('#app')
