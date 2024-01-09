import httpInstance from "@/utils/http";

//个人中心中的猜你喜欢模块
export const getLikeListAPI = ({ limit = 4 }) => {
    return httpInstance({
        url: '/goods/relevant',
        params: {
            limit
        }
    })
}

//订单列表
/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrder = (params) => {
    return httpInstance({
        url: '/member/order',
        method: 'GET',
        params
    })
}