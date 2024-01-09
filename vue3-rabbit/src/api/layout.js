import httpInstance from "@/utils/http";

export function getCategoryApi(){
   return httpInstance({
        url:'/home/category/head'
   })
}