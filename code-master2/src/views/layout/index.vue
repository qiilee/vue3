<template>
  <div class="h-screen">
    <!-- 需要在 tailwind 中定义 h-header、h-main 高度 -->
    <header-vue class="h-header"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue'
import floatingVue from './components/floating/index.vue'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
