<template>
    <NuxtLayout name="custom">
        <div class="manage">
            <div class="manage-between">
                <div class="manage-head">購買資訊</div>
            </div>

            <div class="Mtable">
                <el-table :data="allData" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="licenseKey" label="註冊碼" sortable min-width="160">
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
async function init() {
    allData.length = 0
    const { data } = await getOrder({})
    let list = data.value.data.list
    allData.push(...list)
   console.log("allData",allData)
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

.box {}
</style>