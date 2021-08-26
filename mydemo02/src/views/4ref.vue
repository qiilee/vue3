<template>
    <div id="app">
    </div>
</template>
 
<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    const obj = { count: 3 };
    const state1 = ref(obj);
    const state2 = reactive(obj);

    console.log(state1);
    console.log(state2);
  }
};
</script>