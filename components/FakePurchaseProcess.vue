<template>
    <div>
        <!-- body -->
        <div class="step-body">
            <div class="step-body-title">*故事封面</div>
            <input type="file" accept=".jpg,.jpeg,.png" ref="fileInput" @change="handleFileUpload" style="display: none;" />
            <img v-if="isPhoto" class="step-body-img" :src="previewImage" alt="">
            <div @click="triggerFileUpload" class="step-body-upload">上傳圖片</div>
            <div v-if="!isPhoto" class="step-body-upload-hint">尺寸建議為 1920 x 300px</div>
            <div class="step-body-title">*故事名稱</div>
            <input v-model="formData.title" class="input step-body-input" placeholder="請輸入名稱" type="text">
            <div class="step-body-title">*故事簡述</div>
            <input v-model="formData.description" class="input step-body-input" placeholder="ex.潛在霸凌者需求：生理需求" type="text">
            <div class="step-body-title">*故事時長 (日)</div>
            <input v-model="formData.scriptPeriod" min="2" class="input step-body-input2" placeholder="請輸入數值" type="number">
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

    </div>
</template>

<script setup>
import { addOne, uploadFileById } from "~/api/script";
import { ElMessage } from 'element-plus'

const emit = defineEmits(['infoDataEmit'])

const dayjs = useDayjs()
const router = useRouter();

const formData = reactive({
    formDataImg: null,
    imgPath:"",
    title: "",
    description: "",
    scriptPeriod: 2,
    goal: [],
    tips: [],
    preamble: []
    // author: "",
    // createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    // description: "",
    // goal: teachingFocus.map(o => o.value),
    // mediaDTO: [],
    // parentConfig: null,
    // preamble: preamble.map(o => o.value),
    // scriptDetail: [],
    // scriptPeriod: scriptDuration.value,
    // status: 0,
    // tips: remindertoTeacher.map(o => o.value),
    // title: "",
    // updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
})

watch(formData, () => {
    emit("infoDataEmit", formData)
}, { deep: true })




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


    if (teachingFocus.length == 1) {
        ElMessage({
            message: '請至少輸入一筆資料！',
            type: 'warning',
        })
    } else {
        if (index !== -1) {
            teachingFocus.splice(index, 1);
        }
    }
}

watch(teachingFocus, (newValue) => {
    formData.goal = newValue.map(o => o.value)
})


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

    if (remindertoTeacher.length == 1) {
        ElMessage({
            message: '請至少輸入一筆資料！',
            type: 'warning',
        })
    } else {
        if (index !== -1) {
            remindertoTeacher.splice(index, 1);
        }
    }
}

watch(remindertoTeacher, (newValue) => {
    formData.tips = newValue.map(o => o.value)
})

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


    if (preamble.length == 1) {
        ElMessage({
            message: '請至少輸入一筆資料！',
            type: 'warning',
        })
    } else {
        if (index !== -1) {
            preamble.splice(index, 1);
        }
    }
}

watch(preamble, (newValue) => {
    formData.preamble = newValue.map(o => o.value)
})

const fileInput = ref(null);
const triggerFileUpload = () => {
    fileInput.value.click();
};


const previewImage = ref('');
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const validTypes = ['image/jpeg', 'image/png'];

    if (validTypes.includes(file.type)) {
        const imgFormData = new FormData();
        imgFormData.append('file', file)
        imgFormData.append('description', 'cover')
        formData.formDataImg = imgFormData
        formData.imgData = URL.createObjectURL(file);
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
</style>




<!-- <template>
    <NuxtLayout name="custom">
        <div class="box">
            <div class="display-area">
                <div class="left">
                    <div class="step-box step1">
                        <div class="title">
                            <div class="number">1</div>
                            <div class="title-text">購買人資料</div>
                        </div>
                        <div class="content-box">
                            <div class="warn-box">
                                <div class="warn-title-box">
                                    <img class="warn-icon" src="~assets/images/Icon/notice.svg" alt="">
                                    <div class="warn-title">注意</div>
                                </div>
                                <div class="warn-text">購買資料設定後，將無法再進行變更，請確認您所填的資料。</div>
                            </div>
                            <div class="item-title">*購買人姓名</div>
                            <div><input v-model="payData.recipient" class="input" placeholder="請輸入姓名"
                                    style="margin-bottom: 10px;"></div>
                            <div class="item-title">*購買人Email</div>
                            <div><input v-model="payData.email" class="input" placeholder="請輸入Email" type="email"></div>

                        </div>
                    </div>
                    <div class="step-box">
                        <div class="title">
                            <div class="number">2</div>
                            <div class="title-text">購買內容</div>
                        </div>
                        <div class="content-box">
                            <div v-for="item of productDataList" class="item-box">
                                <div class="item-name">{{ item.name }}</div>
                                <div class="price-box">
                                    <div class="price">${{item.price}}</div>
                                    <div class="original-price">$1,500</div>
                                </div>

                            </div>
                            
                            <div class="item-title">購買份數</div>
                            <div><input v-model="payData.quantity" class="input" min="1"
                                    style="margin-bottom: 10px; width:100px" type="number">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div v-for="item of productDataList" class="order-box">
                        <div class="title">訂單資訊</div>
                        <div class="item" style="margin-bottom:8px;">
                            <div class="item-name">註冊碼售價</div>
                            <div class="price">${{ currentPeriod }}</div>
                        </div>
                        <div class="item">
                            <div class="item-name">購買份數</div>
                            <div class="price">{{payData.quantity}}</div>
                        </div>
                        <div class="gap"></div>
                        <div class="total">
                            <div class="item-name">訂單總額</div>
                            <div class="price">{{payData.quantity * currentPeriod}}</div>
                        </div>
                    </div>
                    <div class="btn-box">
                        <div class="pay-btn" @click="pay">進行付款</div>
                        <nuxt-link class="cancel" to="/">取消</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
    <form action="https://ccore.newebpay.com/MPG/mpg_gateway" style="display: none;" method="post">
        <label for="MerchantID">Merchant ID:</label>
        <input type="text" id="MerchantID" name="MerchantID" v-model="formData.merchantID"><br><br>

        <label for="TradeInfo">Trade Info:</label>
        <input type="text" id="TradeInfo" name="TradeInfo" v-model="formData.tradeInfo"><br><br>

        <label for="TradeSha">Trade Sha:</label>
        <input type="text" id="TradeSha" name="TradeSha" v-model="formData.tradeSha"><br><br>

        <label for="Version">Version:</label>
        <input type="text" id="Version" name="Version" v-model="formData.version"><br><br>

        <input type="submit" ref="submitButton" value="Submit" />
    </form>
</template>

<script setup>
import { order,getProducts } from "~/api/cash";
import { ElMessage } from 'element-plus'

const productDataList = reactive([])
const currentPeriod = ref(0)
const init = async () => {
    let products = await getProducts()
    let productList = JSON.parse(JSON.stringify(products.data.value.data.list)) 
    productDataList.push(...productList)
    currentPeriod.value = productDataList[0].price
    
}

nextTick(() => {
    init()
})

// 創建一個引用
const submitButton = ref(null);

// 觸發點擊的函數
const triggerClick = () => {
    if (submitButton.value) {
        submitButton.value.click(); // 觸發點擊事件
    }
};

const formData = reactive({
    merchantID: "",
    tradeInfo: "",
    tradeSha: "",
    version: "",
})

const payData = reactive({
    recipient: "",
    email: "",
    quantity: 1
})

const checkPayData = () => {
    if (payData.recipient == "") {
        ElMessage({
            message: '請輸入購買人姓名！',
            type: 'warning',
        })
        return false
    } else if (payData.email == "") {
        ElMessage({
            message: '請輸入購買人Email！',
            type: 'warning',
        })
        return false
    }

    return true
}

const pay = async () => {
    if (checkPayData()) {
        let request = {
            "address": "XXXXXX",
            "phone": "",
            "email": payData.email,
            "products": [
                {
                    "productId": "1",
                    "quantity": payData.quantity
                }
            ],
            "recipient": payData.recipient
        }
        let orderResponse = await order(request)
        let data = orderResponse.data.value.data
        formData.merchantID = data.merchantID_
        formData.tradeInfo = data.tradeInfo
        formData.tradeSha = data.tradeSha
        formData.version = data.version

        nextTick(() => {
            triggerClick()
        })
    }
}

</script>

<style lang="scss" scoped>
@import '~/assets/styles/form.scss';

.box {
    width: 100%;
    min-height: 100vh;
    background-color: $background2;
    display: flex;
    justify-content: center;
    padding-bottom: 159px;


    .display-area {
        display: flex;
        margin-top: 32px;

        @include respond-to('phone') {
            flex-direction: column;
            align-items: center;
        }

        .left {
            width: 90%;

            @include respond-to('phone') {
                margin-bottom: 24px;
            }

            .step1 {
                margin-bottom: 24px;

                @include respond-to('phone') {
                    margin-bottom: 24px;
                }
            }

            .step-box {

                .title {
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;

                    .number {
                        height: 32px;
                        width: 32px;
                        border-radius: 50%;
                        background-color: $primary1;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 14px;
                        font-family: Noto Sans TC;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 20px;
                        margin-right: 8px;
                    }

                    .title-text {
                        color: $primary1;
                        font-size: 20px;
                        font-family: Noto Sans TC;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 20px;
                    }


                }

                .content-box {
                    width: 574px;
                    padding: 32px;
                    background-color: #fff;
                    border-radius: 12px;
                    border: 1px solid $border3;

                    @include respond-to('phone') {
                        width: 100%;
                    }

                    .warn-box {
                        width: 100%;
                        border-radius: 12px;
                        border: 1px solid $border2;
                        padding: 12px;
                        margin-bottom: 10px;

                        .warn-title-box {
                            display: flex;
                            align-items: center;
                            margin-bottom: 4px;

                            .warn-icon {
                                width: 18px;
                                height: 18px;
                            }
                        }

                        .warn-text {
                            color: $text2;
                            font-size: 14px;
                            font-family: Noto Sans TC;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 20px;
                            letter-spacing: 0.5px;
                        }
                    }

                    .item-box {
                        border-radius: 8px;
                        border: 1px solid $primary1;
                        padding: 24px 16px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;

                        .item-name {
                            color: $text1;
                            font-size: 16px;
                            font-family: Noto Sans TC;
                            font-style: normal;
                            font-weight: 500;
                        }

                        .price-box {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                        }

                        .price {
                            color: $text2;
                            font-size: 24px;
                            font-family: Noto Sans TC;
                            font-style: normal;
                            font-weight: 500;
                        }

                        .original-price {
                            color: #999;
                            font-family: Noto Sans TC;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: 20px;
                            letter-spacing: 0.5px;
                            text-decoration-line: line-through;
                        }
                    }

                }
            }
        }

        .right {
            width: 90%;
            margin-left: 16px;

            @include respond-to('phone') {
                margin-left: 0;
            }

            .order-box {
                width: 339px;
                padding: 32px;
                background: #fff;
                border-radius: 12px;
                border: 1px solid $primary1;
                margin-bottom: 34px;

                @include respond-to('phone') {
                    width: 100%;
                }


                .title {
                    color: $text1;
                    font-size: 20px;
                    font-family: Noto Sans TC;
                    font-style: normal;
                    font-weight: 500;
                    margin-bottom: 24px;
                }

                .item {
                    display: flex;
                    justify-content: space-between;

                    .item-name {
                        color: $text3;
                        font-size: 14px;
                        font-family: Noto Sans TC;
                        font-style: normal;
                        font-weight: 500;
                    }

                    .price {
                        color: $text2;
                        font-size: 14px;
                        font-family: Noto Sans TC;
                        font-style: normal;
                        font-weight: 500;
                    }
                }

                .gap {
                    width: 100%;
                    height: 1px;
                    border: 1px solid $border1;
                    margin: 24px 0;
                }

                .total {
                    display: flex;
                    justify-content: space-between;

                    .item-name {
                        color: $text1;
                        font-size: 14px;
                        font-family: Noto Sans TC;
                        font-style: normal;
                        font-weight: 500;
                    }

                    .price {
                        color: $primary1;
                        font-size: 16px;
                        font-family: Noto Sans TC;
                        font-style: normal;
                        font-weight: 500;
                    }

                }
            }

            .btn-box {
                display: flex;
                justify-content: space-between;

                .pay-btn {
                    height: 44px;
                    width: 49%;
                    border-radius: 50px;
                    background: $primary1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                    font-family: Noto Sans TC;
                    font-style: normal;
                    font-weight: 700;
                    color: #fff;
                    cursor: pointer;
                }

                .cancel {
                    height: 44px;
                    width: 49%;
                    border-radius: 50px;
                    border: 1px solid $primary1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 44px;
                    font-size: 16px;
                    font-family: Noto Sans TC;
                    font-style: normal;
                    font-weight: 700;
                    color: $primary1;
                    cursor: pointer;
                }
            }
        }
    }
}
</style> -->