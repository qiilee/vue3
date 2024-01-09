<script setup>
import { ref, onMounted } from 'vue'
import goodsItem from '../Home/components/goodsItem.vue';

//引入调取二级分类面包屑的数据接口
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category'

//引入路由useRoute(注意不要带r)
import { useRoute } from 'vue-router';
const route = useRoute()  //获取路由实例

const categoryData = ref({})

const getCategoryList = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    console.log(res)
    categoryData.value = res.result
}
//获取基础列表的渲染
const goodsList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'


})
const getGoodsList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    goodsList.value = res.result.items
}

//tab切换回调
const tabChange = () => {
    reqData.value.page = 1
    getGoodsList()
}

//加载更多
const disabled = ref(false) //默认是不禁用的，只有当数据加载完毕才停止禁用调用接口
const load = async () => {
    console.log('2222')
    //获取下一页数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    //新老数据进进行拼接
    goodsList.value = [...goodsList.value, ...res.result.items]
    //加载完毕，停止监听
    if (res.result.items.legnth == 0) {
        disabled.value = true
    }

}


onMounted(() => {
    getCategoryList()
    getGoodsList()
})

</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- 面包屑跳转到上一层级的parentId -->
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <!-- v-model绑定的值就是name的值就是你选中点击的值 -->
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <goodsItem v-for="goods in goodsList " :goods="goods" :key="goods.id"></goodsItem>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>