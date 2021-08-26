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