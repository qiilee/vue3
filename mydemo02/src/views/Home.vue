import { defineComponent, ref } from 'vue'
const Component = defineComponent({
  props: {
    success: { type: String },
    student: {
      type: Object as PropType<Student>,
      required: true
    }
  },
  setup() {
  const year = ref(2020)
  const month = ref<string | number>('9')
  month.value = 9 // OK
  
  const result = year.value.split('') // => Property 'split' does not exist on type 'number'
}