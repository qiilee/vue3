<script setup>
import { ref } from 'vue'
// import { ElMessage } from 'element-plus';
// import 'element-plus/theme-chalk/el-message.css'

//引入api----已被pinia管理
import { loginApi } from '@/api/user'

//引入路由
import { useRouter } from 'vue-router';

//调入pinia里面的方法和数据
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()  //获取实例，直接可以调取pinia里面的方法和参数



const router = useRouter()  //获取路由的实例方法

//表单校验(账户名和密码)
const form = ref({
    account: '',
    passsword: '',
    agree: true
})
//准备规则对象,这里的ref可写可不写---这里写法和vue不同
const rules = ref({
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码超过6个字符不得超过14个字符', trigger: 'blur' }
    ],
    agree: [
        {
            validator: (rules, value, callback) => {
                //自定义校验逻辑
                //勾选--通过  不勾选---不通过
                if (value) {
                    callback()
                } else {
                    callback(new Error('请勾选协议'))
                }
            }
        }
    ]
})

//获取form实例做统一校验(这是vue3获取实例的方法，直接获取即可)
//vue2写法是this.$refs.formRef
const formRef = ref(null)

const login = () => {
    const { account, password } = form.value
    formRef.value.validate(async (valid) => {
        //valid：true通过校验  false就是不通过校验
        if (valid) {
            await userStore.getUserInfo({ account, password })
            //1提示登录成功
            ElMessage({
                type: 'success',
                message: '登录成功'
            })
            //跳转到首页replace和push的区别
            //repalce跳转下次后退是直接跳过当前的路径
            //例如从A——>B 在从B——>C    如果A到B使用push  B到C使用replace
            //在C这个页面点击浏览器返回时是直接跳过B的直接到A,而不会经过B的。
            //但是push不一样,会每一步都会经过。
            router.replace({ path: '/' })

        } else {
            ElMessage({
                type: 'success',
                message: '登录成功'
            })
        }
    })
}



</script>


<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">小兔鲜</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
                            status-icon>
                            <el-form-item prop="account" label="账户">
                                <el-input v-model="form.account" />
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox v-model="form.agree" size="large">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="login">点击登录</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy; 小兔鲜儿</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: $xtxColor;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background: url('@/assets/images/login-bg.png') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: $xtxColor;
    width: 100%;
    color: #fff;
}
</style>