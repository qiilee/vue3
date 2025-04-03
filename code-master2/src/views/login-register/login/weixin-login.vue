<template>
  <div @click="onWeiXinLogin">
    <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
    <div id="login_container"></div>
  </div>
</template>

<script setup>
import { getWXLoginData, getWXLoginToken, getWXLoginUserInfo } from '@/api/sys'
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
import { LOGIN_TYPE_WX } from '@/constants'

/**
 * 微信登录成功之后的窗口数据解析
 */
if (window.location.search) {
  const code = /code=((.*))&state/.exec(window.location.search)[1]
  if (code) {
    brodacast.send({
      code
    })
    // 关闭回调网页
    window.close()
  }
}

/**
 * 触发微信登录
 */
const onWeiXinLogin = async () => {
  // 1. 通过微信登录前置数据获取接口，获取登录数据
  const { appId, appSecret, redirectUri, scope, state } = await getWXLoginData()
  // 2. 根据获取到的数据，拼接得到 `open url` 地址
  window.open(
    `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`,
    '',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )
  // 等待扫码登录成功通知
  brodacast.wait().then(async ({ code }) => {
    console.log('微信扫码登录成功')
    console.log(code)
    // 微信登录成功,关闭通知
    brodacast.clear()
    // 获取 AccessToken 和 openid
    const { access_token, openid } = await getWXLoginToken(
      appId,
      appSecret,
      code
    )
    console.log('access_token, openid')
    console.log(access_token, openid)
    // 获取登录用户信息
    const { nickname, headimgurl } = await getWXLoginUserInfo(
      access_token,
      openid
    )
    console.log(nickname, headimgurl)
    // 执行登录操作
    oauthLogin(LOGIN_TYPE_WX, {
      openid,
      nickname,
      headimgurl
    })
  })
}
</script>

<style lang="scss" scoped></style>
