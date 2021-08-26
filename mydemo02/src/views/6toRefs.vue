<template>
    <div id="app">
        {{state}}
    </div>
</template>

<script>
// 1. 导入 toRefs
import { toRefs } from "vue";
export default {
  setup() {
    const obj = {
      name: "前端印象",
      age: 22,
      gender: 0
    };
    // 2. 将 obj 对象中属性count的值转化为响应式数据
    const state = toRefs(obj);

    // 3. 打印查看一下
    console.log(state);
  }
};
</script>