<template>
    <NuxtLayout name="custom">
        <div class="box">
            <div class="block-box">
                <div class="title">個人資料編輯</div>
                <div class="item-title">*姓名</div>
                <div><input v-model="memberInfo.name" class="input" placeholder="請輸入姓名" type="text"></div>
                <div class="item-title">*性別</div>
                <div class="radio-box">
                    <div class="radio-item">
                        <input v-model="memberInfo.gender" class="radio-point" type="radio" id="male" name="drone"
                            :value="1" checked>
                        <label for="male">男性</label>
                    </div>

                    <div class="radio-item">
                        <input v-model="memberInfo.gender" class="radio-point" type="radio" id="female" name="drone"
                            :value="0">
                        <label for="female">女性</label>
                    </div>

                    <div class="radio-item">
                        <input v-model="memberInfo.gender" class="radio-point" type="radio" id="intersex" name="drone"
                            :value="2">
                        <label for="intersex">中性</label>
                    </div>
                </div>
                <div class="item-title">*生日</div>
                <div><input v-model="memberInfo.birthday" class="input" type="date"></div>
                <div class="item-title">機構</div>
                <div><input v-model="memberInfo.organization" class="input" placeholder="請輸入機構名稱" type="text"></div>
                <div class="item-title">機構類別</div>
                <div class="select-container">
                    <select v-model="memberInfo.category" class="select">
                        <option value="">請選擇</option>
                        <option value="學校">學校</option>
                        <option value="補習班">補習班</option>
                        <option value="政府機關">政府機關</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="btn-green" @click="save">儲存</div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { getInfoById, editInfoById } from "~/api/member";

const cookieInfo = useCookie('info')
const memberId = cookieInfo.value.id
const memberInfo = reactive({})
const setMemberInfo = async () => {
    const { data } = await getInfoById(memberId)
    let userInfo = data.value.data
    userInfo.birthday = userInfo.birthday.split(' ')[0]
    Object.assign(memberInfo, JSON.parse(JSON.stringify(userInfo)))
}

nextTick(() => {
    setMemberInfo()
})
const saveData = reactive({
    "name": "",
    "gender": 0,
    "birthday": "",
    "organization": "",
    "category": "",
})
const dayjs = useDayjs()
const save = () => {
    memberInfo.birthday = dayjs(memberInfo.birthday).format('YYYY-MM-DD HH:mm:ss')
    if (memberInfo.name === '') {
        ElMessage({
            message: '請輸入姓名！',
            type: 'warning',
        })
    } else if (memberInfo.birthday === '') {
        ElMessage({
            message: '請輸入生日！',
            type: 'warning',
        })
    } else {
        editInfoById(memberInfo.id,JSON.parse(JSON.stringify(memberInfo))).then((res) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            })
            setMemberInfo()
        })
            .catch(() => {
                ElMessage.error('更新失敗')
            })
    }

}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/form.scss';
@import '~/assets/styles/popup.scss';

.box {
    .block-box {
        overflow: auto;
        max-height: none;
    }
}
</style>