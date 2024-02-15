<template>
    <NuxtLayout name="default">
        <div class="box">
            <div class="bg-box"></div>
            <div class="bottom-box"></div>
            <div class="content-box">
                <div class="title">聯絡阿普蛙</div>
                <div class="block-box">
                    <div class="text">若對本教材有任何疑問或指教，都歡迎與我們聯繫。我們也有提供其他課程及教材，若有興趣也歡迎來信，我們會再跟您聯絡。</div>
                    <div class="item-title">*姓名</div>
                    <div class="name-item">
                        <input class="input" placeholder="名字" type="text">
                        <input class="input" placeholder="姓氏" type="text">
                    </div>
                    <div class="item-title">*Email</div>
                    <div><input class="input" placeholder="Email" type="text"></div>
                    <div class="item-title">*想說的話</div>
                    <div>
                        <textarea v-model="body" class="textarea" placeholder="請輸入文字"></textarea>
                    </div>
                    <div class="check-box"><input v-model="checkbox" class="checkbox"
                            type="checkbox">我同意接收營銷和宣傳材料</div>
                    <div class="submit" @click="submit" :href="`mailto:showeryu18@gmail.com?&body=${body}`">提交</div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
// const subject = ref('')
const checkbox = ref(false)
const body = ref('')
body.value = ''

const submit = () => {
    let link = document.createElement("a");
    let submitBody = body.value; 
    if(checkbox.value){
        submitBody += " 我同意接收營銷和宣傳材料"
    }
    let email = "wasupstudio@gmail.com";
    
    let hrefValue = `mailto:${email}?&body=${encodeURIComponent(submitBody)}`;
    link.setAttribute("href", hrefValue);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
</script>

<style lang="scss" scoped>
.box {
    position: relative;

    .content-box {
        padding-top: 80px;
        width: 100%;
        height: 825px;
        position: absolute;
        top: 0;
        left: 0;

        .title {
            margin-bottom: 32px;
            font-weight: 700;
            font-size: 32px;
            letter-spacing: 1.5px;
            color: $text1;
            display: flex;
            justify-content: center;
        }

        .block-box {
            width: 456px;
            background-color: $secondary2;
            box-shadow: 0px 4px 16px rgba(21, 21, 21, 0.3);
            border-radius: 32px;
            padding: 32px;
            align-self: flex-start;
            margin: auto;
            margin-bottom: 32px;

            @include respond-to('phone') {
                width: 90%;
            }

            .text {
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.5px;
                color: $text2;
                margin-bottom: 16px;
            }

            .item-title {
                font-weight: 500;
                font-size: 14px;
                letter-spacing: 1px;
                color: $text1;
                margin-bottom: 8px;
            }

            .name-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;

                @include respond-to('phone') {
                    flex-direction: column;
                }

                .input {
                    width: 192px;
                    height: 36px;
                    border: 1px solid $border1;
                    border-radius: 8px;
                    background: $background2;
                    padding: 8px 16px;
                    font-weight: 400;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    color: $text1;

                    @include respond-to('phone') {
                        width: 100%;
                    }
                }
            }

            .input {
                height: 36px;
                width: 100%;
                border: 1px solid $border1;
                border-radius: 8px;
                background: $background2;
                padding: 8px 16px;
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.5px;
                color: $text1;
                margin-bottom: 16px;
            }

            .textarea {
                width: 392px;
                height: 160px;
                border: 1px solid $border1;
                border-radius: 8px;
                background: $background2;
                padding: 8px 16px;
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.5px;
                color: $text1;
                margin-bottom: 16px;
                resize: vertical;

                @include respond-to('phone') {
                    width: 100%;
                }
            }

            .check-box {
                margin-top: 16px;
                margin-bottom: 32px;
                display: flex;
                align-items: center;
            }

            .checkbox {
                width: 16px;
                height: 16px;
                border: 1px solid $border2;
                border-radius: 3px;
                margin-right: 6px;
            }

            .submit {
                height: 44px;
                width: 100%;
                background-color: $primary1;
                border-radius: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $secondary2;
                cursor: pointer;
            }

        }
    }


    .bg-box {
        background-image: url('../assets/images/background1.png');
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: center;
        background-position-y: top;
        height: 225px;
    }

    .bottom-box {
        height: 650px;
        background: #FFFBF4;
    }
}</style>