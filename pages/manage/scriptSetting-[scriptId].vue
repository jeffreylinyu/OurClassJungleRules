<template>
    <NuxtLayout name="custom">
        <div class="step">
            <div class="step-script-head">
                <nuxt-link to="/manage/script" class="step-script-head-leave"><div style="display:flex;align-items: center;"><img src="@/assets/images/Icon/arrow-left.svg"> 返回列表</div></nuxt-link>
                <div class="step-script-head-route">
                    <nuxt-link :to='`/manage/scriptSetting-${scriptId}`' class="step-script-head-route1">基本設定</nuxt-link>
                    <nuxt-link :to='`/manage/scriptDetail-${scriptId}`' class="step-script-head-route2">詳細內容</nuxt-link>
                </div>
                <div class="step-script-head-setting">
                    <div class="step-script-head-sub">啟用狀態：</div>
                    <el-switch v-model="isUsed" @change="statusChange" active-text="開啟" inactive-text="">
                    </el-switch>
                </div>
            </div>

            <!-- body -->
            <div class="step-script-edit-row">
                <div class="step-script-edit-title">基本設定</div>
                <div v-if="isEdited" @click="isEdited = false" class="step-script-edit-edit">編輯</div>
                <div v-else class="step-script-edit-row2">
                    <div @click="saveEdit" class="step-script-edit-store">儲存</div>
                    <div @click="cancel" class="step-script-edit-cancel">取消</div>
                </div>
            </div>

            <!-- body content -->

            <div v-if="isEdited" class="step-day-outer">
                <div class="step-day-row">
                    <div class="step-day-title5">故事封面</div>
                    <div class="step-day-img">
                        <img v-if="scriptData.hasImg" :src="imgUrl"
                            alt="">
                    </div>
                </div>
                <div class="step-day-row step-day-space-start">
                    <div class="step-day-title5">故事名稱</div>
                    <div class="step-day-text">{{ scriptData.title }}</div>
                </div>
                <div class="step-day-row step-day-space-start">
                    <div class="step-day-title5">故事簡述</div>
                    <div class="step-day-text">{{ scriptData.description }}</div>
                </div>
                <div class="step-day-row step-day-space-start">
                    <div class="step-day-title5">故事時長 (天)</div>
                    <div class="step-day-text">{{ scriptData.scriptPeriod }}天</div>
                </div>
                <div class="step-day-row step-day-space-start">
                    <div class="step-day-title5">教學重點</div>
                    <div class="step-day-text">
                        <div v-for="(item, index) in scriptData.goal" :key="index">
                            {{ index + 1 }}. {{ item }}
                        </div>
                    </div>
                </div>
                <div class="step-day-row step-day-space-start">
                    <div class="step-day-title5">給老師的提醒</div>
                    <div class="step-day-text">
                        <div v-for="(item, index) in scriptData.tips" :key="index">
                            {{ index + 1 }}. {{ item }}
                        </div>
                    </div>
                </div>
                <div class="step-day-row step-day-space-start">
                    <div class="step-day-title5">前導說明</div>
                    <div class="step-day-text">
                        <div v-for="(item, index) in scriptData.preamble" :key="index">
                            {{ index + 1 }}. {{ item }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 編輯狀態 -->
            <div v-else class="step-body">
                <div class="step-body-title">*故事封面</div>
                <div v-if="!isPhoto" class="step-body-upload">上傳圖片</div>
                <div v-if="!isPhoto" class="step-body-upload-hint">尺寸建議為 1920 x 300px</div>
                <input type="file" accept=".jpg,.jpeg,.png" ref="fileInput" style="display: none;" @change="changeFile" name="" id="">
                <div class="step-body-img">
                    <img v-if="scriptData.hasImg" :src="imgUrl" alt="">
                </div>
                <div @click="chooseFile" class="choose-file-btn">
                    <img src="@/assets/images/Icon/upload.svg" alt="">
                    <span>上傳圖片</span>
                </div>

                <div class="step-body-title">*故事名稱</div>
                <input v-model="editData.title" class="input step-body-input" placeholder="請輸入故事名稱" type="text">
                <div class="step-body-title">*故事簡述</div>
                <input v-model="editData.description" class="input step-body-input" placeholder="ex.潛在霸凌者需求：生理需求"
                    type="text">
                <div class="step-body-title">*故事時長 (日)</div>
                <input v-model="editData.scriptPeriod" class="input step-body-input2" placeholder="請輸入數值" type="number"
                    :min="2">
                <div class="step-body-hint">最少 2 日</div>

                <div class="step-body-row1">
                    <div class="step-body-title2">*教學重點</div>
                    <div @click="addListItem(editGoalList)" class="step-body-add">＋增加</div>
                </div>
                <div v-for="(item, value) in editGoalList" :key="value" class="step-body-row2">
                    <input v-model="item.value" class="input step-body-input3" placeholder="請輸入文字" type="text">
                    <div @click="deleteListItem(editGoalList, item.id)" class="step-body-close">-</div>
                </div>

                <div class="step-body-row1">
                    <div class="step-body-title2">*給老師的提醒</div>
                    <div @click="addListItem(editTipsList)" class="step-body-add">＋增加</div>
                </div>
                <div v-for="(item, value) in editTipsList" :key="value" class="step-body-row2">
                    <input v-model="item.value" class="input step-body-input3" placeholder="請輸入文字" type="text">
                    <div @click="deleteListItem(editTipsList, item.id)" class="step-body-close">-</div>
                </div>

                <div class="step-body-row1">
                    <div class="step-body-title2">*前導說明</div>
                    <div @click="addListItem(editPreambleList)" class="step-body-add">＋增加</div>
                </div>
                <div v-for="(item, value) in editPreambleList" :key="value" class="step-body-row2">
                    <input v-model="item.value" class="input step-body-input3" placeholder="請輸入文字" type="text">
                    <div @click="deleteListItem(editPreambleList, item.id)" class="step-body-close">-</div>
                </div>
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup>
import { getScriptById, editScriptById, uploadFileById } from "~/api/script";

const route = useRoute();
const scriptId = route.params.scriptId

const fileInput = ref(null)
const chooseFile = () => {
    fileInput.value.click();
}

const editGoalList = reactive([])
const editTipsList = reactive([])
const editPreambleList = reactive([])

const scriptData = reactive({})
const editData = reactive({})
const setEditList = (list, targetList) => {
    targetList.length = 0
    list.forEach(item => {
        targetList.push({
            value: item,
            id: Math.random().toString(36)
        })
    });
}

const imgUrl = ref("")
const setScriptData = async () => {

    const { data } = await getScriptById(scriptId)
    // userInfo.birthday = userInfo.birthday.split(' ')[0]
    Object.assign(scriptData, JSON.parse(JSON.stringify(data.value.data)))
    scriptData.hasImg = scriptData.mediaDTO.length > 0
    if (scriptData.hasImg) {
        imgUrl.value = scriptData.mediaDTO.filter(o => o.description == "cover")[0].filePath
    }
    Object.assign(editData, JSON.parse(JSON.stringify(data.value.data)))
    setEditList(editData.goal, editGoalList)
    setEditList(editData.tips, editTipsList)
    setEditList(editData.preamble, editPreambleList)
    isUsed.value = scriptData.status == 0
}



const setImgUrl = async () => {
    const { data } = await getScriptById(scriptId)
    let script = JSON.parse(JSON.stringify(data.value.data))
    scriptData.hasImg = script.mediaDTO.length > 0
    if (scriptData.hasImg) {
        imgUrl.value = script.mediaDTO.filter(o => o.description == "cover")[0].filePath
    }
}

const statusChange = async () => {
    scriptData.status = isUsed.value ? 0 : 1;
    await editScriptById(scriptId, scriptData)
    await setScriptData()
}

const addListItem = (targetList) => {
    targetList.push({
        value: "",
        id: Math.random().toString(36)
    })
}

const deleteListItem = (targetList, id) => {
    const index = targetList.findIndex(item => item.id === id);
    if (index !== -1) {
        targetList.splice(index, 1);
    }
}

const saveEdit = () => {
    let editDataParse = JSON.parse(JSON.stringify(editData))
    // let parseEditGoalList = JSON.parse(JSON.stringify(editGoalList)).map(o => o.value)
    editDataParse.goal = editGoalList.map(o => o.value)
    editDataParse.tips = editTipsList.map(o => o.value)
    editDataParse.preamble = editPreambleList.map(o => o.value)
    isEdited.value = true
    editScriptById(scriptId, editDataParse).then(() => {
        setScriptData()
    })
}

const cancel = () => {
    isEdited.value = true
    setScriptData()
}

const changeFile = async (el) => {
    const formData = new FormData();
    formData.append('file', el.target.files[0])
    formData.append('description','cover')
    await uploadFileById(scriptId, formData)
    await setImgUrl()
}

const isUsed = ref(false)
const isEdited = ref(true)
const isPhoto = ref(true)
nextTick(() => {
    setScriptData()
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/step.scss';

.choose-file-btn {
    border-radius: 50px;
    border: 1px solid $primary1;
    width: 130px;
    height: 36px;
    padding: 5px 0px;
    display: flex;
    color: $primary1;
    justify-content: center;
    cursor: pointer;
    margin-top: 10px;
}
</style>