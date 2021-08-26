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