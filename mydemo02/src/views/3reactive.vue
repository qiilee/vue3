    <template>
      <div id="app">
       <!-- 4. 访问响应式数据对象中的 count  -->
       {{ state.count }}
      </div>
    </template>
     
    <script>
    // 1. 从 vue 中导入 reactive 
    import {reactive} from 'vue'
    export default {
      name: 'App',
      setup() {
        // 2. 创建响应式的数据对象
        const state = reactive({count: 3})
     
        // 3. 将响应式数据对象state return 出去，供template使用
        return {state}
      }
    }
    </script>