<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, reactive } from 'vue'
import { Student } from '../store'
export default defineComponent({
  props: {
    success: { type: String },
    student: {
      type: Object as PropType<Student>,
      required: true
    }
  },
  setup() {
    const year = ref(2020)
    const state = reactive({ count: 3 });

    function handleClick() {
      state.count++;
    }
    return { year, state, handleClick };
  }
})
</script>