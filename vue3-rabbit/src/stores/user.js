//管理用户数据相关
import {defineStore} from 'pinia'
import {ref} from 'vue'
import { loginApi } from '@/api/user'
import { useCartStore } from './cartStore' //引入pinia里面的函数
import { mergeCartApi } from '@/api/cart'

export const useUserStore=defineStore('user',()=>{
    const cartStore=useCartStore()  //创建实例
    //1.定义管理用户数据的state
    const userInfo=ref({})
    //2.定义获取接口数据的action函数
    const getUserInfo=async ({account,password})=>{
      const res=await  loginApi({account,password})
      userInfo.value=res.result
    
    //合并购物车的操作(map映射)
        await mergeCartApi(cartStore.cartList.map((item) => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count:item.count
            }
        }))
        //获取最新的数据列表
        cartStore.getNewCartList()  
    }

    //退出登录时清除用户信息
    const clearUserInfo=()=>{
        userInfo.value={}
        //退出登录时清除购物车信息
        cartStore.clearCart()
    }

    //3.以对象格式把state和action  return出去
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true
})