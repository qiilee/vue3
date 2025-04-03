<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue
      v-if="!isMobileTerminal"
      :payData="payData"
    ></pc-payment-vue>
    <!-- 移动端支付 -->
    <mobile-payment-vue v-else :payData="payData"></mobile-payment-vue>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import pcPaymentVue from './pc-payment/index.vue'
import mobilePaymentVue from './mobile-payment/index.vue'

defineProps({
  payData: {
    required: true,
    type: Object
  }
})
</script>
