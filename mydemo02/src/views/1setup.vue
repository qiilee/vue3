<template>
  <div id="app">
   <p>{{ number }}</p>
   <button @click="add">增加</button>
  </div>
</template>
 
<script>
// 1. 从 vue 中引入 ref 函数
import {ref} from 'vue'
export default {
  name: 'App',
  setup() {
   // 2. 用 ref 函数包装一个响应式变量 number
    let number = ref(0)
    
    // 3. 设定一个方法
    function add() {
     // number是被ref函数包装过了的，其值保存在.value中
      number.value ++
    }
    
    // 4. 将 number 和 add 返回出去，供template中使用
    return {number, add}
  }
  
}
</script>