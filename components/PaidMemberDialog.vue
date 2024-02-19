<template>
    <client-only>
        <div class="dialog-box">
            <el-dialog v-model="props.modelValue" :before-close="handleClose">
                <template #header>
                    <div class="title">成為付費會員</div>
                </template>
                <div class="content-box">
                    <div class="item-box">
                        <div class="item-title">為什麼要成為付費會員?</div>
                        <div class="item-text">網站上的劇本教材僅提供給付費會員，註冊時登入一組註冊碼就可以使用網站所有開放的劇本遊戲。</div>
                    </div>
                    <div class="item-box">
                        <div class="item-title">註冊碼是什麼?</div>
                        <div class="item-text">每組帳號都必須使用一組註冊碼才可以成功啟用。</div>
                    </div>
                    <div class="item-box">
                        <div class="item-title">註冊碼如何獲得?</div>
                        <div class="item-text">註冊碼目前需要進行一次性付費才可獲得。付費後並且系統經過確認後，將主動寄送註冊碼至您的收取信箱。</div>
                    </div>
                    <div class="item-box">
                        <div class="item-title">註冊碼的費用？</div>
                        <div class="item-text">原價 $1,500，現有教育推廣價 $1,350。</div>
                    </div>
                </div>
                <nuxt-link to="https://forms.gle/539SzTyCjuFXrTmN8" class="btn">
                    購買註冊碼
                </nuxt-link>
            </el-dialog>
        </div>
    </client-only>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
    emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.dialog-box:deep(.el-dialog) {
    width: 480px;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 4px 16px rgba(21, 21, 21, 0.3);
    border: 1px solid $border3;

    @include respond-to('phone') {
        width: 90%;
    }

    .el-dialog__body {
        padding: 0;
    }

    .title {
        color: $text1;
        text-align: center;
        font-size: 24px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 700;
        line-height: 30px;
        letter-spacing: 1.5px;
    }

    .content-box {
        width: 100%;
        padding: 32px 0;

        .item-box {
            .item-title {
                margin-bottom: 8px;
                color: $text1;
                font-size: 16px;
                font-family: Noto Sans TC;
                font-style: normal;
                font-weight: 500;
                line-height: 22px;
                letter-spacing: 0.5px;
            }

            .item-text {
                color: $text2;
                font-size: 16px;
                font-family: Noto Sans TC;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
                letter-spacing: 0.5px;
            }
        }

        .item-box:not(:last-child) {
            margin-bottom: 16px;
        }
    }

    .btn {
        width: 100%;
        height: 44px;
        border-radius: 50px;
        background: $primary1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        cursor: pointer;
    }

}
</style>