//封装购物车模块
import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { useUserStore } from './user'  //导入useStroe取出token
import {insertCart,getCartList,deleteCartData} from '@/api/cart'  //引入购物车接口

export const useCartStore = defineStore('cart', () => {
    const userSore =useUserStore()
    const isLogin=computed(()=>userSore.userInfo.token) //看能否取出token
        //1.定义state---cartList
    const cartList = ref([])
       //定义action----addCart

     //1.获取最新列表的action
    const getNewCartList=async ()=>{
      //2.获取购物车最新列表--覆盖本地的cartlist列表
      const res=await getCartList()
     //3.覆盖本地购物车列表
      cartList.value=res.result
    }


    const addCart = async (goods) => {
        const {skuId,count}=goods
          if(isLogin.value){
        //登录之后加入购物车的逻辑操作
        //1.加入购物车
       await  insertCart({skuId,count})
         //获取最新列表已单独封装
         getNewCartList()

        }else{
         //添加购物车操作-------本地操作
        //已添加过count+1
        //没有添加过直接push
        //通过匹配传递过来的商品对象中skuId能不能在cartList中找到，找到就表示添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        //如果item存在表示已经找到
        if (item) {
            console.log(item)
           //疑问：这里count++为什么会影响cartList里面的?????????????????????????????????????????????????????
            item.count++
            console.log(cartList.value.count)
        } else {
            cartList.value.push(goods)
        }
        }   
    }
   
     //删除购物车,这个函数名不能和引来的接口同名
    const deleteCart = async(skuId) => {
        //登录之后加入购物车的逻辑操作
        //1.删除购物车
        if(isLogin.value){
            //接受的是一个数组Skuid
           await deleteCartData([skuId]) 
           //获取最新列表已单独封装
           getNewCartList()

        }else{
        //思路：1.找到要删除的下标值--splice
        //思路2：使用数组的过滤方法--filter
        //findIndex是找出数组中的元素的下标
        //splice(要删除的下标值,删除元素的个数)
        //1.利用splice方法删除元素
        // const index = cartList.value.findIndex((item) => skuId === item.skuId)
        // cartList.value(index, 1)
        
        //2.利用filter删除元素(把符条件的筛选出来)
        cartList.value = cartList.value.filter((item) => skuId !== item.skuId)
        }
    }

    //清除购物车(退出登录时)
      const clearCart=()=>{
        cartList.value=[]
      }


    //单选功能
     const singCheck=(skuId,selected)=>{
        //通过skuId找到需要修改的哪一项，然后把selected的值改为那边传过来的值
      //疑问：这里item.selected为什么会影响cartList里面的?????????????????????????????????????????????????????
        const item= cartList.value.find((item)=>{
             return item.skuId==skuId
         })
         item.selected=selected

     }


     //全选功能
     const allCheck=(selected)=>{
        cartList.value.forEach((item)=>item.selected=selected)
     }


    //计算属性
    //1.总的商品数量，是所有项的count之和
   const allCount= computed(() => {
        return cartList.value.reduce((pre,item) => {
             return pre+item.count
        },0)
    })
    //2.总的价格(所有项的count乘price之和)
   const allPrice= computed(() => {
        return cartList.value.reduce((pre,item) => {
             return pre+item.count*item.price
        },0)
    })

    //3.是否全选   数组方法every:用于查询数组中是否每一个元素都符合条件，如果复合则返回true,否则返回false,不满足条件会立马返回
    const isAll=computed(()=>{
          return cartList.value.every((item)=>{
              return item.selected
          })
    })

    //4.购物车列表已选择数量
    // const selectedCount=computed(()=>{
    //      return  cartList.value.filter(item=>item.selected).reduce((pre,item)=>{
    //         return pre+item.count
    //      },0)
    // })

    //上面简写形式
    const selectedCount=computed(()=>cartList.value.filter((item)=>item.selected).reduce((pre,item)=>pre+item.count,0))

   //     const selectprice=computed(()=>{
  //         return  cartList.value.filter(item=>item.selected).reduce((pre,item)=>pre+item.count*item.price,0)
  //    })
   //上面的简写形式
   //5.购物车列表总价格
  const selectPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((pre,item)=>pre+item.count*item.price,0))


    return {
        cartList,
        addCart,
        deleteCart,
        allCount,
        allPrice,
        singCheck,
        isAll,
        allCheck,
        selectedCount,
        selectPrice,
        clearCart,
        getNewCartList
    }
}, {
    persist: true
 })
