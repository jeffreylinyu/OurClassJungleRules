<template>
    <NuxtLayout name="default">
        <div class="box">
            <div class="title">常見問題</div>
            <div class="collapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="一、這份教材包含哪些內容？" name="1">
                        <div>
                            1. 這份教材包含 4 個長度不等的故事，用來探討 4 種不同的潛在霸凌情境及霸凌者需求。
                        </div>
                        <div>
                            2. 每則故事都含有影片、教學簡報、學習單以及線上計分系統供老師使用。
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="二、不同故事需要分開購買嗎？" name="2">
                        <div>
                            1. 目前僅須購買 1 次註冊碼，即可使用網站上全部 4 個故事的內容。
                        </div>
                        <div>
                            2. 若往後推出新故事會依情況再考慮是否加收費用。
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="三、如何退費？" name="3">
                        <div>
                            1. 未使用註冊碼前申請，可全額退費。
                        </div>
                        <div>
                            2. 使用註冊碼後的 7 日內申請，可全額退費。
                        </div>
                        <div>
                            3. 使用註冊碼後超過 8 日（含）申請，恕不退費。
                        </div>
                        <div>
                            4. 若需要退費，請來信阿普蛙官方信箱 wasupstudio@gmail.com，並於標題註明「反霸凌教材退費申請」，將有專人為您處理。
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const activeNames = ref(['1', '2', '3'])
const handleChange = (val) => {
    console.log(val)
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    height: 616px;
    width: 100%;
    background-color: $background1;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .title {
        margin-bottom: 32px;
        font-weight: 700;
        font-size: 32px;
        letter-spacing: 1.5px;
        color: $text1;
        display: flex;
        justify-content: center;
    }

    .collapse {
        width: 60%;
        background-color: $background1;
        font-size: 22px;
    }

    .collapse :deep(.el-collapse-item__header),
    .collapse :deep(.el-collapse-item__content) {
        background-color: $background1;
        font-size: 16px;
    }

}</style>