<template>
    <NuxtLayout name="custom">
        <div class="step">
            <!-- header -->
            <div class="step-header">
                <div class="step-header-num step-header-num-current">1</div>
                <div class="step-header-head step-header-head-current">基本資訊</div>
                <div class="step-header-line"></div>
                <div class="step-header-num">2</div>
                <div class="step-header-head">詳細內容</div>
                <div class="step-header-line"></div>
                <div class="step-header-num">3</div>
                <div class="step-header-head">確認內容</div>
            </div>

            <!-- body -->
            <div class="step-body">
                <div class="step-body-title">*故事封面</div>
                <input type="file" accept=".jpg,.jpeg,.png" ref="fileInput" @change="handleFileUpload"
                    style="display: none;" />
                <img v-if="isPhoto" class="step-body-img" :src="previewImage" alt="">
                <div @click="triggerFileUpload" class="step-body-upload">上傳圖片</div>
                <div v-if="!isPhoto" class="step-body-upload-hint">尺寸建議為 1920 x 300px</div>
                <div class="step-body-title">*故事名稱</div>
                <input v-model="scriptName" class="input step-body-input" placeholder="請輸入名稱" type="text">
                <div class="step-body-title">*故事簡述</div>
                <input v-model="scriptDescription" class="input step-body-input" placeholder="ex.潛在霸凌者需求：生理需求" type="text">
                <div class="step-body-title">*故事時長 (日)</div>
                <input v-model="scriptDuration" min="2" class="input step-body-input2" placeholder="請輸入數值" type="number">
                <div class="step-body-hint">最少 2 日</div>

                <div class="step-body-row1">
                    <div class="step-body-title2">*教學重點</div>
                    <div @click="addTeachingFocus" class="step-body-add">＋增加</div>
                </div>
                <div v-for="(item, value) in teachingFocus" :key="value" class="step-body-row2">
                    <input v-model="item.value" class="input step-body-input3" placeholder="請輸入文字" type="text">
                    <div @click="deleteTeachingFocus(item.id)" class="step-body-close">-</div>
                </div>

                <div class="step-body-row1">
                    <div class="step-body-title2">*給老師的提醒</div>
                    <div @click="addRemindertoTeacher" class="step-body-add">＋增加</div>
                </div>
                <div v-for="(item, value) in remindertoTeacher" :key="value" class="step-body-row2">
                    <input v-model="item.value" class="input step-body-input3" placeholder="請輸入文字" type="text">
                    <div @click="deleteRemindertoTeacher(item.id)" class="step-body-close">-</div>
                </div>

                <div class="step-body-row1">
                    <div class="step-body-title2">*前導說明</div>
                    <div @click="addPreamble" class="step-body-add">＋增加</div>
                </div>
                <div v-for="(item, value) in preamble" :key="value" class="step-body-row2">
                    <input v-model="item.value" class="input step-body-input3" placeholder="請輸入文字" type="text">
                    <div @click="deletePreamble(item.id)" class="step-body-close">-</div>
                </div>
            </div>

            <div class="step-next">
                <div @click="handleAddOne" class="step-next-next">下一步</div>
                <nuxt-link to="/" class="step-next-cancel">取消</nuxt-link>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { addOne, uploadFileById } from "~/api/script";
import { ElMessage } from 'element-plus'

const dayjs = useDayjs()
let formDataImg
const router = useRouter();
const handleAddOne = async () => {
    if (verify()) {
        let addScriptData = {
            author: "",
            createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            description: scriptDescription.value,
            goal: teachingFocus.map(o => o.value),
            mediaDTO: [],
            parentConfig: null,
            preamble: preamble.map(o => o.value),
            scriptDetail: [],
            scriptPeriod: scriptDuration.value,
            status: 0,
            tips: remindertoTeacher.map(o => o.value),
            title: scriptName.value,
            updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        
        let { data } = await addOne(addScriptData)
        let scriptId = data.value.data.scriptId

        if (formDataImg) {
            await uploadFileById(scriptId, formDataImg)
        }
        router.push({ path: `/manage/stepDetail-${scriptId}` })
    }

}
const verify = () => {
    let verify = false
    if (scriptName.value === '') {
        ElMessage({
            message: '請輸入故事名稱！',
            type: 'warning',
        })
    } else if (scriptDescription.value === '') {
        ElMessage({
            message: '請輸入故事簡述！',
            type: 'warning',
        })
    } else if (scriptDuration.value === '') {
        ElMessage({
            message: '請輸入故事時長！',
            type: 'warning',
        })
    } else if (teachingFocus.length == 0) {
        ElMessage({
            message: '請增加教學重點！',
            type: 'warning',
        })
    } else if (remindertoTeacher.length == 0) {
        ElMessage({
            message: '請增加給老師的提醒！',
            type: 'warning',
        })
    } else if (preamble.length == 0) {
        ElMessage({
            message: '請增加前導說明！',
            type: 'warning',
        })
    } else {
        verify = true
    }

    return verify

}
const isPhoto = ref(false)
const scriptName = ref('')
const scriptDescription = ref('')
const scriptDuration = ref(2)
const teachingFocus = reactive([{
    value: "",
    id: Math.random().toString(36)
}])

const addTeachingFocus = () => {
    teachingFocus.push({
        value: "",
        id: Math.random().toString(36)
    })
}
const deleteTeachingFocus = (id) => {
    const index = teachingFocus.findIndex(item => item.id === id);
    if (index !== -1) {
        teachingFocus.splice(index, 1);
    }
}


const remindertoTeacher = reactive([{
    value: "",
    id: Math.random().toString(36)
}])

const addRemindertoTeacher = () => {
    remindertoTeacher.push({
        value: "",
        id: Math.random().toString(36)
    })
}
const deleteRemindertoTeacher = (id) => {
    const index = remindertoTeacher.findIndex(item => item.id === id);
    if (index !== -1) {
        remindertoTeacher.splice(index, 1);
    }
}

const preamble = reactive([{
    value: "",
    id: Math.random().toString(36)
}])
const addPreamble = () => {
    preamble.push({
        value: "",
        id: Math.random().toString(36)
    })
}
const deletePreamble = (id) => {
    const index = preamble.findIndex(item => item.id === id);
    if (index !== -1) {
        preamble.splice(index, 1);
    }
}

const fileInput = ref(null);
const triggerFileUpload = () => {
    fileInput.value.click();
};


const previewImage = ref('');
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const validTypes = ['image/jpeg', 'image/png'];

    if (validTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append('file',file)
        formData.append('description','cover')
        formDataImg = formData
        // 將 file 轉換為 URL 並預覽
        previewImage.value = URL.createObjectURL(file);
        isPhoto.value = true;
    } else {
        alert('文件類型無效。 請上傳 JPEG 或 PNG 圖片');
    }
};


</script>

<style lang="scss" scoped>
@import '~/assets/styles/step.scss';

.box {}
</style>