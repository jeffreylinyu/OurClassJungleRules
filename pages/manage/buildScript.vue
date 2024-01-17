<template>
    <NuxtLayout name="custom">
        <div class="step">
            <!-- header -->
            <div class="step-header">
                <div :class="{ 'step-header-num-current': active == 1 }" class="step-header-num">1</div>
                <div @click="next(1)" :class="{ 'step-header-head-current': active == 1 }" class="step-header-head">基本資訊
                </div>
                <div class="step-header-line"></div>
                <div :class="{ 'step-header-num-current': active == 2 }" class="step-header-num">2</div>
                <div @click="next(2)" :class="{ 'step-header-head-current': active == 2 }" class="step-header-head">詳細內容
                </div>
                <div class="step-header-line"></div>
                <div :class="{ 'step-header-num-current': active == 3 }" class="step-header-num">3</div>
                <div @click="next(3)" :class="{ 'step-header-head-current': active == 3 }" class="step-header-head">確認內容
                </div>
            </div>
            <StepInfo v-show="active == 1" @infoDataEmit="setInfoData"></StepInfo>
            <StepDetail v-show="active == 2" @detailDataEmit="setDetailData" @endingDataEmit="setEndingData"
                :period="infoData.scriptPeriod"></StepDetail>
            <StepConfirm v-if="active == 3" :infoData="infoData" :detailData="detailData" :endingData="endingData">
            </StepConfirm>
            <!-- next -->
            <div v-if="active == 1" class="step-next">
                <div @click="next(2)" class="step-next-next">下一步</div>
                <nuxt-link to="/manage/script" class="step-next-cancel">取消</nuxt-link>
            </div>
            <div v-if="active == 2" class="step-next">
                <div @click="next(3)" class="step-next-next">下一步</div>
                <div @click="next(1)" class="step-next-cancel">上一步</div>
            </div>
            <div v-if="active == 3" class="step-next">
                <div @click="finished" class="step-next-next">完成</div>
                <div @click="next(2)" class="step-next-cancel">上一步</div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { addOne, uploadFileById, uploadDetail, uploadEnding } from "~/api/script";
import { ElMessage } from 'element-plus'

const active = ref(1)
const dayjs = useDayjs()

let infoData = {
    formDataImg: null,
    title: "",
    description: "",
    scriptPeriod: 2,
    goal: [],
    tips: [],
    preamble: []
}
const setInfoData = (data) => {
    infoData = data
}

let detailData = []
const setDetailData = (data) => {
    detailData = data
}

let endingData = {}
const setEndingData = (data) => {
    endingData = data
}

const next = (toStep) => {
    if (toStep == 3) {
        if (infoVerify() && detailVerify()) {
            active.value = toStep
        }
    } else if (toStep == 2) {
        if (infoVerify()) {
            active.value = toStep
        }
    } else {
        active.value = toStep
    }
}

const detailVerify = () => {
    let detailVerify = detailData.length !== 0
    let endingVerify = Object.keys(endingData).length !== 0
    if (!detailVerify) {
        ElMessage({
            message: '請填寫劇本詳細內容！',
            type: 'warning',
        })
        return false
    } else if (!endingVerify) {
        ElMessage({
            message: '請填寫劇本結局日內容！',
            type: 'warning',
        })
        return false
    } else {
        return true
    }
}

const infoVerify = () => {
    let verify = false
    if (infoData.title === '') {
        ElMessage({
            message: '請輸入劇本名稱！',
            type: 'warning',
        })
    } else if (infoData.description === '') {
        ElMessage({
            message: '請輸入劇本簡述！',
            type: 'warning',
        })
    } else if (infoData.scriptPeriod === '') {
        ElMessage({
            message: '請輸入劇本時長！',
            type: 'warning',
        })
    } else {
        verify = true
    }

    return verify

}

let addingScriptId = ""
let addingData
const addScript = async () => {
    let addScriptData = {
        author: "",
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        description: infoData.description,
        goal: infoData.goal,
        mediaDTO: [],
        parentConfig: null,
        preamble: infoData.preamble,
        scriptDetail: [],
        scriptPeriod: infoData.scriptPeriod,
        status: 0,
        tips: infoData.tips,
        title: infoData.title,
        updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    let { data } = await addOne(addScriptData)
    addingScriptId = data.value.data.scriptId
    addingData = data.value.data
    if (infoData.formDataImg) {
        await uploadFileById(addingScriptId, infoData.formDataImg)
    }

}

const addScriptDetail = async () => {
    for (let index = 0; index < detailData.length; index++) {
        detailData[index].additionalInfo = detailData[index].additionalInfo.map(o => o.text)
        detailData[index].studentConfigs.forEach(obj => {
            delete obj["id"]
        });
        detailData[index].parentConfigs.forEach(obj => {
            delete obj["id"]
        });
        detailData[index].scriptId = addingScriptId
        await uploadDetail(detailData[index])
        if (detailData[index].drama) {
            await uploadFileById(addingScriptId, detailData[index].drama)
        }
        if (detailData[index].sheet) {
            await uploadFileById(addingScriptId, detailData[index].sheet)
        }
        if (detailData[index].bulletin) {
            await uploadFileById(addingScriptId, detailData[index].bulletin)
        }
        if (detailData[index].information) {
            await uploadFileById(addingScriptId, detailData[index].information)
        }
    }
}

const addScriptEnding = async () => {
    let addData = {
        "advisoryTime": endingData.advisoryTime,
        "endingDescription": endingData.endingDescription,
        "endingFour": endingData.endingFour,
        "endingOne": endingData.endingOne,
        "endingThree": endingData.endingThree,
        "endingTwo": endingData.endingTwo,
        "orderlyFour": endingData.orderlyFour,
        "orderlyOne": endingData.orderlyOne,
        "orderlyThree": endingData.orderlyThree,
        "orderlyTwo": endingData.orderlyTwo,
        "relationFour": endingData.relationFour,
        "relationOne": endingData.relationOne,
        "relationThree": endingData.relationThree,
        "relationTwo": endingData.relationTwo,
        "scriptId": addingScriptId
    }

    await uploadEnding(addData)
    if (endingData["endingMovie-1"]) {
        await uploadFileById(addingScriptId, endingData)
    }
    if (endingData["endingMovie-2"]) {
        await uploadFileById(addingScriptId, endingData["endingMovie-2"])
    }
    if (endingData["endingMovie-3"]) {
        await uploadFileById(addingScriptId, endingData["endingMovie-3"])
    }
    if (endingData["endingMovie-4"]) {
        await uploadFileById(addingScriptId, endingData["endingMovie-4"])
    }
    if (endingData.endingSheet) {
        await uploadFileById(addingScriptId, endingData.endingSheet)
    }
    if (endingData.endingBulletin) {
        await uploadFileById(addingScriptId, endingData.endingBulletin)
    }
}

const router = useRouter()
const finished = async () => {
    await addScript()
    await addScriptDetail()
    await addScriptEnding()
    ElMessage({
        message: '建立成功',
        type: 'success',
    })
    router.push("/manage/script")
}


</script>

<style lang="scss" scoped>
@import '~/assets/styles/step.scss';
</style>