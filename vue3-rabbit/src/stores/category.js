import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryApi } from '@/api/layout';

export const useCategoryStore = defineStore('category', () => {
     //导航列表的数据
     const categoryList = ref([])
     //获取导航泪列表数据的方法
    const getCategory = async () => {
     const res = await getCategoryApi()
    categoryList.value = res.result
    }
return {
    categoryList,
    getCategory
   }
})




