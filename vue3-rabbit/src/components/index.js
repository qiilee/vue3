//把components中的所有组件进行全局化注册
//通过插件的方式
import imageView from './imgView/index.vue'
import sku from './XtxSku/index.vue'

export const componentPlugin={
    install(app){
        //app.componnet('组件的名字',组件配置对象)
        app.component('XtximageView',imageView)
        app.component('Xtxsku',sku)
    }
}