<template>
  <div id="app"></div>
</template>
 
<script>
// 1. 从 vue 中引入 多个生命周期函数
import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount} from 'vue'
export default {
  name: 'App',
  setup() {
    onBeforeMount(() => {
      // 在挂载前执行某些代码
      console.log('onBeforeMount')
    })
 
    onMounted(() => {
      // 在挂载后执行某些代码
      console.log('onMounted')
    })
 
    onBeforeUpdate(() => {
      // 在更新前前执行某些代码
      console.log('onBeforeUpdate')
    })
 
    onUpdated(() => {
      // 在更新后执行某些代码
      console.log('onUpdated')
    })
 
    onBeforeUnmount(() => {
      // 在组件销毁前执行某些代码
      console.log('onBeforeUnmount')
    })
 
    // unMounted(() => {
    //   // 在组件销毁后执行某些代码
    //   console.log('unMounted')
    // })
 
    return {}
  }
  
}
</script>