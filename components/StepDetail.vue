<template>
    <div>
        <!-- body -->
        <div v-for="dayData, index1 in dataFormList" :key="dayData.period" class="step-day">
            <div @click="toggleContent(dayData.period)" class="step-day-head-row">
                <div class="step-day-head-text">第 {{ dayData.period }} 日</div>
                <div class="step-day-head-up">^</div>
            </div>

            <div class="step-day-box" :id="`content-${dayData.period}`">
                <div class="step-day-title">*建議進行時間(分鐘)</div>
                <input v-model="dayData.advisoryTime" class="input step-day-input" placeholder="ex.10 分鐘" type="number">
                <div class="step-day-title">*帶領方式說明</div>
                <textarea v-model="dayData.description" class="input step-day-textarea" placeholder="ex.
1. 簡介本教材進行方式。
2. 在課堂上發布第一日的影片:虎兔篇day1。
3. 發布虎兔篇「額外資訊」。
4. 發下第一日的學習單，請同學回家填寫。" type="text"></textarea>
                <div class="step-day-title">*本日劇情</div>
                <textarea v-model="dayData.todayScript" class="input step-day-textarea" placeholder="請輸入描述內容"
                    type="text"></textarea>

                <div class="step-day-row">
                    <div class="step-day-title3">*額外資訊</div>
                    <div @click="addOneItem(dayData.period, 'additionalInfo')" class="step-day-add">＋增加</div>
                </div>
                <div v-for="info, index2 in dayData.additionalInfo" :key="info.id" class="step-day-row2">
                    <input v-model="info.text" class="input step-day-input2" placeholder="請輸入說明文字" type="text">
                    <div @click="deleteOneItem(dayData.period, 'additionalInfo', info.id)" class="step-day-close">-
                    </div>
                </div>

                <!-- 學生 -->
                <div class="step-day-title2">學生討論內容</div>
                <div class="step-day-net">
                    <div class="step-day-title">*學生討論題目</div>
                    <input v-model="dayData.stuContent" class="input step-day-input1" placeholder="請輸入題目描述" type="text">
                    <div class="step-day-line"></div>

                    <div class="step-day-row">
                        <div class="step-day-title">*學生題目選項</div>
                        <div @click="addOneItem(dayData.period, 'studentConfigs')" class="step-day-add">＋增加</div>
                    </div>
                    <div v-for="config in dayData.studentConfigs" :key="config.id" class="step-day-row2">
                        <input v-model="config.stuDescription" class="input step-day-input3" placeholder="請輸入選項描述"
                            type="text">
                        <div class="step-day-title3">秩序</div>
                        <div class="step-day-container">
                            <select v-model="config.stuOrderly" class="select">
                                <option :value="3">3</option>
                                <option :value="2">2</option>
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                                <option :value="-1">-1</option>
                                <option :value="-2">-2</option>
                                <option :value="-3">-3</option>
                            </select>
                        </div>
                        <div class="step-day-title3">關係</div>
                        <div class="step-day-container">
                            <select v-model="config.stuRelation" class="select">
                                <option :value="3">3</option>
                                <option :value="2">2</option>
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                                <option :value="-1">-1</option>
                                <option :value="-2">-2</option>
                                <option :value="-3">-3</option>
                            </select>
                        </div>
                        <div @click="deleteOneItem(dayData.period, 'studentConfigs', config.id)" class="step-day-close">-
                        </div>
                    </div>
                </div>

                <!-- 家長 -->
                <div class="step-day-title2">家長討論內容</div>
                <div class="step-day-net">
                    <div class="step-day-title">*家長討論題目</div>
                    <input v-model="dayData.parContent" class="input step-day-input1" placeholder="請輸入題目描述" type="text">
                    <div class="step-day-line"></div>

                    <div class="step-day-row">
                        <div class="step-day-title">*家長題目選項</div>
                        <div @click="addOneItem(dayData.period, 'parentConfigs')" class="step-day-add">＋增加</div>
                    </div>
                    <div v-for="config in dayData.parentConfigs" :key="config.id" class="step-day-row2">
                        <input v-model="config.parDescription" class="input step-day-input3" placeholder="請輸入選項描述"
                            type="text">
                        <div class="step-day-title3">秩序</div>
                        <div class="step-day-container">
                            <select v-model="config.parOrderly" class="select">
                                <option :value="3">3</option>
                                <option :value="2">2</option>
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                                <option :value="-1">-1</option>
                                <option :value="-2">-2</option>
                                <option :value="-3">-3</option>
                            </select>
                        </div>
                        <div class="step-day-title3">關係</div>
                        <div class="step-day-container">
                            <select v-model="config.parRelation" class="select">
                                <option :value="3">3</option>
                                <option :value="2">2</option>
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                                <option :value="-1">-1</option>
                                <option :value="-2">-2</option>
                                <option :value="-3">-3</option>
                            </select>
                        </div>
                        <div @click="deleteOneItem(dayData.period, 'parentConfigs', config.id)" class="step-day-close">-
                        </div>
                    </div>
                </div>

                <div class="step-day-title2">教材檔案</div>
                <div class="step-day-net">
                    <div class="step-day-row">
                        <div class="step-day-title3">劇情影片</div>
                        <span v-if="dayData.drama">{{ getFileName(dayData.drama) }}</span>
                        <div class="step-day-btn">
                            <img v-if="dayData.drama" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            <div @click="chooseFile('drama', dayData.period)" class="step-day-upload">上傳</div>
                            <input type="file" :id="`drama-${dayData.period}`" style="display: none;" @change="changeFile"
                                :data-period="dayData.period" data-ref="drama">
                        </div>

                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title3">學習單</div>
                        <span v-if="dayData.sheet">{{ getFileName(dayData.sheet) }}</span>
                        <div class="step-day-btn">
                            <img v-if="dayData.sheet" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            <div @click="chooseFile('sheet', dayData.period)" class="step-day-upload">上傳</div>
                            <input type="file" :id="`sheet-${dayData.period}`" style="display: none;" @change="changeFile"
                                :data-period="dayData.period" data-ref="sheet">
                        </div>

                    </div>
                    <div v-if="dayData.period == 1" class="step-day-row">
                        <div class="step-day-title3">教學簡報</div>
                        <span v-if="dayData.bulletin">{{ getFileName(dayData.bulletin) }}</span>
                        <div class="step-day-btn">
                            <img v-if="dayData.bulletin" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            <div @click="chooseFile('bulletin', dayData.period)" class="step-day-upload">上傳</div>
                            <input type="file" :id="`bulletin-${dayData.period}`" style="display: none;"
                                @change="changeFile" :data-period="dayData.period" data-ref="bulletin">
                        </div>

                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title3">額外資訊</div>
                        <span v-if="dayData.information">{{ getFileName(dayData.information) }}</span>
                        <div class="step-day-btn">
                            <img v-if="dayData.information" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            <div @click="chooseFile('information', dayData.period)" class="step-day-upload">上傳</div>
                            <input type="file" :id="`information-${dayData.period}`" style="display: none;"
                                @change="changeFile" :data-period="dayData.period" data-ref="information">
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 結局日 -->
        <div class="step-day">
            <div @click="toggleContent(props.period)" class="step-day-head-row">
                <div class="step-day-head-text">第 {{ props.period }} 日 (結局日)</div>
                <div class="step-day-head-up">^</div>
            </div>

            <div class="step-day-box" :id="`content-${props.period}`">
                <div class="step-day-title">*建議進行時間(分鐘)</div>
                <input v-model="endingData.advisoryTime" class="input step-day-input" placeholder="ex.1 分鐘" type="number">
                <div class="step-day-title">*帶領方式說明</div>
                <textarea v-model="endingData.endingDescription" class="input step-day-textarea" placeholder="請輸入帶領方式說明"
                    type="text"></textarea>
                <div class="step-day-title">*結局一描述 (鴞老師)</div>
                <textarea v-model="endingData.endingOne" class="input step-day-textarea" placeholder="請輸入描述內容"
                    type="text"></textarea>
                <div class="step-day-title">*結局二描述 (鴿老師)</div>
                <textarea v-model="endingData.endingTwo" class="input step-day-textarea" placeholder="請輸入描述內容"
                    type="text"></textarea>
                <div class="step-day-title">*結局三描述 (鴉老師)</div>
                <textarea v-model="endingData.endingThree" class="input step-day-textarea" placeholder="請輸入描述內容"
                    type="text"></textarea>
                <div class="step-day-title">*結局四描述 (鷹老師)</div>
                <textarea v-model="endingData.endingFour" class="input step-day-textarea" placeholder="請輸入描述內容"
                    type="text"></textarea>

                <div class="step-day-title2">結局影片</div>
                <div class="step-day-net">
                    <div class="step-day-row">
                        <div class="step-day-title3">結局一 (鴞老師) 影片</div>
                        <span v-if="endingData['endingMovie-1']">{{ getFileName(endingData['endingMovie-1']) }}</span>
                        <div class="step-day-btn">
                            <img v-if="endingData['endingMovie-1']" class="step-day-icon"
                                src="~/assets/images/Icon/available.svg" alt="available">
                            <div @click="endingChooseFile('endingMovie-1')" class="step-day-upload">上傳</div>
                            <input type="file" id="endingMovie1-input" style="display: none;" @change="endingChangeFile"
                                data-ref="endingMovie1">
                        </div>
                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title3">結局二 (鴿老師) 影片</div>
                        <span v-if="endingData['endingMovie-2']">{{ getFileName(endingData['endingMovie-2']) }}</span>
                        <div class="step-day-btn">
                            <img v-if="endingData['endingMovie-2']" class="step-day-icon"
                                src="~/assets/images/Icon/available.svg" alt="available">
                            <div @click="endingChooseFile('endingMovie-2')" class="step-day-upload">上傳</div>
                            <input type="file" id="endingMovie2-input" style="display: none;" @change="endingChangeFile"
                                data-ref="endingMovie2">
                        </div>
                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title3">結局三 (鴉老師) 影片</div>
                        <span v-if="endingData['endingMovie-3']">{{ getFileName(endingData['endingMovie-3']) }}</span>
                        <div class="step-day-btn">
                            <img v-if="endingData['endingMovie-3']" class="step-day-icon"
                                src="~/assets/images/Icon/available.svg" alt="available">
                            <div @click="endingChooseFile('endingMovie-3')" class="step-day-upload">上傳</div>
                            <input type="file" id="endingMovie3-input" style="display: none;" @change="endingChangeFile"
                                data-ref="endingMovie3">
                        </div>
                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title3">結局四 (鷹老師) 影片</div>
                        <span v-if="endingData['endingMovie-4']">{{ getFileName(endingData['endingMovie-4']) }}</span>
                        <div class="step-day-btn">
                            <img v-if="endingData['endingMovie-4']" class="step-day-icon"
                                src="~/assets/images/Icon/available.svg" alt="available">
                            <div @click="endingChooseFile('endingMovie-4')" class="step-day-upload">上傳</div>
                            <input type="file" id="endingMovie4-input" style="display: none;" @change="endingChangeFile"
                                data-ref="endingMovie4">
                        </div>
                    </div>
                </div>

                <div class="step-day-title2">教材檔案</div>
                <div class="step-day-net">
                    <div class="step-day-row">
                        <div class="step-day-title3">學習單</div>
                        <span v-if="endingData.endingSheet">{{ getFileName(endingData.endingSheet) }}</span>
                        <div class="step-day-btn">
                            <img v-if="endingData.endingSheet" class="step-day-icon"
                                src="~/assets/images/Icon/available.svg" alt="available">
                            <div @click="endingChooseFile('endingSheet')" class="step-day-upload">上傳</div>
                            <input type="file" id="endingSheet-input" style="display: none;" @change="endingChangeFile"
                                data-ref="endingSheet">
                        </div>
                    </div>
                    <!-- <div class="step-day-row">
                        <div class="step-day-title3">教學簡報</div>
                        <span v-if="dayData.endingBulletin">{{ getFileName(dayData.endingBulletin) }}</span>
                        <div class="step-day-btn">
                            <img v-if="endingData.endingBulletin" class="step-day-icon"
                                src="~/assets/images/Icon/available.svg" alt="available">
                            <div @click="endingChooseFile('endingBulletin')" class="step-day-upload">上傳</div>
                            <input type="file" id="endingBulletin-input" style="display: none;" @change="endingChangeFile"
                                data-ref="endingBulletin">
                        </div>
                    </div> -->
                </div>

                <div class="step-day-title2">計分設定</div>
                <div class="step-day-net">
                    <div class="step-day-row">
                        <div class="step-day-title">結局一 (鴞老師)</div>
                        <div class="step-day-row">
                            <div class="step-day-title3">秩序</div>
                            <div class="step-day-container">
                                <select v-model="endingData.orderlyOne" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                            <div class="step-day-title3">關係</div>
                            <div class="step-day-container">
                                <select v-model="endingData.relationOne" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title">結局二 (鴿老師)</div>
                        <div class="step-day-row">
                            <div class="step-day-title3">秩序</div>
                            <div class="step-day-container">
                                <select v-model="endingData.orderlyTwo" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                            <div class="step-day-title3">關係</div>
                            <div class="step-day-container">
                                <select v-model="endingData.relationTwo" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title">結局三 (鴉老師)</div>
                        <div class="step-day-row">
                            <div class="step-day-title3">秩序</div>
                            <div class="step-day-container">
                                <select v-model="endingData.orderlyThree" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                            <div class="step-day-title3">關係</div>
                            <div class="step-day-container">
                                <select v-model="endingData.relationThree" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="step-day-row">
                        <div class="step-day-title">結局四 (鷹老師)</div>
                        <div class="step-day-row">
                            <div class="step-day-title3">秩序</div>
                            <div class="step-day-container">
                                <select v-model="endingData.orderlyFour" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                            <div class="step-day-title3">關係</div>
                            <div class="step-day-container">
                                <select v-model="endingData.relationFour" class="select">
                                    <option :value="0">正面</option>
                                    <option :value="1">負面</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-day-grey">若計分結果未有正、負面傾向性，則以正面作為結果。</div>

            </div>
        </div>


    </div>
</template>

<script setup>
import { getScriptById, uploadDetail } from "~/api/script";
import { ElMessage } from 'element-plus'

const emit = defineEmits(['detailDataEmit', 'endingDataEmit'])

const props = defineProps({
    period: {
        type: Number,
    }
})

watch(() => props.period, () => {
    setScriptData()
}, { deep: true })

const dataFormList = reactive([])
const setDetailDataForm = () => {
    dataFormList.length = 0
    for (let day = 1; day <= nonEndingDayLength.value; day++) {
        dataFormList.push(
            {
                additionalInfo: [{
                    "text": "",
                    'id': Math.random().toString(36)
                }],//額外資訊
                advisoryTime: 0,//建議時間
                description: "",//帶領方式說明
                parentConfigs: [{
                    "parDescription": "",
                    "parOrderly": 0,
                    "parRelation": 0,
                    'id': Math.random().toString(36)
                }],
                period: day,
                scriptId: "",
                studentConfigs: [{
                    "stuDescription": "",
                    "stuOrderly": 0,
                    "stuRelation": 0,
                    'id': Math.random().toString(36)
                }],
                stuContent: "",
                parContent: "",
                todayScript: "",//本日劇情
                drama: null,
                sheet: null,
                bulletin: null,
                information: null
            }
        )
    }
}

const route = useRoute();
const scriptId = route.params.scriptId
const scriptData = reactive({})
const nonEndingDayLength = ref()
const setScriptData = async () => {
    // const { data } = await getScriptById(scriptId)
    // Object.assign(scriptData, JSON.parse(JSON.stringify(data.value.data)))
    nonEndingDayLength.value = props.period - 1
    setDetailDataForm()
}
setScriptData()

watch(dataFormList, () => {
    emit("detailDataEmit", dataFormList)
})

const sendOut = async () => {
    for (let index = 0; index < dataFormList.length; index++) {
        dataFormList[index].additionalInfo = dataFormList[index].additionalInfo.map(o => o.text)
        dataFormList[index].studentConfigs.forEach(obj => {
            delete obj["id"]
        });
        dataFormList[index].parentConfigs.forEach(obj => {
            delete obj["id"]
        });
        await uploadDetail(dataFormList[index])
    }
    ElMessage({
        message: '新增成功',
        type: 'success',
    })
    //<nuxt-link to="/manage/stepConfirm" class="step-next-next">下一步</nuxt-link>
}


const addOneItem = (day, item) => {
    let dayData = dataFormList.filter(o => o.period == day)[0]
    if (item == 'additionalInfo') {
        dayData.additionalInfo.push({
            "text": "",
            'id': Math.random().toString(36)
        })
    } else if (item == 'studentConfigs') {
        dayData.studentConfigs.push({
            "stuDescription": "",
            "stuOrderly": 0,
            "stuRelation": 0,
            'id': Math.random().toString(36)
        })
    } else if (item == 'parentConfigs') {
        dayData.parentConfigs.push({
            "parDescription": "",
            "parOrderly": 0,
            "parRelation": 0,
            'id': Math.random().toString(36)
        })
    }

}

const chooseFile = (ref, period) => {
    const myButton = document.getElementById(`${ref}-${period}`);
    myButton.click();
}

const getFileName = (formData) => {
    if(formData){
        return formData.get('file').name
    }else {
        return ""
    }
   
}

const changeFile = async (el) => {
    const period = el.target.dataset.period;
    const elRef = el.target.dataset.ref;
    const formData = new FormData();
    formData.append('file', el.target.files[0])
    formData.append('description', `${elRef}-${period}`)
    let dayData = dataFormList.filter(o => o.period == period)[0]
    dayData[elRef] = formData
}

const deleteOneItem = (day, item, id) => {
    let dayData = dataFormList.filter(o => o.period == day)[0]
    let index = dayData[item].findIndex(item => item.id === id);
    if (dayData[item].length == 1) {
        ElMessage({
            message: '請至少輸入一筆資料！',
            type: 'warning',
        })
    } else {
        if (index !== -1) {
            dayData[item].splice(index, 1);
        }
    }
}

const toggleContent = (id) => {
    var contentElement = document.getElementById(`content-${id}`);
    contentElement.classList.toggle("step-day-box-expanded");
}

// 結局日
const endingData = reactive({
    "advisoryTime": 0,
    "endingDescription": "",
    "endingFour": "",
    "endingOne": "",
    "endingThree": "",
    "endingTwo": "",
    "orderlyFour": 0,
    "orderlyOne": 0,
    "orderlyThree": 0,
    "orderlyTwo": 0,
    "relationFour": 0,
    "relationOne": 0,
    "relationThree": 0,
    "relationTwo": 0,
    "scriptId": 0,
    "endingMovie-1": null,
    "endingMovie-2": null,
    "endingMovie-3": null,
    "endingMovie-4": null,
    "endingSheet": null,
    "endingBulletin": null
})

const endingChooseFile = (name) => {
    const myButton = document.getElementById(`${name}-input`);
    myButton.click();
}

const endingChangeFile = (el) => {
    const elRef = el.target.dataset.ref;
    const formData = new FormData();
    formData.append('file', el.target.files[0])
    formData.append('description', `${elRef}`)
    endingData[elRef] = formData

}

watch(endingData, () => {
    emit("endingDataEmit", endingData)
})

</script>

<style lang="scss" scoped>
@import '~/assets/styles/step.scss';

.box {}
</style>