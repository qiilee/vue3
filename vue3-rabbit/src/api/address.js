import httpInstance from "@/utils/http";

//添加收货地址的接口,data是个对象
export const addAddressApi = (data) => {
    return httpInstance({
        url: '/member/address',
        method: 'POST',
        data
    })
}