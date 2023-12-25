<template>
    <NuxtLayout name="custom">
        <div class="manage">
            <div class="manage-between">
                <div class="manage-head">購買資訊</div>

            </div>
            <div class="search-box">
                <div>
                    <span>ID</span>
                    <el-input v-model="searchData.orderId" placeholder="請輸入ID" />
                </div>
                <div>
                    <span>電話</span>
                    <el-input v-model="searchData.phone" placeholder="請輸入電話" />
                </div>
                <div>
                    <span>名稱</span>
                    <el-input v-model="searchData.recipient" placeholder="請輸入名稱" />
                </div>
                <div>
                    <span>最小金額</span>
                    <el-input v-model="searchData.minPrice" placeholder="請輸入金額" />
                </div>
                <div>
                    <span>最大金額</span>
                    <el-input v-model="searchData.maxPrice" placeholder="請輸入金額" />
                </div>
                <div>
                    <span>email</span>
                    <el-input v-model="searchData.address" placeholder="請輸入email" />
                </div>
                <el-button @click="init" type="primary">搜尋</el-button>
            </div>
            <div class="Mtable">
                <el-table :data="allData" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="orderId" label="ID" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="phone" label="電話" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="recipient" label="購買人名稱" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="totalPrice" label="金額" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="address" label="email" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="createTime" label="購買時間" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="status" label="購買狀態" sortable min-width="160">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { getOrder } from "~/api/cash"
import { ElMessage } from 'element-plus'

const allData = reactive([])
const searchData = reactive({
    orderId:"",
    phone:"",
    recipient:"",
    minPrice:"",
    maxPrice:"",
    address:"",
    status:""
})

async function init() {
    allData.length = 0
    const { data } = await getOrder(JSON.parse(JSON.stringify(searchData)) )
    let list = data.value.data.list

    // 映射狀態碼到中文描述
    const statusMapping = {
        0: '付款成功',
        1: '未付款',
        2: '付款失敗'
        // 添加其他可能的狀態碼
    };
        // 將狀態碼轉換成中文描述
    const mappedList = list.map(item => ({
        ...item,
        status: statusMapping[item.status] || '未知狀態'
    }));

    console.log(mappedList);
    allData.push(...mappedList);
    console.log("allData", allData);
}

nextTick(() => {
    init()
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';

.search-box {
    align-items: flex-end;
    display: flex;
}

.search-box>div {
    margin-right: 10px;
}
</style>