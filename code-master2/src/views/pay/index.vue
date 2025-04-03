<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="mx-auto h-full pt-[50%] px-1 bg-white dark:bg-zinc-900 duration-400 xl:h-[360px] xl:rounded-sm xl:py-10 xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:max-w-screen-lg"
    >
      <div
        v-if="JSON.stringify(isSuccess) !== 'null'"
        class="flex justify-center items-center"
      >
        <m-svg-icon
          v-if="isSuccess"
          name="pay-success"
          class="w-8 h-8 mr-4"
        ></m-svg-icon>
        <m-svg-icon
          v-if="!isSuccess"
          name="pay-fail"
          class="w-8 h-8 mr-4"
        ></m-svg-icon>
        <p class="text-ml text-zinc-900 dark:text-zinc-200">
          {{ isSuccess ? '支付成功' : '支付失败' }}
        </p>
      </div>

      <m-button
        class="w-full mt-8 mx-auto dark:bg-zinc-800 xl:w-[120px]"
        @click="onConfirm"
        >确定</m-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPayResult } from '@/api/pay'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()
const isSuccess = ref(null)

const getResultData = async () => {
  const res = await getPayResult(route.query.out_trade_no)
  isSuccess.value = res
}
getResultData()

const onConfirm = () => {
  store.dispatch('user/profile')
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
