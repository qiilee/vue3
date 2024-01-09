//封装轮播图相关的代码
import {ref,onMounted} from 'vue'
import { getBannerApi } from '@/api/home'
//这个一定要导出出去
export function useBannner(){
    const bannerList = ref([])
//获取轮播图接口数据
const getBanner = async () => {
    const res = await getBannerApi(
        {
            distributionSite: '2'
        }
    )
    bannerList.value = res.result
}

onMounted(() => {
    getBanner() //获取轮播图
})

 return{
    bannerList
  }
}