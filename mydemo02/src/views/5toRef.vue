<template>
  <div id="app">
      {{state}}
  </div>
</template>
 
    <script>
    // 1. 导入 toRef
    import {toRef} from 'vue'
    export default {
        setup() {
            const obj = {count: 3}
            // 2. 将 obj 对象中属性count的值转化为响应式数据
            const state = toRef(obj, 'count')
      
            // 3. 将toRef包装过的数据对象返回供template使用
            return {state}
        }
    }
    </script>