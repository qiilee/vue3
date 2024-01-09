//定义懒加载插件
//vueUse判断是否进入视口区域
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin={
    install(app){
        //懒加载指令逻辑
        //定义全局指令---------------
  app.directive('img-lazy',{
    mounted(el,binding){
        //el：指定绑定的元素,图片
        //binding:binding.value 指令等于号后面是绑定的表达式的值  图片url
       const {stop} = useIntersectionObserver(
              el, //这里是绑定的元素，isIntersecting这个是是否进入视口区域
            ([{ isIntersecting }]) => {
                if(isIntersecting){
                    //true进入视口区域
                    el.src=binding.value
                    //第一次加载完成后就停止监听，防止内存浪费
                    stop()
                }
            },
          )
    }
})
    }
}