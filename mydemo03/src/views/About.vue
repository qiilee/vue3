<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{year}}</p>
    <p>{{state}}</p>
    <button @click="handleClick">加一</button>
    <p>{{student}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, reactive } from 'vue'
import { Student } from '../store'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  props: {
    success: { type: String }
  },
  setup () {
    const year = ref(2020)
    const state = reactive({ count: 3 })

    function handleClick () {
      state.count++
    }

    // const student = reactive<Student>({ name: '阿勇', age: 16 })
    // const student: Student = reactive({ name: '阿勇', age: 16 })
    const student = reactive({ name: '阿勇', age: 16, class: 'cs' }) as Student

    // vue-router
    console.log(useRoute())
    console.log(useRouter())
    return { year, state, handleClick, student }
  }
})
</script>
