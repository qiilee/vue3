//封装所有用户相关的接口函数
import httpInstance from "@/utils/http";

export const loginApi=({account,password})=>{
     return  httpInstance({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
     })
}