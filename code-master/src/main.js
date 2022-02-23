import { createApp } from 'vue'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 导入 svgIcon
import installIcons from '@/icons'
// filter
import installFilter from '@/filters'
import installDirective from '@/directives'
// 导入全局样式
import './styles/index.scss'
// 导入权限控制模块
import './permission'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
