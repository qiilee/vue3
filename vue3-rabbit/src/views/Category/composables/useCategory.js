//封装分类的数据
import { ref, onMounted } from 'vue'
//引入路由
import { useRoute,onBeforeRouteUpdate } from 'vue-router'
//引入分类接口
import {getCategoryApi} from '@/api/category'

export function useCategory(){
    const cateGoryData = ref({})
    const route = useRoute()  //获取实例
    //这里的id默认要是route.params.id，传了就用最新的数据
    const getCateGoryList = async (id = route.params.id) => {
    //route.params.id-----parmas就用params,query就用query
    const res = await getCategoryApi(id)
    cateGoryData.value = res.result
    }

//目标：路由参数变化的时候， 可以把分类数据接口重新发送
//to是目标路由对象，里面有params最新的参数
  onBeforeRouteUpdate((to) => {
    //存在问题：要使用最新的路由参数请求最新的分类数据
    getCateGoryList(to.params.id)
    //把最新的路由id带过去
 })
    onMounted(()=>{
    getCateGoryList()
   })

  return{
    cateGoryData
  }
}