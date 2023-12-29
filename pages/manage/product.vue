<template>
    <NuxtLayout name="custom">
        <div class="manage">
            <div class="manage-between">
                <div class="manage-head">商品管理</div>
                <div class="manage-row">
                    <!-- <div class="manage-num">項目數量：10</div> -->
                    <!-- <div @click="isShowAdd = true" class="manage-create">+ 新增商品</div> -->
                </div>

            </div>

            <div class="Mtable">
                <el-table :data="products" style="width: 100%" empty-text="暫無數據">
                    <el-table-column prop="name" label="商品名稱" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="price" label="價格" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="quantity" label="數量" sortable min-width="160">
                    </el-table-column>
                    <el-table-column label="操作" sortable min-width="260">
                        <template #default="scope">
                            <div class="Mtable-row">
                                <div class="Mtable-icon-outer" @click="editProductClick(scope.row.productId)"
                                    @mouseover="setHoverImg(scope.row.id, 'edit', 'mouseover')"
                                    @mouseleave="setHoverImg(scope.row.id, 'edit', 'mouseleave')">
                                    <img v-if="scope.row.isEditHove" class="Mtable-icon"
                                        src="@/assets/images/Icon/edit_hover.svg" alt="close">
                                    <img v-else class="Mtable-icon" src="@/assets/images/Icon/edit.svg" alt="close">
                                </div>
                                <div class="Mtable-icon-outer" @click="deleteProductClick(scope.row.productId)"
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
                        <div class="title">新增商品</div>
                        <div class="item-title">*商品名稱</div>
                        <div><input v-model="addData.name" class="input" placeholder="請輸入商品名稱" type="text"></div>
                        <div class="item-title">商品價格</div>
                        <div><input v-model="addData.price" :min="0" class="input" placeholder="請輸入商品價格" type="number">
                        </div>
                        <div class="item-title">商品數量</div>
                        <div><input v-model="addData.quantity" :min="0" class="input" placeholder="請輸入商品數量" type="number">
                        </div>
                        <div @click="hendelAdd" class="btn-green">儲存</div>
                    </div>
                </div>
            </div>

            <!-- 編輯資料 -->
            <div v-if="isShowEdit" class="popup">
                <div @click="isShowEdit = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">新增商品</div>
                        <div class="item-title">*商品名稱</div>
                        <div><input v-model="editData.name" class="input" placeholder="請輸入商品名稱" type="text"></div>
                        <div class="item-title">商品價格</div>
                        <div><input v-model="editData.price" :min="0" class="input" placeholder="請輸入商品價格" type="number">
                        </div>
                        <div class="item-title">商品數量</div>
                        <div><input v-model="editData.quantity" :min="0" class="input" placeholder="請輸入商品數量" type="number">
                        </div>
                        <div @click="hendelEditProduct" class="btn-green">編輯</div>
                    </div>
                </div>
            </div>


            <!-- 刪除資料 -->
            <div v-if="isShowDelete" class="popup">
                <div @click="isShowDelete = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">刪除提醒</div>
                        <div class="box-hint">商品刪除後將無法復原，您確認要刪除？</div>
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
import { getProducts, addProduct, editProduct, deleteProduct } from "~/api/cash"
import { ElMessage } from 'element-plus'

const isShowAdd = ref(false)

const init = async () => {
    await setProducts()
}

const products = reactive([])
const setProducts = async () => {
    let response = await getProducts()
    let list = response.data.value.data.list
    list.map((o, index) => {
        o.id = index
        o.isDeleteHove = false
        o.isEditHove = false
    })
    products.length = 0
    products.push(...list)
}

const addData = reactive({
    "name": "",
    "price": 0,
    "quantity": 0
})
const hendelAdd = async () => {
    if (addData.name !== "") {
        await addProduct(JSON.parse(JSON.stringify(addData)))
        ElMessage({
            message: '新增成功',
            type: 'success',
        })
        await init()
        isShowAdd.value = false
        addData.name = ""
        addData.price = 0
        addData.quantity = 0
    } else {
        ElMessage.warning("請輸入商品名稱")
    }


}

const isShowEdit = ref(false)
const editData = reactive({
    "name": "",
    "price": 0,
    "quantity": 0
})
const editId = ref("")
const editProductClick = async (productId) => {
    let product = products.filter(o => o.productId == productId)[0]
    editId.value = productId
    editData.name = product.name
    editData.price = product.price
    editData.quantity = product.quantity
    isShowEdit.value = true
}

const hendelEditProduct = async () => {
    if (editData.name !== "") {
        await editProduct(JSON.parse(JSON.stringify(editId.value)), JSON.parse(JSON.stringify(editData)))
        ElMessage({
            message: '更改成功',
            type: 'success',
        })
        await init()
        isShowEdit.value = false
    } else {
        ElMessage.warning("請輸入商品名稱")
    }
}

const isShowDelete = ref(false)
const deleteId = ref("")
const deleteProductClick = (productId) => {
    deleteId.value = productId
    isShowDelete.value = true
}
const deleteCurrentData = async () => {
    await deleteProduct(JSON.parse(JSON.stringify(deleteId.value)))
    ElMessage({
        message: '刪除成功',
        type: 'success',
    })
    isShowDelete.value = false
    await init()
}


nextTick(() => {
    init()
})

const setHoverImg = (tableId, type, mouse) => {
    let item = products.filter(o => o.id == tableId)[0]
    if (type == 'edit') {
        item.isEditHove = mouse == 'mouseover'
    } else if (type == 'delete') {
        item.isDeleteHove = mouse == 'mouseover'
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';

.box {}</style>