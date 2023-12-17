<template>
    <NuxtLayout name="custom">
        <div v-if="isFirst" class="manage">
            <div class="manage-between">
                <div class="manage-head">我的任務</div>
                <div class="manage-row"></div>

            </div>
            <div class="manage-center">
                <div>尚無任何任務</div>
                <div @click="openAddModal" class="manage-center-add">+ 建立新任務</div>
            </div>
        </div>
        <div v-else class="manage">
            <div class="manage-between">
                <div class="manage-head">我的任務</div>
                <div class="manage-row">
                    <div class="manage-num">項目數量：{{ allData.length }}</div>
                    <div @click="openAddModal" class="manage-create">+ 建立新任務</div>
                </div>

            </div>

            <div class="Mtable">
                <el-table :data="allData" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="taskName" label="任務名稱" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="script" label="劇本" sortable min-width="160">
                        <template #default="scope">
                            {{ getScriptNameById(scope.row.scriptId) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="learningStr" label="學習對象" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="statusStr" label="任務狀態" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="endTime" label="結束時間" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="createTime" label="建立時間" sortable min-width="160">
                    </el-table-column>
                    <el-table-column label="操作" sortable min-width="260">
                        <template #default="scope">
                            <div class="Mtable-row">
                                <div @click.stop="checkMission(scope.row.taskId)" class="Mtable-look">查看
                                    <img src="@/assets/images/Icon/arrow-right.svg">
                                </div>
                                <div class="Mtable-icon-outer" @click="handleEdit(scope.row)"
                                    @mouseover="setHoverImg(scope.row.id, 'edit', 'mouseover')"
                                    @mouseleave="setHoverImg(scope.row.id, 'edit', 'mouseleave')">
                                    <img v-if="scope.row.isEditHove" class="Mtable-icon"
                                        src="@/assets/images/Icon/edit_hover.svg" alt="close">
                                    <img v-else class="Mtable-icon" src="@/assets/images/Icon/edit.svg" alt="close">
                                </div>
                                <div class="Mtable-icon-outer" @click="deleteUser(scope.row)"
                                    @mouseover="setHoverImg(scope.row.id, 'delete', 'mouseover')"
                                    @mouseleave="setHoverImg(scope.row.id, 'delete', 'mouseleave')">
                                    <img v-if="scope.row.isDeleteHove" class="Mtable-icon"
                                        src="@/assets/images/Icon/delete_hover.svg" alt="close">
                                    <img v-else class="Mtable-icon" src="@/assets/images/Icon/delete.svg" alt="close">
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 新增資料 -->
        <div v-if="isShowAdd" class="popup">
            <div @click="isShowAdd = false" class="box">
                <div @click.stop class="block-box">
                    <div class="title">
                        <span>建立新任務</span>
                        <el-popover :width="700" trigger="click">
                            <template #reference>
                                <img class="information" src="@/assets/images/Icon/information.svg" alt="close">
                            </template>
                            <div class="container">
                                <ol>
                                    <li class="list-item">
                                        請點選畫面最上排的「我的任務」。
                                    </li>
                                    <li class="list-item">
                                        進到「我的任務」畫面後，請點選右側的「建立新任務」。
                                    </li>
                                    <li class="list-item">
                                        請點選畫面最上排的「我的任務」。
                                        <ul class="sub-list">
                                            <li class="sub-list-item">任務名稱：可輸入要帶領的班級名稱，方便自己辨識，例如：一年三班。</li>
                                            <li class="sub-list-item">選擇劇本：選擇欲使用的劇本，共有 4 篇可選，各有不同的帶領天數。</li>
                                            <li class="sub-list-item">學習對象：選擇帶領的對象年齡層，此資料將作為阿普蛙後台統計使用。</li>
                                            <li class="sub-list-item">預期參與組數：建議輸入預計分成的組數。</li>
                                            <li class="sub-list-item">結束日期：輸入此劇本預計帶領完畢的日期，建議可以多抓幾天，避免影片 QR Code 失效。</li>
                                            <li class="sub-list-item">點選「確認」鍵。</li>
                                        </ul>
                                    </li>
                                    <li class="list-item">
                                        列表上會出現你所建立的任務，帶領該班級時，可點選右方的「查看」鍵。
                                    </li>
                                    <li class="list-item">
                                        點選「查看」鍵後，下拉即有每天的操作步驟，並可播放影片、輸入各組答案，以及下載各種教學所需的檔案。
                                    </li>
                                    <li class="list-item">
                                        點選「我的任務」即可回到任務列表。每個任務亦可點選右方畫筆及垃圾桶圖示，前者可修改任務大綱，後者可刪除任務。
                                    </li>
                                    <li class="list-item">
                                        若操作上有任何疑問，歡迎於上班時間來信或來電阿普蛙工作室。
                                    </li>
                                </ol>
                            </div>
                        </el-popover>

                    </div>
                    <div class="item-title">*任務名稱</div>
                    <div><input v-model="addData.taskName" class="input" placeholder="請輸入文字" type="text"></div>
                    <div class="item-title">*選擇劇本</div>
                    <div class="select-container">
                        <select v-model="addData.scriptId" class="select">
                            <option :value="item.value" v-for="item of scriptOption" :key="item.value">{{ item.text }}
                            </option>
                        </select>
                    </div>
                    <div class="item-title">*學習對象</div>
                    <div class="select-container">
                        <select v-model="addData.learning" class="select">
                            <option :value="item.id" v-for="item of learningMap" :key="item.id">{{ item.text }}</option>
                        </select>
                    </div>
                    <div class="item-title">*預期參與組數</div>
                    <div><input v-model="addData.estimatedParticipants" class="input" :min="0" placeholder="請輸入數字"
                            type="number">
                    </div>
                    <div class="item-title">*結束日期</div>
                    <div><input v-model="addData.endTime" class="input" type="date"></div>
                    <div @click="handleAddUser" class="btn-green">確認</div>
                </div>
            </div>
        </div>

        <!-- 編輯資料 -->
        <div v-if="isShowEdit" class="popup">
            <div @click="isShowEdit = false" class="box">
                <div @click.stop class="block-box">
                    <div class="title">編輯任務</div>
                    <div class="item-title">*任務名稱</div>
                    <div><input v-model="current.taskName" class="input" placeholder="請輸入文字" type="text"></div>
                    <div class="item-title">*選擇劇本</div>
                    <div class="select-container">
                        <select v-model="current.scriptId" class="select">
                            <option :value="item.value" v-for="item of scriptOption" :key="item.value">{{ item.text }}
                            </option>
                        </select>
                    </div>
                    <div class="item-title">*學習對象</div>
                    <div class="select-container">
                        <select v-model="current.learning" class="select">
                            <option :value="item.id" v-for="item of learningMap" :key="item.id">{{ item.text }}</option>
                        </select>
                    </div>
                    <div class="item-title">*預期參與組數</div>
                    <div><input v-model="current.estimatedParticipants" class="input" placeholder="請輸入數字" type="number">
                    </div>
                    <div class="item-title">*結束日期</div>
                    <div><input v-model="current.endTime" class="input" type="date"></div>
                    <div @click="save" class="btn-green">確認</div>
                </div>
            </div>
        </div>


        <!-- 刪除資料 -->
        <div v-if="isShowDelete" class="popup">
            <div @click="isShowDelete = false" class="box">
                <div @click.stop class="block-box">
                    <div class="title">刪除提醒</div>
                    <div class="box-hint">帳號刪除後將無法復原，您確認要刪除？</div>
                    <div class="box-row">
                        <div @click="isShowDelete = false" class="box-cancel">取消</div>
                        <div @click="deleteCurrentData" class="box-delete">刪除</div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { getMyTask, edit, add } from "~/api/task";
import { ElMessage } from 'element-plus'
import { getScriptByNoToken as getScript } from "~/api/script";

const checkMission = (taskId) => {
    router.push({ path: `/mission/myMission-${true}-${taskId}` })
}

const allScript = reactive([])
const scriptOption = reactive([])
async function setAllScript() {
    const { data } = await getScript()
    let list = JSON.parse(JSON.stringify(data.value.data))
    list = list.filter(o => o.status !== 2)
    allScript.length = 0
    allScript.push(...list)
    scriptOption.length = 0
    allScript.forEach(res => {
        scriptOption.push({
            text: res.title,
            value: res.scriptId
        })
    })
}


const setHoverImg = (tableId, type, mouse) => {
    let item = allData.filter(o => o.id == tableId)[0]
    if (type == 'edit') {
        item.isEditHove = mouse == 'mouseover'
    } else if (type == 'delete') {
        item.isDeleteHove = mouse == 'mouseover'
    }
}

const learningMap =
    [
        { id: 0, text: '小學 (低年級)' },
        { id: 1, text: '小學 (中年級)' },
        { id: 2, text: '小學 (高年級)' },
        { id: 3, text: '中學 (7年級)' },
        { id: 4, text: '中學 (8年級)' },
        { id: 5, text: '中學 (9年級)' },
    ]


const statusMap = {
    0: '開啟任務',
    1: '進行中',
    2: '完成(包含結束)'
}

const allData = reactive([])
async function init() {
    const { data } = await getMyTask()
    let list = JSON.parse(JSON.stringify(data.value.data.list))
    list = list.filter(o => o.status !== 2)
    list.map((o, index) => {
        o.id = index
        o.isEditHove = false
        o.isDeleteHove = false
        o.learningStr = learningMap.filter(i => i.id == o.learning)[0].text
        o.statusStr = statusMap[o.status]
        o.endTime = o.endTime.split(' ')[0]
    })
    allData.length = 0
    allData.push(...list)
}

nextTick(() => {
    init()
    setAllScript()
})


const getScriptNameById = (id) => {
    if (scriptOption.length > 0) {
        if (scriptOption.filter(o => o.value == id).length > 0) {
            return scriptOption.filter(o => o.value == id)[0].text
        }

    }
    return id
}

const router = useRouter();

const isFirst = ref(false)

const isShowAdd = ref(false)
const isShowEdit = ref(false)
const isShowDelete = ref(false)


const deleteData = ref({})
const current = reactive({})
const dayjs = useDayjs()

const addData = reactive({
    "author": "",
    "createTime": dayjs().format('YYYY-MM-DD HH:mm:ss'),
    "description": "",
    "endTime": "",
    "estimatedParticipants": 0,
    "learning": 0,
    "memberId": 0,
    "priority": 0,
    "scriptId": 0,
    "status": 0,
    "taskName": "",
    'taskId': 0
})

async function handleAddUser() {

    if (addData.taskName === '') {
        ElMessage({
            message: '請輸入任務名稱！',
            type: 'warning',
        })
    } else if (addData.scriptId === '') {
        ElMessage({
            message: '請選擇劇本！',
            type: 'warning',
        })
    } else if (addData.learning === '') {
        ElMessage({
            message: '請選擇學習對象！',
            type: 'warning',
        })
    } else if (addData.estimatedParticipants === '') {
        ElMessage({
            message: '請輸入預期參與組數！',
            type: 'warning',
        })
    } else if (addData.endTime === '') {
        ElMessage({
            message: '請輸入結束日期！',
            type: 'warning',
        })
    } else {
        addData.endTime = dayjs(addData.endTime).format('YYYY-MM-DD HH:mm:ss')
        await add(JSON.parse(JSON.stringify(addData))).catch(() => {
            ElMessage.error('更新失敗')
        }).then((res) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            })
            isShowAdd.value = false

            init()
        })

    }
}

const initAddData = () => {
    addData.author = ""
    addData.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    addData.description = ""
    addData.endTime = ""
    addData.estimatedParticipants = 0
    addData.learning = 0
    addData.memberId = 0
    addData.priority = 0
    addData.scriptId = 0
    addData.status = 0
    addData.taskName = ""
    addData.taskId = 0
}



function handleEdit(row) {
    isShowEdit.value = true
    Object.assign(current, JSON.parse(JSON.stringify(row)))

}

const openAddModal = () => {
    initAddData()
    isShowAdd.value = true
}

async function save() {
    isShowEdit.value = false
    delete current["learningStr"]
    delete current["statusStr"]

    current.endTime = dayjs(current.endTime).format('YYYY-MM-DD HH:mm:ss')
    if (current.taskName === '') {
        ElMessage({
            message: '請輸入任務名稱！',
            type: 'warning',
        })
    } else if (current.scriptId === '') {
        ElMessage({
            message: '請選擇劇本！',
            type: 'warning',
        })
    } else if (current.learning === '') {
        ElMessage({
            message: '請選擇學習對象！',
            type: 'warning',
        })
    } else if (current.estimatedParticipants === '') {
        ElMessage({
            message: '請輸入預期參與組數！',
            type: 'warning',
        })
    } else if (current.endTime === '') {
        ElMessage({
            message: '請輸入結束日期！',
            type: 'warning',
        })
    } else {
        await edit(JSON.parse(JSON.stringify(current.taskId)), JSON.parse(JSON.stringify(current))).then((res) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            })
            init()
        }).catch(() => {
            ElMessage.error('更新失敗')
        })
    }
}

function deleteUser(row) {
    isShowEdit.value = false
    isShowDelete.value = true
    Object.assign(current, JSON.parse(JSON.stringify(row)))
}

async function deleteCurrentData() {
    isShowDelete.value = false
    current.endTime = dayjs(current.endTime).format('YYYY-MM-DD HH:mm:ss')
    current.status = 2
    await edit(current.taskId, current).then((res) => {
        ElMessage({
            message: '刪除成功',
            type: 'success',
        })
        init()
    }).catch(() => {
        ElMessage.error('刪除失敗')
    })

}

</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';

.container {
    width: 80%;
    margin: auto;
    padding: 20px;
}

ol {
    counter-reset: item;
}

.sub-list-item::before {
    content: "●";
}

.sub-list {
    list-style-type: none;
    padding-left: 20px;
}


.information {
    cursor: pointer;
    margin-left: 15px;
}

.manage-center {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-add {
        margin-top: 20px;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 1px;
        padding: 8px 12px;
        width: 130px;
        height: 36px;
        background: #008B77;
        border-radius: 50px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

}
</style>