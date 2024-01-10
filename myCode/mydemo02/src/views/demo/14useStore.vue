<script>
// 从 vuex 中导入 useStore 方法
import {useStore} from 'vuex'
export default {
    setup() {    
        // 获取 vuex 实例
        const store = useStore()

        console.log(store)
    }
}
</script>