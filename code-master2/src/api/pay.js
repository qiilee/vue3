import request from '@/utils/request'

/**
 * 获取 VIP 支付数据
 */
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}

/**
 * 支付宝下单
 */
export const getAliPay = (subject, totalAmount, body, isMobile) => {
  return request({
    url: '/user/alipay',
    params: {
      subject,
      totalAmount,
      body,
      isMobile
    }
  })
}

/**
 * 获取 VIP 支付数据
 */
export const getPayResult = (out_trade_no) => {
  return request({
    url: '/sys/pay/result',
    params: {
      out_trade_no
    }
  })
}
