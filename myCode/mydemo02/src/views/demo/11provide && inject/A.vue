<script>
import { provide } from "vue";
export default {
  setup() {
    // 与 Vue2中的 provide 和 inject 作用相同，只不过在Vue3中需要手动从 vue 中导入

    // 这里简单说明一下这两个方法的作用：

    //     provide ：向子组件以及子孙组件传递数据。接收两个参数，第一个参数是 key，即数据的名称；第二个参数为 value，即数据的值
    //     inject ：接收父组件或祖先组件传递过来的数据。接收一个参数 key，即父组件或祖先组件传递的数据名称

    // 假设这有三个组件，分别是 A.vue 、B.vue 、C.vue，其中 B.vue 是 A.vue 的子组件，C.vue 是 B.vue 的子组件

    const obj = {
      name: "前端印象",
      age: 22
    };

    // 向子组件以及子孙组件传递名为info的数据
    provide("info", obj);
  }
};
</script>

