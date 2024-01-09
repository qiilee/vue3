<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';

//以24小时请求接口
//引入接口
import { fetchHotGoodsAPI } from '@/api/detail'

//设计props参数，适配不用的titile和数据 写法：definProps:({})
//想要使用外面传递过过来的数据就用一个变量接受，然后用对象方式的.即可
const props = defineProps({
    hotType: {
        type: Number
    }
})

//设计对应关系
const TypeMap = {
    1: '24小时热榜',
    2: '周热榜'
}
const title = computed(() => TypeMap[props.hotType])   //等价于TypeMap.hotType

//调用接口
const hotList = ref([])
const route = useRoute()
const getHotList = async () => {
    const res = await fetchHotGoodsAPI({
        id: route.params.id,
        type: props.hotType  //以24小时为例
    })
    hotList.value = res.result
}





onMounted(() => {
    getHotList()
})

</script>


<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

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
}
</style>