<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

//触发获取列表导航的action----要在顶部导航和吸顶导航的父组件调用
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';
const categoryStore = useCategoryStore();
onMounted(() => {
    categoryStore.getCategory()

})

</script>

<template>
    <LayoutFixed />
    <LayoutHeader />
    <LayoutNav />
    <!-- 添加key,破坏复用机制,强制销毁重建-->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
</template>