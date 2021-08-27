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
// 这是一个浅层的 ref，与 shallowReactive 一样是拿来做性能优化的

// shallowReactive 是监听对象第一层的数据变化用于驱动视图更新，
// 那么 shallowRef 则是监听 .value 的值的变化来更新视图的
import { shallowRef } from "vue";
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

    const state = shallowRef(obj);
    console.log(state);

    function change1() {
      // 直接将state.value重新赋值
      state.value = {
        a: 7,
        first: {
          b: 8,
          second: {
            c: 9
          }
        }
      };
    }

    function change2() {
      state.value.first.b = 8;
      state.value.first.second.c = 9;
      console.log(state);
    }

    return { state, change1, change2 };
  }
};
</script>