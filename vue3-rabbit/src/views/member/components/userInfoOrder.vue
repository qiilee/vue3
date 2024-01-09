<script setup>
import { getUserOrder } from '@/api/member'
import { ref, onMounted } from 'vue';

// tab列表
const tabTypes = [
    { name: "all", label: "全部订单" },
    { name: "unpay", label: "待付款" },
    { name: "deliver", label: "待发货" },
    { name: "receive", label: "待收货" },
    { name: "comment", label: "待评价" },
    { name: "complete", label: "已完成" },
    { name: "cancel", label: "已取消" }
]
// 订单列表
const orderList = ref([])

//数据的总数
const total = ref(0)  

//获取所有订单的方法
const params = ref({
        orderState: 0,
        page: 1,
        pageSize: 2
})
const getAllOrder = async () => {
    const res = await getUserOrder(params.value)
    orderList.value = res.result.items
    // 存入总条数
    total.value = res.result.counts
}

//tab切换的方法，把索引值获取到
const changeTab = (type) => {
    params.value.orderState = type
      getAllOrder()
}

//切换分页的方法
const pageChange = (page) => {
    //获取到最新的page
    params.value.page = page
      getAllOrder()
}

//订单显示的适配
const fomartPayState = (payState) => {
    const setMap = {
         1: '待付款',
        2: '待发货',
        3: '待收货',
        4: '待评价',
        5: '已完成',
        6: '已取消'
    }
     return setMap[payState]
 }


//初始化调用
onMounted(() => {
    getAllOrder()
})



</script>

<template>
    <div class="order-container">
        <el-tabs @tab-change="changeTab">
            <!-- tab切换 -->
            <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />
            <div class="main-container">
                <div class="holder-container" v-if="orderList.length === 0">
                    <el-empty description="暂无订单数据" />
                </div>
                <div v-else>
                    <!-- 订单列表 -->
                    <div class="order-item" v-for="order in orderList" :key="order.id">
                        <div class="head">
                            <span>下单时间：{{ order.createTime }}</span>
                            <span>订单编号：{{ order.id }}</span>
                            <!-- 未付款，倒计时时间还有 -->
                            <span class="down-time" v-if="order.orderState === 1">
                                <i class="iconfont icon-down-time"></i>
                                <b>付款截止: {{ order.countdown }}</b>
                            </span>
                        </div>
                        <div class="body">
                            <div class="column goods">
                                <ul>
                                    <li v-for="item in order.skus" :key="item.id">
                                        <a class="image" href="javascript:;">
                                            <img :src="item.image" alt="" />
                                        </a>
                                        <div class="info">
                                            <p class="name ellipsis-2">
                                                {{ item.name }}
                                            </p>
                                            <p class="attr ellipsis">
                                                <span>{{ item.attrsText }}</span>
                                            </p>
                                        </div>
                                        <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                                        <div class="count">x{{ item.quantity }}</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="column state">
                                <p>{{ fomartPayState(order.orderState) }}</p>
                                <p v-if="order.orderState === 3">
                                    <a href="javascript:;" class="green">查看物流</a>
                                </p>
                                <p v-if="order.orderState === 4">
                                    <a href="javascript:;" class="green">评价商品</a>
                                </p>
                                <p v-if="order.orderState === 5">
                                    <a href="javascript:;" class="green">查看评价</a>
                                </p>
                            </div>
                            <div class="column amount">
                                <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                                <p>（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                                <p>在线支付</p>
                            </div>
                            <div class="column action">
                                <el-button v-if="order.orderState === 1" type="primary" size="small">
                                    立即付款
                                </el-button>
                                <el-button v-if="order.orderState === 3" type="primary" size="small">
                                    确认收货
                                </el-button>
                                <p><a href="javascript:;">查看详情</a></p>
                                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                                    <a href="javascript:;">再次购买</a>
                                </p>
                                <p v-if="[4, 5].includes(order.orderState)">
                                    <a href="javascript:;">申请售后</a>
                                </p>
                                <p v-if="order.orderState === 1"><a href="javascript:;">取消订单</a></p>
                            </div>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination-container">
                        <el-pagination
                          @current-change="pageChange" 
                          :total="total"  
                          :page-size="params.pageSize"  
                          background layout="prev, pager, next" />
                    </div>
                </div>
            </div>

        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
.order-container {
    padding: 10px 20px;

    .pagination-container {
        display: flex;
        justify-content: center;
    }

    .main-container {
        min-height: 500px;

        .holder-container {
            min-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;

    .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
            margin-right: 20px;

            &.down-time {
                margin-right: 0;
                float: right;

                i {
                    vertical-align: middle;
                    margin-right: 3px;
                }

                b {
                    vertical-align: middle;
                    font-weight: normal;
                }
            }
        }

        .del {
            margin-right: 0;
            float: right;
            color: #999;
        }
    }

    .body {
        display: flex;
        align-items: stretch;

        .column {
            border-left: 1px solid #f5f5f5;
            text-align: center;
            padding: 20px;

            >p {
                padding-top: 10px;
            }

            &:first-child {
                border-left: none;
            }

            &.goods {
                flex: 1;
                padding: 0;
                align-self: center;

                ul {
                    li {
                        border-bottom: 1px solid #f5f5f5;
                        padding: 10px;
                        display: flex;

                        &:last-child {
                            border-bottom: none;
                        }

                        .image {
                            width: 70px;
                            height: 70px;
                            border: 1px solid #f5f5f5;
                        }

                        .info {
                            width: 220px;
                            text-align: left;
                            padding: 0 10px;

                            p {
                                margin-bottom: 5px;

                                &.name {
                                    height: 38px;
                                }

                                &.attr {
                                    color: #999;
                                    font-size: 12px;

                                    span {
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }

                        .price {
                            width: 100px;
                        }

                        .count {
                            width: 80px;
                        }
                    }
                }
            }

            &.state {
                width: 120px;

                .green {
                    color: $xtxColor;
                }
            }

            &.amount {
                width: 200px;

                .red {
                    color: $priceColor;
                }
            }

            &.action {
                width: 140px;

                a {
                    display: block;

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }
}
</style>