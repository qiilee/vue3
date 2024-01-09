//axios基础的封装
import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance=axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',  //基准地址
    timeout:5000
})


// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  console.log(config)
  //请求拦截器携带token(因为有些接口都需要携带token)
  const useStore=useUserStore()  //引入实例
  const token=useStore.userInfo.token
    if(token){
      config.headers.Authorization=`Bearer ${token}`
    }
    console.log(config)
    return config
  }, e => Promise.reject(e))

// axios响应式拦截器(这里统一做错误提示)
httpInstance.interceptors.response.use(res => res.data, e => {
  const useStore=useUserStore()  //引入实例
    ElMessage({
      type:'warning',
      message:e.response.data.message
    })

    //401token失效处理
    //1.清除 本地用户数据
    //2.跳转到登录页
      if(e.response.status===401){
        useStore.clearUserInfo()
        router.push('/login')
      }
    return Promise.reject(e)
  })

export default httpInstance