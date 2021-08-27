<template>
    <div id="app">
    </div>
</template>
   
   
<script>
// import { reactive } from "vue";
// export default {
//   setup() {
//     const obj = {
//       a: 1,
//       first: {
//         b: 2,
//         second: {
//           c: 3
//         }
//       }
//     };

//     const state = reactive(obj);

//     console.log(state);
//     console.log(state.first);
//     console.log(state.first.second);
//   }
// };

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

    console.log(state);
    console.log(state.first);
    console.log(state.first.second);
  }
};
</script>