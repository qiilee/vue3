<script setup>
//引入获取订单详情的接口
import { getCheckInfoApi } from '@/api/checkout'
import { addAddressApi } from '@/api/address'
import { sumbitOrderApi } from '@/api/order'
import {ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
const cartStore= useCartStore() //常见pinia实例，引入方法和参数
const router= useRouter() //路由创建实例---跳转使用
const checkInfoData = ref({}) //订单对象
const defaultAddress=ref({}) //默认地址

//初始化订单信息
const getCheckInfo =async  () => {
    const res = await getCheckInfoApi()
    console.log(res)
    checkInfoData.value = res.result
    //适配默认地址
    //从地址列表中筛选出默认地址isDefault==0的地址
    defaultAddress.value=checkInfoData.value.userAddresses.find(item=>item.isDefault==0)

}

//切换地址的回调
const acticeAddress=ref({}) //保存点击的地址记录
const clickAddressCard = (item) => {
    acticeAddress.value=item
}

//确认地址的回调
const confirmAddress = () => {
    //把选中的地址赋值给默认的地址
    defaultAddress.value = acticeAddress.value
    //选中地址后关闭弹窗
    showAddresSwitch.value = false
  
}


//提交订单
const sumbitOrder = async () => {
    const res = await sumbitOrderApi({
        deliveryTimeType: 1,  //配送时间默认为1
        payType: 1,  //支付方式 1为默认为在线支付
        payChannel:1,//支付渠道 1为支付宝,仅支持支付宝
        buyerMessage: '',//买家留言
        addressId: defaultAddress.value.id,   //当前地址id
        goods: checkInfoData.value.goods.map((item) => {
            return {
                skuId: item.skuId,
                count:item.count
            }
            //这里返回依然是一个数组[{},{}]
        }),
       
    })
    const orderId = res.result.id
    router.push({
        path: '/pay',
        query: {
            id: orderId
        }
        //这边是query传参，那边就是query接参
    })
    //更新购物车(清空)
    cartStore.getNewCartList()
}

onMounted(() => {
    getCheckInfo()
})

//切换地址的弹框
const showAddresSwitch = ref(false)
//添加地址的弹窗
const showAddAddress = ref(false)
const addressForm = ref({
    receiver: '',
    contact: '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    address: '',
    isDefault:0,  //0是默认地址，1不是默认地址
    postalCode: '',
    addressTags: '',
    fullLocation:'',
})

const formRef = ref(null)
//地址保存-------这个后面待优化
const saveAddress = () => {
    formRef.value.validate(async (valid) => { 
        if (valid) {
            const params = {
                ...addressForm.value
             }
            const res = await addAddressApi(params)
            showAddAddress.value = false
            getCheckInfo()
          }
    })
}

//表单的规则校验
const rules = ref({
    receiver: [{ required: true, message: '收货名字不能为空', trigger: 'blur' }],
    contact: [{ required: true, message: '收货号码不能为空', trigger: 'blur' }],
    provinceCode: [{ required: true, message: '省份编码不能为空', trigger: 'blur' }],
    countyCode: [{ required: true, message: '城市编码不能为空', trigger: 'blur' }],
    address: [{ required: true, message: '详细地址不能为空', trigger: 'blur' }],
    postalCode: [{ required: true, message: '邮政编码不能为空', trigger: 'blur' }],
    addressTags: [{ required: true, message: '地址标签不能为空', trigger: 'blur' }],
    fullLocation: [{ required: true, message: '完整地址不能为空', trigger: 'blur' }],

})

const checkInfo = {}  // 订单对象


</script>

<template>
    <div class="xtx-pay-checkout-page">
        <div class="container">
            <div class="wrapper">
                <!-- 收货地址 -->
                <h3 class="box-title">收货地址</h3>
                <div class="box-body">
                    <div class="address">
                        <div class="text">
                            <div class="none" v-if="!defaultAddress">您需要先添加收货地址才可提交订单。</div>
                            <ul v-else>
                                <li><span>收<i />货<i />人：</span>{{ defaultAddress.receiver }}</li>
                                <li><span>联系方式：</span>{{ defaultAddress.contact }}</li>
                                <li><span>收货地址：</span>{{ defaultAddress.fullLocation }} {{ defaultAddress.address }}</li>
                            </ul>
                        </div>
                        <div class="action">
                            <el-button size="large" @click="showAddresSwitch = true">切换地址</el-button>
                            <el-button size="large" @click="showAddAddress = true">添加地址</el-button>
                        </div>
                    </div>
                </div>
                <!-- 商品信息 -->
                <h3 class="box-title">商品信息</h3>
                <div class="box-body">
                    <table class="goods">
                        <thead>
                            <tr>
                                <th width="520">商品信息</th>
                                <th width="170">单价</th>
                                <th width="170">数量</th>
                                <th width="170">小计</th>
                                <th width="170">实付</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in checkInfoData.goods" :key="i.id">
                                <td>
                                    <a href="javascript:;" class="info">
                                        <img :src="i.picture" alt="">
                                        <div class="right">
                                            <p>{{ i.name }}</p>
                                            <p>{{ i.attrsText }}</p>
                                        </div>
                                    </a>
                                </td>
                                <td>&yen;{{ i.price }}</td>
                                <td>{{ i.price }}</td>
                                <td>&yen;{{ i.totalPrice }}</td>
                                <td>&yen;{{ i.totalPayPrice }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 配送时间 -->
                <h3 class="box-title">配送时间</h3>
                <div class="box-body">
                    <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
                    <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
                    <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
                </div>
                <!-- 支付方式 -->
                <h3 class="box-title">支付方式</h3>
                <div class="box-body">
                    <a class="my-btn active" href="javascript:;">在线支付</a>
                    <a class="my-btn" href="javascript:;">货到付款</a>
                    <span style="color:#999">货到付款需付5元手续费</span>
                </div>
                <!-- 金额明细 -->
                <h3 class="box-title">金额明细</h3>
                <div class="box-body">
                    <div class="total">
                        <dl>
                            <dt>商品件数：</dt>
                            <dd>{{ checkInfoData.summary?.goodsCount }}件</dd>
                        </dl>
                        <dl>
                            <dt>商品总价：</dt>
                            <dd>¥{{ checkInfoData.summary?.totalPrice.toFixed(2) }}</dd>
                        </dl>
                        <dl>
                            <dt>运<i></i>费：</dt>
                            <dd>¥{{ checkInfoData.summary?.postFee.toFixed(2) }}</dd>
                        </dl>
                        <dl>
                            <dt>应付总额：</dt>
                            <dd class="price">{{ checkInfoData.summary?.totalPayPrice.toFixed(2) }}</dd>
                        </dl>
                    </div>
                </div>
                <!-- 提交订单 -->
                <div class="submit">
                    <el-button type="primary" size="large" @click="sumbitOrder">提交订单</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 切换地址 -->
    <el-dialog v-model="showAddresSwitch" title="切换收货地址" width="30%" center>
      <div class="addressWrapper">
        <!-- active接激活样式,我们是要点击那个切换那个用动态样式。
         写法1：:class="item.id== acticeAddress.id ?'active':''"
         写法2：:class="{ acitve:item.id=== acticeAddress.id }"
        -->
        <div class="text item" :class="{ 'active' :item.id == acticeAddress.id }" @click="clickAddressCard(item)" v-for="item in checkInfoData.userAddresses"  :key="item.id">
          <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
          </ul>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddresSwitch = false">取消</el-button>
          <el-button type="primary" @click="confirmAddress">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加地址 -->
        <el-dialog  v-model="showAddAddress" title="添加地址" width="30%" center>
          <div class="addressWrapper">

        <el-form ref="formRef" :rules="rules" :model="addressForm" label-width="120px">
          <el-form-item label="姓名" prop="receiver">
            <el-input v-model="addressForm.receiver" />
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="addressForm.contact" />
          </el-form-item>
          <el-form-item label="省份编码" prop="provinceCode">
             <el-input v-model="addressForm.provinceCode" />
          </el-form-item>
         <el-form-item label="城市编码" prop="cityCode">
         <el-input v-model="addressForm.cityCode" />
         </el-form-item>
         <el-form-item label="地区编码" prop="countyCode">
           <el-input v-model="addressForm.countyCode" />
         </el-form-item>
        <el-form-item label="详细地址" prop="address">
            <el-input v-model="addressForm.address" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalCode">
             <el-input v-model="addressForm.postalCode" />
        </el-form-item>
        <el-form-item label="地址标签" prop="addressTags">  
        <el-input v-model="addressForm.addressTags" />
        </el-form-item>
           <el-form-item label="完整地址" prop="fullLocation">  
            <el-input v-model="addressForm.fullLocation" />
            </el-form-item>
        </el-form>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="showAddAddress=false">取消</el-button>
              <el-button type="primary" @click="saveAddress">保存</el-button>
            </span>
          </template>
        </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
    margin-top: 20px;

    .wrapper {
        background: #fff;
        padding: 0 20px;

        .box-title {
            font-size: 16px;
            font-weight: normal;
            padding-left: 10px;
            line-height: 70px;
            border-bottom: 1px solid #f5f5f5;
        }

        .box-body {
            padding: 20px 0;
        }
    }
}

.address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }

        >ul {
            flex: 1;
            padding: 20px;

            li {
                line-height: 30px;

                span {
                    color: #999;
                    margin-right: 5px;

                    >i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }

        >a {
            color: $xtxColor;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }

    .action {
        width: 420px;
        text-align: center;

        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}

.goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    .info {
        display: flex;
        text-align: left;

        img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
        }

        .right {
            line-height: 24px;

            p {
                &:last-child {
                    color: #999;
                }
            }
        }
    }

    tr {
        th {
            background: #f5f5f5;
            font-weight: normal;
        }

        td,
        th {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
                border-left: 1px solid #f5f5f5;
            }

            &:last-child {
                border-right: 1px solid #f5f5f5;
            }
        }
    }
}

.my-btn {
    width: 228px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-right: 25px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
        border-color: $xtxColor;
    }
}

.total {
    dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
            i {
                display: inline-block;
                width: 2em;
            }
        }

        dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;

            &.price {
                font-size: 20px;
                color: $priceColor;
            }
        }
    }
}

.submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
}

.addressWrapper {
    max-height: 500px;
    overflow-y: auto;
}

.text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;

        &.active,
        &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
        }

        >ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
        }
    }
}
</style>