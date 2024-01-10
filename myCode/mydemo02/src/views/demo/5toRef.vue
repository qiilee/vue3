<template>
    <div id="app">
        {{state}}
        <button @click="myFn">按钮</button>

        <p>{{ state1 }}</p>
        <button @click="add1">增加ref</button>

        <p>{{ state2 }}</p>
        <button @click="add2">增加toRef</button>
    </div>
</template>
 
<script>
/*
  1.toRef
  创建一个ref类型数据, 并和以前的数据关联
  2.toRefs
  批量创建ref类型数据, 并和以前数据关联
  3.ref和toRef区别:
  ref->复制, 修改响应式数据不会影响以前的数据
  toRef->引用, 修改响应式数据会影响以前的数据
  ref->数据发生改变, 界面就会自动更新
  toRef->数据发生改变, 界面也不会自动更新


  toRef应用场景:
  如果想让响应式数据和以前的数据关联起来, 并且更新响应式数据之后还不想更新UI, 那么就可以使用toRef

  * */

// 1. 导入 toRef
import { ref, toRef } from "vue";
export default {
  setup() {
    const obj = { count: 3 };
    // 2. 将 obj 对象中属性count的值转化为响应式数据
    const state = toRef(obj, "count");
    const state1 = ref(obj.count);
    const state2 = toRef(obj, "count");

    function myFn() {
      console.log("state", state);
      state.value++; // toRef-数据变化不会自动更新界面

      console.log("obj", obj);
      console.log("state", state);
    }
    function add1() {
      state1.value++;
      console.log("原始值：", obj);
      console.log("响应式数据对象：", state1);

      // 可以看到，在对响应式数据的值进行 +1 操作后，视图改变了，原始值未改变，响应式数据对象的值也改变了，这说明 ref 是对原数据的一个拷贝，不会影响到原始值，同时响应式数据对象值改变后会同步更新视图
    }
    function add2() {
      state2.value++;
      console.log("原始值：", obj);
      console.log("响应式数据对象：", state2);

      // 可以看到，在对响应式数据的值进行 +1 操作后，视图未发生改变，原始值改变了，响应式数据对象的值也改变了，这说明 toRef 是对原数据的一个引用，会影响到原始值，但是响应式数据对象值改变后会不会更新视图
    }

    // 3. 将toRef包装过的数据对象返回供template使用
    return { state, myFn, state1, state2, add1, add2 };
  }
};


// 总结：
//     ref 是对传入数据的拷贝；toRef 是对传入数据的引用
//     ref 的值改变会更新视图；toRef 的值改变不会更新视图
</script>