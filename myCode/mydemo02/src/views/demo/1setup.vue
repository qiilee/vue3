<template>
  <div id="app">
    <p>{{ number }}</p>
    <button @click="add">增加</button>
    <button @click="del">减少</button>

    <p>{{ state }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>
 
<script>
// 1. 从 vue 中引入 ref 函数
import { ref } from "vue";
export default {
  name: "App",
  setup(props, context) {
    // 2. 用 ref 函数包装一个响应式变量 number
    let number = ref(0);
    let obj = { name: "lnj" };
    let state = ref(obj.name);
    console.log("this", this); // 在setup中，this 指向的是 undefined
    console.log("props", props);
    console.log("context", context);

    // 3. 设定一个方法
    function add() {
      // number是被ref函数包装过了的，其值保存在.value中
      number.value++;
    }
    function del() {
      number.value--;
    }
    function myFn() {
      state.value = "zs";
      console.log(obj); //{name:'lnj'}
      console.log(state); // {name:'zs'} 证明ref修改响应式数据不会影响原始数据，创建出来的数据和以前无关(复制)
    }

    // 4. 将 number 和 add 返回出去，供template中使用
    return { number, add, del, state, myFn };
  },
};
</script>