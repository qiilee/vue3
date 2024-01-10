<template>
  <div id="app">
    {{state}}
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
/*
  1.toRef
  创建一个ref类型数据, 并和以前的数据关联
  2.toRefs
  批量创建ref类型数据, 并和以前数据关联
  * */

// 1. 导入 toRefs
import { toRefs } from "vue";
export default {
  setup() {
    const obj = {
      name: "前端印象",
      age: 22
    };
    // 2. 将 obj 对象中属性count的值转化为响应式数据
    const state = toRefs(obj);

    function myFn() {
      state.name.value = "zs";
      state.age.value = 666;
      console.log(obj); // { name: "zs", age: 666 }
      console.log(state); //
    }

    return { state, myFn };
  }
};
</script>