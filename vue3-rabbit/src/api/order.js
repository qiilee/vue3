import httpInstance from "@/utils/http";

//提交订单的接口
export const sumbitOrderApi = (data) => {
    return httpInstance({
        url: '/member/order',
        method: 'POST',
        data
    })
}



//获取订单详情的接口
export const getOrderDetailApi = (id) => {
    return httpInstance({
        url: `/member/order/${id}`,  //拼接字符串
        
    })
}