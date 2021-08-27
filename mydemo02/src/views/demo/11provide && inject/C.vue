<script>
import {inject} from 'vue'
export default {
    setup() {    
        // 接收A.vue传递过来的数据
        inject('info')  // {name: '前端印象', age: 22}
    }
}
</script>