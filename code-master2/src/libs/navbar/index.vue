<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        />
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      class="h-full w-5 absolute right-0 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  clickLeft: {
    type: Function
  },
  clickRight: {
    type: Function
  },
  sticky: {
    type: Boolean
  }
})
const router = useRouter()
/**
 * 左侧按钮点击事件
 */
const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  router.back()
}

/**
 * 右侧按钮点击事件
 */
const onClickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>

<style lang="scss" scoped></style>
