import httpInstance from "@/utils/http";

//获取订单详情接口
export const getCheckInfoApi = () => {
    return httpInstance({
        url: '/member/order/pre',
    })
}