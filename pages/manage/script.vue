<template>
    <NuxtLayout name="custom">
        <div class="manage">
            <div class="manage-between">
                <div class="manage-head">故事教材管理</div>
                <div class="manage-row">
                    <div class="manage-num">項目數量：{{ allData.length }}</div>
                    <nuxt-link to="/manage/buildScript" class="manage-create">+ 建立故事教材</nuxt-link>
                </div>

            </div>

            <div class="Mtable">
                <el-table :data="allData" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="title" label="故事名稱" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="scriptPeriod" label="故事時長" sortable min-width="160">
                        <template #default="scope">
                            {{ scope.row.scriptPeriod }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="statusStr" label="啟用狀態" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="createTime" label="建立日期" sortable min-width="160">
                    </el-table-column>
                    <el-table-column label="操作" sortable min-width="260">
                        <template #default="scope">
                            <div class="Mtable-row">
                                <div @click.stop="editUser(scope.row)" class="Mtable-look">查看 -></div>
                                <div class="Mtable-icon-outer" @click="deleteScript(scope.row)" @mouseover="setHoverImg(scope.row.id,'delete','mouseover')"
                                    @mouseleave="setHoverImg(scope.row.id,'delete','mouseleave')">
                                    <img v-if="scope.row.isDeleteHove" class="Mtable-icon"
                                        src="@/assets/images/Icon/delete_hover.svg" alt="close">
                                    <img v-else class="Mtable-icon" src="@/assets/images/Icon/delete.svg" alt="close">
                                 </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>


            <!-- 刪除資料 -->
            <div v-if="isShowDelete" class="popup">
                <div @click="isShowDelete = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">刪除提醒</div>
                        <div class="box-hint">故事刪除後將無法復原，您確認要刪除？</div>
                        <div class="box-row">
                            <div @click="isShowDelete = false" class="box-cancel">取消</div>
                            <div @click="deleteCurrentData" class="box-delete">刪除</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup>
import { getScript,editScriptById } from "~/api/script";

const statusMap = {
    0: '進行中',
    1: '已結束'
}

const allData = reactive([])
async function init() {
    const { data } = await getScript()
    let list = JSON.parse(JSON.stringify(data.value.data.list))
    list = list.filter(o => o.status !== 2)
    list.map((o,index) => {
        o.statusStr = statusMap[o.status]
        o.id = index
        o.isDeleteHove=false
    })
    allData.length = 0
    allData.push(...list)
}

const setHoverImg = (tableId, type, mouse) => {
    let item = allData.filter(o => o.id == tableId)[0]
    if (type == 'edit') {
        item.isEditHove = mouse == 'mouseover'
    } else if (type == 'delete') {
        item.isDeleteHove = mouse == 'mouseover'
    }
}

nextTick(() => {
    init()
})

const router = useRouter();

const isShowDelete = ref(false)

const editData = ref({})
const deleteData = ref({})

function editUser(row) {
    router.push({ path: `/manage/scriptSetting-${row.scriptId}` })
}

function deleteScript(row) {
    isShowDelete.value = true
    deleteData.value = row
}

const deleteCurrentData = async() => {
    deleteData.value.status = 2
    await editScriptById(deleteData.value.scriptId,deleteData.value)
    isShowDelete.value = false
    await init()
}

</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';

.box {}
</style>