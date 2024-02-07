<template>
    <NuxtLayout name="custom">
        <div class="box">
            <div class="block-box">
                <div class="title">Email 帳號註冊</div>
                <div class="item-title">*帳號</div>
                <div><input v-model="email" class="input" placeholder="請輸入 Email" type="email"></div>
                <div class="item-title">*密碼</div>
                <div><input v-model="password" class="input" style="margin-bottom: 8px;" placeholder="請輸入密碼"
                        type="password"></div>
                <div class="remark">建議為 6 - 30 位英文數字組成</div>
                <div class="item-title">*確認密碼</div>
                <div><input v-model="passwordAgain" style="margin-bottom: 32px;" class="input" placeholder="請再次輸入新密碼"
                        type="password"></div>
                <div @click="register" class="btn-green">註冊</div>
                <!-- <nuxt-link to="/verificationCode">
                    <div class="btn-green">註冊</div>
                </nuxt-link> -->
            </div>
            <nuxt-link to="/login">
                <div class="btn-white">返回登入</div>
            </nuxt-link>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { signup, sendVerificationLetter } from "~/api/auth";
import { authLogin } from "~/api/index";
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/store/authStore';
import { ElLoading } from 'element-plus'

const email = ref("")
const password = ref("")
const passwordAgain = ref("")
const dayjs = useDayjs()
const router = useRouter();

const register = async () => {
    let data = {
        "birthday": dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "category": "",
        "email": email.value,
        "gender": 0,
        "grade": 0,
        "id": 0,
        "lastIp": "",
        "lastLogin": dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "name": "",
        "organization": "",
        "phone": "",
        "pwd": password.value,
        "registionTime": dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "role": "ROLE_USER",
        "status": 0,
        "verificationCode": ""
    }
    if (verify()) {
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        let response = await signup(data);
        if (response.data._value.code === 1) {

            ElMessage({
                message: '註冊成功',
                type: 'success',
            })

            handleAuthLogin()
            
            
            await sendVerificationLetter(data)
            
            loading.close()
            router.push(`/sentMail?mail=${email.value}`)

        } else {
            ElMessage({
                message: response.data._value.message,
                type: 'warning',
            })

            loading.close()

        }
        
       
    }
   
}

const handleAuthLogin = async () => {
    let data = {
        "email": email.value,
        "password": password.value,
    }
    useAuthStore().login(data)
}

const verify = () => {
    let verify = false
    if (email.value === '') {
        ElMessage({
            message: '請填寫email！',
            type: 'warning',
        })
    } else if (password.value === '') {
        ElMessage({
            message: '請填寫密碼！',
            type: 'warning',
        })
    } else if (password.value !== passwordAgain.value) {
        ElMessage({
            message: '請確認密碼！',
            type: 'warning',
        })
    } else {
        verify = true
    }

    return verify

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/form.scss';

.box {
    background: $background2;
    padding-top: 72px;
    height: 881px;

    .block-box {
        width: 456px;
        background-color: $secondary2;
        box-shadow: 0px 4px 16px rgba(21, 21, 21, 0.3);
        border-radius: 32px;
        padding: 32px;
        align-self: flex-start;
        margin: auto;
        margin-bottom: 32px;
    }

    .btn-white {
        width: 456px;
        margin: auto;
    }

    .title {
        display: flex;
        justify-content: center;
    }
}
</style>~/api/auth