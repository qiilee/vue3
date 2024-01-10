<template>
    <div>
        <p>{{ state.name }}</p>
        <p>{{ state.age }}</p>
        <button @click="change">改变</button>        
    </div>
</template>

<script>
import {reactive, markRaw} from 'vue'
export default {
    setup() {
        const obj = {
          name: '前端印象',
          age: 22
        }
        // 通过markRaw标记原始数据obj, 使其数据更新不再被追踪
        const raw = markRaw(obj)   
        // 试图用reactive包装raw, 使其变成响应式数据
        const state = reactive(raw)    

        function change() {
          state.age = 90
          console.log(state);
        }

        return {state, change}
    }
}
</script>