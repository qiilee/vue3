<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core';
// 图片列表

//props适配列表
defineProps({
    imageList: {
        type: Array,
        default: () => []
    }
})


// const imageList = [
//     "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//     "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//     "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//     "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//     "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]


//小图切换大图
const activeIndex = ref(0)

//鼠标移入事件回调
const enterhandler = (i) => {
    activeIndex.value = i
}
//获取鼠标相对位置
const target = ref(null)
//这个target就是dom元素ref里面的
const { elementX, elementY, isOutside } = useMouseInElement(target)

const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)
//监听鼠标滑块的移动位置(监听elementX/Y夫人变化。一旦变化重新设置left和top)
watch([elementX, elementY, isOutside], () => {
    //有效范围内控制滑块距离
    //鼠标的有效x横向距离

    //鼠标不在盒子里面不需要执行后面逻辑
    //isOutside在盒子里面是false，在盒子外部就是true
    if (isOutside.value) return
    console.log('222')

    if (elementX.value > 100 && elementX.value < 300) {
        left.value = elementX.value - 100 //这里计算的就是滑块里离左边的位置
    }
    //纵向y轴的距离
    if (elementY.value > 100 && elementY.value < 300) {
        top.value = elementY.value - 100
    }

    //超出边界值把滑块离左边的值进行复赋值(不给他变了)
    if (elementX.value > 300) { left.value = 200 }
    if (elementX.value < 100) { left.value = 0 }

    //边界y
    if (elementY.value > 300) { top.value = 200 }
    if (elementY.value < 100) { top.value = 0 }


    //控制大图的显示
    positionX.value = -(left.value * 2)
    positionY.value = -(top.value * 2)
})


</script>


<template>
    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target">
            <img :src="imageList[activeIndex]" alt="" />
            <!-- 蒙层小滑块 -->
            <div v-show="!isOutside" class="layer" :style="{ left: `${left}px`, top: `${top}px` }"></div>
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <!-- mouseenter鼠标移入事件   :class="{ active: i === activeIndex }"  谁的下标值与当前的激活值相同就激活类名状态-->
            <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandler(i)" :class="{ active: i === activeIndex }">
                <img :src="img" alt="" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div v-show="!isOutside" class="large" :style="[
            {
                backgroundImage: `url(${imageList[0]})`,
                backgroundPositionX: `${positionX}px`,
                backgroundPositionY: `${positionY}px`,
            },
        ]"></div>
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>