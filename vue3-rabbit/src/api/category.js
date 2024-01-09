import httpInstance from "@/utils/http";

export function getCategoryApi(id){
    return httpInstance({
         url:'/category',
         params:{
            id
         }
    })
 }

 export const getCategoryFilterAPI = (id) => {
   return httpInstance({
     url:'/category/sub/filter',
     params:{
       id
     }
   })
 }


 /**
 * @description: 获取导航数据1
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}
 