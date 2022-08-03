<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    // 链接为：https://www.npmjs.com/package/sm-crypto

    // 一、sm2

    // 1、获取密钥对
    // const sm2 = require('sm-crypto').sm2

    // let keypair = sm2.generateKeyPairHex()

    // let publicKey = keypair.publicKey // 公钥
    // // let privateKey = keypair.privateKey // 私钥

    // // 自定义随机数，参数会直接透传给 jsbn 库的 BigInteger 构造器
    // // 注意：开发者使用自定义随机数，需要自行确保传入的随机数符合密码学安全
    // // let keypair2 = sm2.generateKeyPairHex('123123123123123')
    // // let keypair3 = sm2.generateKeyPairHex(256, SecureRandom)
    // // console.log("keypair2", keypair2)
    // // console.log("keypair3", keypair3)
    // let verifyResult = sm2.verifyPublicKey(publicKey) // 验证公钥
    // console.log("verifyResult", verifyResult)



    // 2、加密解密
    // const sm2 = require('sm-crypto').sm2
    // const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
    // let keypair = sm2.generateKeyPairHex()
    // let publicKey = keypair.publicKey // 公钥
    // let privateKey = keypair.privateKey
    // let msgString = "123456"
    // let msgArray = [1,2,3,4,5,6]

    // let encryptData = sm2.doEncrypt(msgString, publicKey, cipherMode) // 加密结果
    // let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode) // 解密结果

    // encryptData = sm2.doEncrypt(msgArray, publicKey, cipherMode) // 加密结果，输入数组
    // decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode, {output: 'array'}) // 解密结果，输出数组
    // console.log("encryptData", encryptData)
    // console.log("decryptData", decryptData)


    // 3、签名验签
    // const sm2 = require('sm-crypto').sm2
    // let keypair = sm2.generateKeyPairHex()
    // let publicKey = keypair.publicKey // 公钥
    // let privateKey = keypair.privateKey
    // let msg = "123456"
    // 纯签名 + 生成椭圆曲线点
    // let sigValueHex = sm2.doSignature(msg, privateKey) // 签名
    // let verifyResult = sm2.doVerifySignature(msg, sigValueHex, publicKey) // 验签结果
    // console.log("sigValueHex", sigValueHex)
    // console.log("verifyResult", verifyResult)

    // // 纯签名
    // let sigValueHex2 = sm2.doSignature(msg, privateKey, {
    //     pointPool: [sm2.getPoint(), sm2.getPoint(), sm2.getPoint(), sm2.getPoint()], // 传入事先已生成好的椭圆曲线点，可加快签名速度
    // }) // 签名
    // let verifyResult2 = sm2.doVerifySignature(msg, sigValueHex2, publicKey) // 验签结果
    // console.log("sigValueHex2", sigValueHex2)
    // console.log("verifyResult2", verifyResult2)

    // // 纯签名 + 生成椭圆曲线点 + der编解码
    // let sigValueHex3 = sm2.doSignature(msg, privateKey, {
    //     der: true,
    // }) // 签名
    // let verifyResult3 = sm2.doVerifySignature(msg, sigValueHex3, publicKey, {
    //     der: true,
    // }) // 验签结果
    // console.log("sigValueHex3", sigValueHex3)
    // console.log("verifyResult3", verifyResult3)

    // 纯签名 + 生成椭圆曲线点 + sm3杂凑
    // let sigValueHex4 = sm2.doSignature(msg, privateKey, {
    //     hash: true,
    // }) // 签名
    // let verifyResult4 = sm2.doVerifySignature(msg, sigValueHex4, publicKey, {
    //     hash: true,
    // }) // 验签结果
    // console.log("sigValueHex4", sigValueHex4)
    // console.log("verifyResult4", verifyResult4)

    // // 纯签名 + 生成椭圆曲线点 + sm3杂凑（不做公钥推导）
    // let sigValueHex5 = sm2.doSignature(msg, privateKey, {
    //     hash: true,
    //     publicKey, // 传入公钥的话，可以去掉sm3杂凑中推导公钥的过程，速度会比纯签名 + 生成椭圆曲线点 + sm3杂凑快
    // })
    // let verifyResult5 = sm2.doVerifySignature(msg, sigValueHex5, publicKey, {
    //     hash: true,
    //     publicKey,
    // })

    // // 纯签名 + 生成椭圆曲线点 + sm3杂凑 + 不做公钥推 + 添加 userId（长度小于 8192）
    // // 默认 userId 值为 1234567812345678
    // let sigValueHex6 = sm2.doSignature(msgString, privateKey, {
    //     hash: true,
    //     publicKey,
    //     userId: 'testUserId',
    // })
    // let verifyResult6 = sm2.doVerifySignature(msgString, sigValueHex6, publicKey, {
    //     hash: true,
    //     userId: 'testUserId',
    // })



    // 4、获取椭圆曲线点
    // const sm2 = require('sm-crypto').sm2

    // let point = sm2.getPoint() // 获取一个椭圆曲线点，可在sm2签名时传入
    // console.log("point", point)


    // // 二、sm3
    // const sm3 = require('sm-crypto').sm3
    // let hashData = sm3('abc') // 杂凑

    // // hmac
    // hashData = sm3('abc', {
    //     key: 'daac25c1512fe50f79b0e4526b93f5c0e1460cef40b6dd44af13caec62e8c60e0d885f3c6d6fb51e530889e6fd4ac743a6d332e68a0f2a3923f42585dceb93e9', // 要求为 16 进制串或字节数组
    // })
    // console.log("hashData", hashData)

    // 三、sm4
    const sm4 = require('sm-crypto').sm4
    const msg = 'hello world! 我是 juneandgreen.' // 可以为 utf8 串或字节数组
    const key = '0123456789abcdeffedcba9876543210' // 可以为 16 进制串或字节数组，要求为 128 比特

    let encryptData1 = sm4.encrypt(msg, key) // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
    let encryptData2 = sm4.encrypt(msg, key, {padding: 'none'}) // 加密，不使用 padding
    let encryptData3 = sm4.encrypt(msg, key, {padding: 'none', output: 'array'}) // 加密，不使用 padding，输出为字节数组
    let encryptData4 = sm4.encrypt(msg, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 加密，cbc 模式
    console.log("encryptData1", encryptData1)
    console.log("encryptData2", encryptData2)
    console.log("encryptData3", encryptData3)
    console.log("encryptData4", encryptData4)
    let decryptData1 = sm4.decrypt(encryptData1, key) // 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
    let decryptData2 = sm4.decrypt(encryptData2, key, {padding: 'none'}) // 解密，不使用 padding
    let decryptData3 = sm4.decrypt(encryptData3, key, {padding: 'none', output: 'array'}) // 解密，不使用 padding，输出为字节数组
    let decryptData4 = sm4.decrypt(encryptData4, key, {mode: 'cbc', iv: 'fedcba98765432100123456789abcdef'}) // 解密，cbc 模式
    console.log("decryptData1", decryptData1)
    console.log("decryptData2", decryptData2)
    console.log("decryptData3", decryptData3)
    console.log("decryptData4", decryptData4)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
