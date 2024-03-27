<template>
    <NuxtLayout name="custom">
        <div v-if="isFirst" class="manage">
            <div class="manage-between">
                <div class="manage-head">任務總覽</div>
                <div class="manage-row"></div>

            </div>
            <div class="manage-center">
                <div>尚無任何任務</div>
            </div>
        </div>
        <div v-else class="manage">
            <div class="manage-between">
                <div class="manage-head">任務總覽</div>
                <div class="manage-row">
                    <div class="manage-num">項目數量：{{ allData.length }}</div>
                </div>

            </div>

            <div class="Mtable">
                <el-table :data="allData" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="taskName" label="任務名稱" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="script" label="故事" sortable min-width="160">
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
                                <div @click.stop="checkMission(scope.row.taskId)" class="Mtable-look">查看 <img 
                                        src="@/assets/images/Icon/arrow-right.svg">
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { getMyTask } from "~/api/task";
import { getScript } from "~/api/script";

const checkMission = (taskId) => {
    router.push({ path: `/mission/myMission-${false}-${taskId}` })
}

const isFirst = ref(false)
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

const allScript = reactive([])
const scriptOption = reactive([])
async function setAllScript() {
    const { data } = await getScript()
    let list = JSON.parse(JSON.stringify(data.value.data.list))
    // list = list.filter(o => o.status !== 0)
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


const getScriptNameById = (id) => {
    if (scriptOption.length > 0){
        if(scriptOption.filter(o => o.value == id).length > 0){
            return scriptOption.filter(o => o.value == id)[0].text
        }
        
    }
    return id
}

const allData = reactive([])
async function init() {
    const { data } = await getMyTask()
    let list = JSON.parse(JSON.stringify(data.value.data.list))
    list = list.filter(o => o.status !== 2)
    list.map((o) => {
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

const router = useRouter();



</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';
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