<script setup>
import homeCategory from './components/homeCategory.vue'
import homeBanner from './components/homeBanner.vue'
import homeNew from './components/homeNew.vue'
import homeHot from './components/homeHot.vue'
import homeProduct from './components/homeProduct.vue'
import homePanel from './components/homePanel.vue'
</script>
<template>
    <div class="container">
        <homeCategory></homeCategory>
        <homeBanner></homeBanner>
    </div>
    <homeNew></homeNew>
    <homeHot></homeHot>
    <homeProduct></homeProduct>
</template>

<style scoped lang="less"></style>