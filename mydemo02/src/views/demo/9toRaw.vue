<template>
    <div>
        <p>{{ state.name }}</p>
        <p>{{ state.age }}</p>
        <button @click="change">改变</button>
    </div>
</template>
 
<script>
import { reactive } from "vue";
export default {
  setup() {
    const obj = {
      name: "前端印象",
      age: 22
    };

    const state = reactive(obj);

    function change() {
      state.age = 90;
      console.log(obj); // 打印原始数据obj
      console.log(state); // 打印 reactive对象
    }

    return { state, change };
  }
};
</script>