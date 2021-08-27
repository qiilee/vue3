<template>
    <div>
        <p>{{ state.a }}</p>
        <p>{{ state.first.b }}</p>
        <p>{{ state.first.second.c }}</p>
        <button @click="change1">改变1</button>
        <button @click="change2">改变2</button>
    </div>
</template>
<script>
// 首先我们点击了第二个按钮，改变了第二层的 b 和第三层的 c，虽然值发生了改变，但是视图却没有进行更新；

// 当我们点击了第一个按钮，改变了第一层的 a 时，整个视图进行了更新；

// 由此可说明，shallowReactive 监听了第一层属性的值，一旦发生改变，则更新视图


import { shallowReactive } from "vue";
export default {
  setup() {
    const obj = {
      a: 1,
      first: {
        b: 2,
        second: {
          c: 3
        }
      }
    };

    const state = shallowReactive(obj);

    function change1() {
      state.a = 7;
    }

    function change2() {
      state.first.b = 8;
      state.first.second.c = 9;
      console.log(state);
    }

    return { state,change1,change2 };
  }
};
</script>