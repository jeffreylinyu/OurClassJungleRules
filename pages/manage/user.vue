<template>
    <NuxtLayout name="custom">
        <div class="manage">
            <div class="manage-between">
                <div class="manage-head">使用者管理</div>
            </div>

            <div class="Mtable">
                <el-table :data="allData" @row-click="editUser" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="email" label="帳號" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" sortable min-width="160">
                    </el-table-column>
                    <el-table-column label="性別" sortable min-width="160">
                        <template #default="scope">
                            {{ genderMap[scope.row.gender] }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="birthday" label="生日" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="organization" label="機構" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="category" label="機構類別" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="registionTime" label="註冊時間" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="status" label="帳號狀態" sortable min-width="160">
                        <template #default="scope">
                            <div v-if="scope.row.status == '0'" style="color: gray;">未啟用</div>
                            <div v-if="scope.row.status == '1'" style="color: green;">啟用</div>
                            <div v-if="scope.row.status == '2'" style="color: red;">停用</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" sortable min-width="260">
                        <template #default="scope">
                            <div class="Mtable-row">
                                <div class="Mtable-icon-outer" @click="editUser(scope.row.id)"
                                    @mouseover="setHoverImg(scope.row.id, 'edit', 'mouseover')"
                                    @mouseleave="setHoverImg(scope.row.id, 'edit', 'mouseleave')">
                                    <img v-if="scope.row.isEditHove" class="Mtable-icon"
                                        src="@/assets/images/Icon/edit_hover.svg" alt="close">
                                    <img v-else class="Mtable-icon" src="@/assets/images/Icon/edit.svg" alt="close">
                                </div>
                                <div class="Mtable-icon-outer" @click="deleteUser(scope.row.id)"
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

            <!-- 新增資料 -->
            <div v-if="isShowAdd" class="popup">
                <div @click="isShowAdd = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">新增資料</div>
                        <div class="item-title">*帳號</div>
                        <div><input class="input" placeholder="請輸入姓名" type="text"></div>
                        <div class="item-title">*性別</div>
                        <div class="radio-box">
                            <div class="radio-item">
                                <input class="radio-point" type="radio" id="male" name="drone" value="male" checked>
                                <label for="male">男性</label>
                            </div>

                            <div class="radio-item">
                                <input class="radio-point" type="radio" id="female" name="drone" value="female">
                                <label for="female">女性</label>
                            </div>

                            <div class="radio-item">
                                <input class="radio-point" type="radio" id="intersex" name="drone" value="intersex">
                                <label for="intersex">中性</label>
                            </div>
                        </div>
                        <div class="item-title">*生日</div>
                        <div><input class="input" type="date"></div>
                        <div class="item-title">機構</div>
                        <div><input class="input" placeholder="請輸入機構名稱" type="text"></div>
                        <div class="item-title">機構類別</div>
                        <div class="select-container">
                            <select class="select">
                                <option value="">請選擇</option>
                                <option value="學校">學校</option>
                                <option value="補習班">補習班</option>
                                <option value="政府機關">政府機關</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div class="btn-green">儲存</div>
                    </div>
                </div>
            </div>

            <!-- 編輯資料 -->
            <div v-if="isShowEdit" class="popup">
                <div @click="isShowEdit = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">編輯資料</div>
                        <div class="item-title">*帳號</div>
                        <div><input v-model="currentUser.email" class="input" placeholder="請輸入姓名" type="text"></div>
                        <div class="item-title">*性別</div>
                        <div class="radio-box">
                            <div class="radio-item">
                                <input v-model="currentUser.gender" class="radio-point" type="radio" id="male" name="drone"
                                    :value="1" checked>
                                <label for="male">男性</label>
                            </div>

                            <div class="radio-item">
                                <input v-model="currentUser.gender" class="radio-point" type="radio" id="female"
                                    name="drone" :value="0">
                                <label for="female">女性</label>
                            </div>

                            <div class="radio-item">
                                <input v-model="currentUser.gender" class="radio-point" type="radio" id="intersex"
                                    name="drone" :value="2">
                                <label for="intersex">中性</label>
                            </div>
                        </div>
                        <div class="item-title">*生日</div>
                        <div><input v-model="currentUser.birthday" class="input" type="date"></div>
                        <div class="item-title">機構</div>
                        <div><input v-model="currentUser.organization" class="input" placeholder="請輸入機構名稱" type="text">
                        </div>
                        <div class="item-title">機構類別</div>
                        <div class="select-container">
                            <select v-model="currentUser.category" class="select">
                                <option value="">請選擇</option>
                                <option value="學校">學校</option>
                                <option value="補習班">補習班</option>
                                <option value="政府機關">政府機關</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div class="item-title">帳號狀態</div>
                        <div class="radio-box">
                            <el-radio-group v-model="currentUser.status">
                                <el-radio :label="0" disabled size="large">未啟用</el-radio>
                                <el-radio :label="1" size="large">啟用</el-radio>
                                <el-radio :label="2" size="large">停用</el-radio>
                            </el-radio-group>
                           
                        </div>
                        <div @click="saveChanges" class="btn-green">儲存</div>
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

        </div>
    </NuxtLayout>
</template>

<script setup>
import { getAll, editInfoById } from "~/api/member"
import { ElMessage } from 'element-plus'

let allData = reactive([])
async function init() {
    allData.length = 0
    let { data: apiAllData } = await getAll();
    let list = apiAllData.value.data.list
    // list = list.filter(o => o.status != 2)
    list.map((o, index) => {
        //o.id = index
        o.isEditHove = false
        o.isDeleteHove = false
    })
    allData.push(...list)
    allData.map(o => o.birthday = o.birthday ? o.birthday.split(' ')[0] : "")
    console.log("allData", allData)
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
const genderMap = {
    0: '女',
    1: '男',
    2: '中性'
}

const isShowAdd = ref(false)
const isShowEdit = ref(false)
const isShowDelete = ref(false)

const dayjs = useDayjs()

const currentUser = reactive({})
function editUser(id) {
    let filterUser = allData.filter(o => o.id == id)[0]
    filterUser.birthday = filterUser.birthday ? filterUser.birthday.split(' ')[0] : ""
    Object.assign(currentUser, filterUser)
    console.log("currentUser", currentUser)
    isShowEdit.value = true
}

function saveChanges() {
    console.log("saveChanges", currentUser)
    currentUser.birthday = dayjs(currentUser.birthday).format('YYYY-MM-DD HH:mm:ss')
    editInfoById(currentUser.id, currentUser).then((res) => {
        ElMessage({
            message: res.data.value.data,
            type: 'success',
        })
        init()
        isShowEdit.value = false
    })
        .catch(() => {
            ElMessage.error('儲存失敗')
        })

}

function deleteUser(id) {
    isShowEdit.value = false
    isShowDelete.value = true
    let filterUser = allData.filter(o => o.id == id)[0]
    Object.assign(currentUser, filterUser)
}

function deleteCurrentData() {
    isShowDelete.value = false
    currentUser.status = 2
    currentUser.birthday = dayjs(currentUser.birthday).format('YYYY-MM-DD HH:mm:ss')
    editInfoById(currentUser.id, currentUser).then((res) => {
        ElMessage({
            message: '刪除成功',
            type: 'success',
        })
        init()
    })
        .catch(() => {
            ElMessage.error('刪除失敗')
        })
}

</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';

.box {}
</style>