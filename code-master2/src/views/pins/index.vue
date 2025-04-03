<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <pins-vue :id="$route.params.id" />
  </div>
</template>

<script setup>
import pinsVue from './components/pins.vue'
</script>
