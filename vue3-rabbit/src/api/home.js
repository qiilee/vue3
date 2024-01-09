import httpInstance from "@/utils/http";

//获取轮播图数据
export function getBannerApi(parmas={}){
    //默认为1，商品为2,如果不传默认就是1，传了就是2
    const {distributionSite='1'}=parmas
   return httpInstance({
        url:'/home/banner',
        parmas:{
            distributionSite
        }
   })
}

//获取新鲜好物
export function getNewData(){
    return httpInstance({
        url:'/home/new'
    })
}

//获得人气推荐的
export function getHotRecommend(){
    return httpInstance({
        url:'/home/hot'
    })
}

//产品列表
export function getProductList(){
    return httpInstance({
        url:'/home/goods'
    })
}