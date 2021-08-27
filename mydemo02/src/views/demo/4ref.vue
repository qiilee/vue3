<template>
  <div id="app">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <button @click="increase">+1</button>
  </div>
</template>
 
<script>
//  ref 就是通过 reactive 包装了一个对象 ，然后是将值传给该对象中的 value 属性，
// 这也就解释了为什么每次访问时我们都需要加上 .value

// 我们可以简单地把 ref(obj) 理解为这个样子 reactive({value: obj})

// 那么我们到底该如何选择 ref 和 reactive 呢？

// 建议：

//     基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref
//     引用类型值（Object 、Array）使用 reactive

import { ref, reactive, computed } from "vue";
export default {
  name: "App",
  setup() {
    const count = ref(0);
    const obj = { count: 3 };
    const state1 = ref(obj);
    const state2 = reactive(obj);

    const double = computed(() => {
      return count.value * 2;
    });
    const increase = () => {
      count.value++;
    };

    console.log(state1.value == state2); // true
    console.log("ref", state1);
    console.log("reactive", state2);

    return {
      count,
      increase,
      double
    };
  }
};
</script>