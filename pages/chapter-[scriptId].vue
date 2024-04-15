<template>
    <NuxtLayout name="default">
        <div class="main-box">
            <div class="top-bg" :style="`background-image: url(${imgUrl});`">
                <!-- <img :src="imgUrl" alt=""> -->
            </div>
            <div class="content-box">
                <div class="top-title">{{ scriptData.title }}</div>
                <div class="explain-box">
                    <div class="notice-title">
                        <img class="notice-svg" src="~assets/images/Icon/notice.svg" alt="">
                        <div class="notice">前導說明</div>
                    </div>
                    <div class="item-box">
                        <ol>
                            <li v-for="item, index in scriptData.preamble" :key="index">{{ item }}</li>
                        </ol>
                    </div>

                </div>
                <!-- 每日劇情 -->
                <div v-for="detail in scriptData.scriptDetail" class="course-box">
                    <div @click="toggleContent(detail.period)" class="title-box">
                        <div class="course-title">第 {{ detail.period }} 日</div>
                        <div class="arrow arrow-rotate" :id="`arrow-${detail.period}`">
                            <img class="arrow-svg" src="~assets/images/Icon/arrow-up-2.svg" alt="">
                        </div>
                    </div>
                    <div class="course-content course-content-expanded" :id="`content-${detail.period}`">
                        <div class="course-content-h2">帶領方式說明</div>
                        <div class="illustrate">
                            {{ detail.description }}
                        </div>
                        <div class="course-content-h2">建議進行時間</div>
                        <div class="item-text">{{ detail.advisoryTime }} 分鐘</div>
                        <div v-if="detail.period == 1" class="course-content-h2">劇情影片</div>
                        <div v-if="detail.period == 1" class="mission-body-videoBox"
                            :style="`background: no-repeat center url(${scriptData.imgUrl})`">
                            <div class="mission-body-video">
                                <div class="mission-body-video-head">{{ scriptData.title }} 第 {{ detail.period }} 日</div>
                                <div @click="videoPlay(detail.drama)" class="mission-body-video-play">
                                    <img class="mission-body-video-img" src="~assets/images/Icon/play.svg" alt="">
                                    <div>播放影片</div>
                                </div>
                                <div @click="openContentPopup(detail.todayScript)" class="mission-body-video-text">
                                    <img class="mission-body-video-img" src="~assets/images/Icon/detail-ccc.svg" alt="">
                                    <div>閱讀文字版</div>
                                </div>
                                <div @click="qrDownload(detail.drama, `第${detail.period}日劇情`)"
                                    class="mission-body-video-text">
                                    <img class="mission-body-video-img" src="~assets/images/Icon/download-ccc.svg" alt="">
                                    <div>影片 QR code 下載</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 結局日劇情 -->
                <div class="course-box">
                    <div @click="toggleContent(scriptData.scriptPeriod)" class="title-box">
                        <div class="course-title">第 {{ scriptData.scriptPeriod }} 日</div>
                        <div class="arrow arrow-rotate" :id="`arrow-${scriptData.scriptPeriod}`">
                            <img class="arrow-svg" src="~assets/images/Icon/arrow-up-2.svg" alt="">
                        </div>
                    </div>
                    <div class="course-content course-content-expanded" :id="`content-${scriptData.scriptPeriod}`">
                        <div class="course-content-h2">帶領方式說明</div>
                        <div class="illustrate">
                            {{ scriptData.scriptEndingDTO.endingDescription }}
                        </div>
                        <div class="course-content-h2">建議進行時間</div>
                        <div class="item-text">{{ scriptData.scriptEndingDTO.advisoryTime }} 分鐘</div>
                    </div>
                </div>

                <div class="discuss-box">
                    <div>
                        <div class="discuss-title-box">
                            <img class="player-svg" src="~assets/images/Icon/idea.svg" alt="">
                            <div class="discuss-title">關於分組討論</div>
                        </div>
                        <div class="discuss-content">
                            <ol>
                                <li>預計時間約 5 分鐘，各組討論前一日學習單上的學生題，共同決定要選擇哪個選項。</li>
                                <li>有的選項會為小組帶來「額外資訊」，讓該組知曉一些其他組不知道的劇情。</li>
                                <li>家長題的部分，直接以組內最多家長選擇的選項為結果。</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="ending-box">
                    <div class="ending-title">關於結局</div>
                    <div class="ending-itemBox">
                        <div class="ending-item">
                            <img class="ending-item-img" src="~assets/images/teacher1.png" alt="">
                            <div class="ending-item-title">鴞老師</div>
                            <div class="ending-item-content">
                                兼顧秩序與關係，除了讓學生為自己的行為負責外，也會找出潛在霸凌者背後的需求，並且讓同學們思考要如何以合適的手段滿需求，是最理想的結局。
                            </div>
                        </div>
                        <div class="ending-item">
                            <img class="ending-item-img" src="~assets/images/teacher2.png" alt="">
                            <div class="ending-item-title">鴿老師</div>
                            <div class="ending-item-content">
                                過度注重關係，但未顧及秩序，以勸和的方式來掩蓋衝突，是一種鄉愿式的結局。</div>
                        </div>
                        <div class="ending-item">
                            <img class="ending-item-img" src="~assets/images/teacher3.png" alt="">
                            <div class="ending-item-title">鴉老師</div>
                            <div class="ending-item-content">
                                不注重秩序，也不顧及關係，讓學生感到痛苦且無所適從，是最糟糕的結局。</div>
                        </div>
                        <div class="ending-item">
                            <img class="ending-item-img" src="~assets/images/teacher4.png" alt="">
                            <div class="ending-item-title">鷹老師</div>
                            <div class="ending-item-content">
                                過度注重秩序，但未顧及關係，以嚴懲的方式來避免失序行為出現，是一種威權式的結局。
                            </div>
                        </div>
                    </div>
                    <div class="ending-bg"></div>
                </div>
            </div>
            <getTextbooks></getTextbooks>

            <div class="centerDialog">
                <client-only>
                    <el-dialog v-model="centerDialogVisible">
                        <video v-if="centerDialogVisible" :src="currentVideoUrl" controls></video>
                    </el-dialog>
                </client-only>
            </div>
            <!-- 劇情內容 -->
            <div v-if="isShowInfo" class="popup">
                <div @click="isShowInfo = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">劇情內容</div>
                        <div class="text" v-html="showContent"></div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { getScriptByIdNoToken as getScriptById, editScriptById, uploadFileById } from "~/api/script";
import QRCode from 'qrcode'

const route = useRoute();
const scriptId = route.params.scriptId

const imgUrl = ref("")
const scriptData = reactive({
    scriptEndingDTO: {
        endingOne: "",
        endingTwo: "",
        endingThree: "",
        endingFour: "",
    }
})
const setScriptData = async () => {
    const { data } = await getScriptById(scriptId)
    Object.assign(scriptData, JSON.parse(JSON.stringify(data.value.data)))
    scriptData.hasImg = getFileUrl(scriptData.mediaDTO, 'cover') !== false
    if (scriptData.hasImg) {
        imgUrl.value = getFileUrl(scriptData.mediaDTO, 'cover')
    }
    scriptData.scriptDetail.forEach(detail => {
        detail.sheet = getFileUrl(scriptData.mediaDTO, `sheet-${detail.period}`)
        detail.bulletin = getFileUrl(scriptData.mediaDTO, `bulletin-${detail.period}`)
        detail.information = getFileUrl(scriptData.mediaDTO, `information-${detail.period}`)
        detail.drama = getFileUrl(scriptData.mediaDTO, `drama-${detail.period}`)

    });
}


const getFileUrl = (fileList, target) => {
    let filterFile = fileList.filter(o => o.description == target)
    if (filterFile.length > 0) {
        return filterFile[0].filePath
    }
    return false
}

const currentVideoUrl = ref("")
const centerDialogVisible = ref(false)
const videoPlay = (url) => {
    currentVideoUrl.value = url
    centerDialogVisible.value = true
}

const isShowInfo = ref(false)
const showContent = ref("")
const openContentPopup = (content) => {
    isShowInfo.value = true
    showContent.value = content
}

const toggleContent = (id) => {
    var contentElement = document.getElementById(`content-${id}`);
    contentElement.classList.toggle("course-content-expanded");

    var arrowElement = document.getElementById(`arrow-${id}`);
    arrowElement.classList.toggle("arrow-rotate");
}

const qrDownload = (url, fileName) => {
    QRCode.toDataURL(url)
        .then(QRCodeUrl => {
            const elt = document.createElement('a');
            elt.setAttribute('href', QRCodeUrl);
            elt.setAttribute('download', fileName);
            elt.style.display = 'none';
            document.body.appendChild(elt);
            elt.click();
            document.body.removeChild(elt);

        })
        .catch(err => {
            console.error(err)
        })
}

nextTick(() => {
    setScriptData()
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';

.arrow-rotate {
    transform: rotate(180deg);
}

.centerDialog :deep(.el-dialog__header) {
    height: 0px;
    padding: 0px;
}

.centerDialog :deep(.el-dialog__body) {
    padding: 0px;
    display: flex;
}

.centerDialog :deep(.el-dialog) {
    width: 900px;
    border-radius: 12px;
}

.centerDialog :deep(.el-dialog__headerbtn) {
    z-index: 9999;
}

.centerDialog video {
    width: 900px;
    border-radius: 12px;
}

.main-box {
    width: 100%;

    .top-bg {
        width: 100%;
        height: 225px;
        display: flex;
        justify-content: center;
        background-position: center;
        background-size: 100% auto;
    }

    .content-box {
        background: #FFFBF4;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top-title {
            margin-top: 38px;
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            letter-spacing: 1.5px;
            color: $text1;
        }

        .explain-box {
            width: 928px;
            height: 204px;
            background: $secondary2;
            border: 3px solid $secondary1;
            border-radius: 32px;
            margin-top: 32px;
            padding: 32px;

            @include respond-to('phone') {
                width: 90%;
                height: auto;
            }

            .notice-title {
                display: flex;
                align-items: center;

                .notice-svg {
                    width: 26.67px;
                    height: 26.67px;
                }

                .notice {
                    font-weight: 500;
                    font-size: 20px;
                    color: $text1;
                    letter-spacing: 1.5px;
                    margin-left: 7px;
                }
            }

            .item-box {
                margin-left: 24px;
                margin-top: 14px;
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.5px;
                color: $text2;
            }
        }

        .course-box {
            width: 928px;
            margin-top: 32px;
            border-radius: 15px;
            background: $secondary2;
            overflow: hidden;

            @include respond-to('phone') {
                width: 90%;
                height: auto;
            }

            .title-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: $background3;
                height: 58px;
                padding: 0 32px;
                cursor: pointer;

                .course-title {
                    font-weight: 700;
                    font-size: 20px;
                    letter-spacing: 1.5px;
                    color: $secondary2;
                }
            }

            .course-content {
                padding: 32px;
                height: auto;
                overflow: hidden;

                &-expanded {
                    padding: 0px;
                    height: 0;
                }

                &-h2 {
                    font-weight: 500;
                    font-size: 16px;
                    letter-spacing: 1.5px;
                    color: $primary1;
                    margin-bottom: 4px;
                }

                & .illustrate {
                    font-weight: 400;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    color: $text2;
                    margin-bottom: 16px;
                    white-space: pre-line;
                }

                & .item-text {
                    font-weight: 400;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    color: $text2;
                    margin-bottom: 16px;
                }

                & .player-box {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                & .player {
                    width: 864px;
                    height: 540px;
                    background-image: url('../assets/images/video_cover.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position-x: center;
                    background-position-y: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    @include respond-to('phone') {
                        height: 204px;
                    }

                    &-btn {
                        width: 200px;
                        height: 44px;
                        border-radius: 50px;
                        background: $primary1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: $secondary2;
                        font-weight: 700;
                        font-size: 16px;
                        letter-spacing: 1px;
                        cursor: pointer;
                    }

                    &-svg {
                        margin-right: 3.5px;
                    }


                }
            }


        }

        .course-day2 {
            height: auto;
        }

        .discuss {
            &-box {
                display: flex;
                justify-content: center;
                margin-top: 32px;
                border: 3px solid $border4;
                border-radius: 32px;
                background: $secondary2;
                margin-bottom: 72px;

                @include respond-to('phone') {
                    width: 90%;
                }

                &>div {
                    width: 928px;
                    height: 164px;
                    padding: 35px;

                    @include respond-to('phone') {
                        height: auto;
                    }

                }
            }

            &-title-box {
                display: flex;
                align-items: center;
            }

            &-title {
                font-weight: 500;
                font-size: 20px;
                letter-spacing: 1.5px;
                color: $text1;
                margin-left: 7px;
            }

            &-content {
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.5px;
                color: $text2;
                margin-left: 20px;
                margin-top: 14px;
            }
        }

        .ending {
            &-box {
                width: 100%;
                background: $secondary2;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                @include respond-to('phone') {
                    margin-bottom: 80px;
                }
            }

            &-title {
                font-weight: 700;
                font-size: 32px;
                letter-spacing: 1.5px;
                margin-top: 80px;
                display: flex;
                justify-content: center;
                color: $primary1;
                margin-bottom: 24px;
            }

            &-itemBox {
                display: flex;
                justify-content: center;

                @include respond-to('phone') {
                    flex-direction: column;
                }
            }

            &-item {
                display: flex;
                flex-direction: column;
                width: 267px;
                align-items: center;
                margin-right: 32px;
                margin-bottom: 32px;

                &-img {
                    width: 160px;
                    height: 160px;
                    margin-bottom: 24px;
                }

                &-title {
                    font-weight: 500;
                    font-size: 24px;
                    letter-spacing: 0.5px;
                    color: $text1;
                    text-align: center;
                    margin-bottom: 8px;
                }

                &-content {
                    font-weight: 400;
                    font-size: 16px;
                    letter-spacing: 0.5px;
                    color: $text2;
                    text-align: center;
                }
            }

            &-bg {
                width: 928px;
                height: 666px;
                background-image: url('../assets/images/result_rules.png');
                background-repeat: no-repeat;
                background-size: cover;
                background-position-x: center;
                background-position-y: center;
                margin-bottom: 80px;

                @include respond-to('phone') {
                    display: none;
                }
            }
        }

    }
}

.mission {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 200px;
    background-color: rgb(215, 220, 215);

    &-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 19px 22px;
        background: white;

        &-leave {
            font-weight: 700;
            color: #008B77;
        }

        &-text {
            font-weight: 700;
            font-size: 20px;
        }

        &-edit {
            padding: 10px;
            border: 1px solid #008B77;
            border-radius: 100%;
            cursor: pointer;
        }

        &-img {}

    }

    // basic

    &-basic {
        width: 928px;
        margin-top: 32px;
        background-color: white;

        &-bg {
            width: 100%;
            background-color: beige;

            img {
                width: 100%;
                height: auto;
            }
        }

        &-row {
            display: flex;
            justify-content: space-between;
            padding: 32px;
        }

        &-head {
            font-weight: 700;
            font-size: 20px;
        }

        &-sub {
            margin: 16px 0px 4px;
            color: #008B77;
        }

        &-text {
            font-size: 12px;
            color: #666666;
        }

        &-text2 {
            padding: 4px 0px 16px;
            color: #666666;
        }

        &-line {
            width: 1px;
            margin: 0px 24px;
            background-color: #E7E7E7;
        }

        &-grey {
            font-size: 13px;
            color: #999999;
        }

    }

    // desc 前導說明

    &-desc {
        width: 928px;
        margin-top: 20px;
        padding: 32px 56px;
        background-color: #FFFBF4;
        border: 3px solid #FFC300;
        border-radius: 32px;

        &-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        &-img {}

        &-pre {
            margin: 0px 0px 0px 5px;
        }

        &-text {
            font-size: 14px;
            color: #666666;
        }

    }

    // 第一日

    &-head2 {
        width: 100%;
        height: 80px;
        margin-top: 20px;
        display: flex;
        cursor: pointer;
        justify-content: space-between;



        &-last {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-top: 4px solid #008B77;
            background-color: white;

            &-hint {
                margin-top: 4px;
                color: #999999;
            }
        }

        &-selected {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #008B77;
            color: white;

            &-hint {
                margin-top: 4px;
                color: white;
            }
        }

    }

    &-body { 
        width: 928px;
        margin-top: 20px;
        padding: 8px 32px 32px;
        background-color: white;

        &-head {
            margin: 24px 4px;
            color: #008B77;
        }

        &-scoring {
            border-radius: 12px;
            overflow: hidden;

            &-titleBox {
                display: flex;
                height: 40px;
                padding: 8px 16px;
                align-items: center;
                gap: 16px;
                align-self: stretch;
                border: 1px solid var(--border-color-color-3, #E7E7E7);
                background: var(--background-color-3, #333);

                div {
                    color: #FFF;
                }
            }

            &-itemBox {
                display: flex;
                padding: 12px 16px;
                align-items: center;
                gap: 16px;
                align-self: stretch;
                border: 1px solid var(--border-color-color-3, #E7E7E7);
                background: var(--secondary-color-2, #FFF);

                .icon-outer {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #008B77;
                    border-radius: 50px;
                    margin-right: 4px;
                    cursor: pointer;

                    img {}
                }
            }

            &-totalScore {
                display: flex;
                height: 40px;
                padding: 24px 16px;
                align-items: center;
                gap: 16px;
                align-self: stretch;
                border: 1px solid var(--border-color-color-3, #E7E7E7);
                background: var(--background-color-2, #EFEFEF);

                .score-title {
                    display: flex;
                    justify-content: flex-end;
                }
            }

            &-end {
                display: flex;
                padding: 12px 16px;
                align-items: center;
                gap: 16px;
                align-self: stretch;
                background: var(--secondary-color-1, #FFC300);

                .score-title {
                    display: flex;
                    justify-content: flex-end;
                }

                .score-endText {
                    color: var(--text-color-color-1, #333);
                    font-family: Noto Sans TC;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 30px;
                    letter-spacing: 0.5px;
                }
            }
        }

        &-text {
            font-size: 14px;
            color: #666666;
        }

        &-line {
            height: 1px;
            margin: 24px 0px;
            background-color: #E7E7E7;
        }

        &-videoBox {
            width: 100%;
            height: 500px;
            position: relative;

            video {
                width: 100%;
                height: 500px;
            }

            .mission-body-video {
                position: absolute;
                top: 0;
            }
        }



        &-video {
            width: 100%;
            height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(black, 0.3);

            &-head {
                font-size: 24px;
                color: white;
            }

            &-play {
                display: flex;
                align-items: center;
                margin: 24px 0px 8px;
                padding: 16px 55px;
                color: white;
                cursor: pointer;
                border-radius: 50px;
                background: var(--primary-color-1, #008B77);
            }

            &-play:hover {
                background: #15C0A7;
            }

            &-img {
                width: 20px;
                height: 20px;
                margin-right: 4px;
            }

            &-text {
                display: flex;
                align-items: center;
                margin: 16px 0px;
                font-size: 14px;
                color: #CCCCCC;
                cursor: pointer;
            }

        }

        &-row {
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
        }

        &-row0 {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        &-box {
            width: 49%;

            &-header {
                margin-top: 8px;
                padding: 10px;
                display: flex;
                align-items: center;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                background: #E1E1E1;
            }

            &-question {
                width: 20px;
                height: 20px;
                margin-right: 10px;
                line-height: 20px;
                text-align: center;
                background: #008B77;
                border-radius: 4px;
                color: white;
            }

            &-head {
                font-size: 14px;
            }

            &-row1 {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                border-bottom: 1px solid white;
                background: #EFEFEF;
            }

            &-row2 {
                display: flex;
            }

            &-answer {
                width: 20px;
                height: 20px;
                line-height: 20px;
                margin-right: 10px;
                text-align: center;
                font-size: 13px;
                color: #008B77;
                border: 1px solid #008B77;
            }

            &-text {
                font-size: 14px;
            }

            &-info {
                width: 16px;
                height: 16px;
            }

        }

        // 額外資訊

        &-head2 {
            margin: 16px 0px 8px;
            font-size: 14px;
        }

        &-row2 {
            display: flex;
            margin-bottom: 4px;
        }

        &-sub {
            width: 64px;
            font-size: 14px;
        }

        &-net {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            border-radius: 12px;
        }

        &-net2 {
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            border-radius: 12px;
        }

        &-write {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 20px;
            border: 1px solid #008B77;
            font-weight: 700;
            font-size: 14px;
            color: #008B77;
            cursor: pointer;
        }

        &-edit {
            width: 12px;
            height: 12px;
            margin-right: 4px;
        }

        // 教材檔案

        &-row3 {
            width: 100%;
            display: flex;
            border-bottom: 1px solid #E7E7E7;
        }

        &-row4 {
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-right: 1px solid #E7E7E7;
        }

        &-head3 {
            font-size: 14px;
        }

        &-icon {
            padding: 5px;
            border: 1px solid #008B77;
            border-radius: 100%;
            cursor: pointer;
        }

        &-bgIcon {
            padding: 5px;
            border: 1px solid #008B77;
            border-radius: 100%;
            cursor: pointer;
            background-color: #008B77;
        }

    }

    // 本日計分

    &-count {
        margin-top: 10px;

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            background: #333333;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        &-title {
            font-size: 14px;
            color: white;
        }

        &-row {
            display: flex;
        }

        &-row2 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            border-bottom: 1px solid #E7E7E7;
            background-color: white;
        }

        &-row3 {
            display: flex;
            align-items: center;
        }

        &-text {
            margin-right: 90px;
            font-size: 14px;
            color: white;
        }

        &-choose {}

        &-sub1 {
            font-size: 14px;
        }

        &-sub2 {
            margin-top: 4px;
            font-size: 12px;
            color: #666666;
        }

        &-count {
            width: 130px;
            font-size: 14px;
        }

        &-sum {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 0px;
        }

        &-sum1 {
            display: flex;
        }

        &-title2 {
            margin-right: 16px;
        }

        &-num {
            margin-right: 90px;
        }

        &-sum2 {
            margin-right: 100px;
        }

        &-total {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 12px 0px;
            background-color: #008B77;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        &-title3 {
            margin-right: 16px;
            font-size: 14px;
            color: white;
        }

        &-num2 {
            margin-right: 90px;
            font-size: 24px;
            color: white;
        }

        &-num3 {
            margin-right: 90px;
            font-size: 24px;
            color: white;
        }

    }

    &-pop {

        &-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &-title {
            font-size: 20px;
        }

        &-add {
            color: #008B77;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
        }

        &-row2 {
            display: flex;
            align-items: center;
            margin-top: 16px;
        }

        &-answer {
            margin: 0px 100px 0px 19px;
            font-size: 14px;
        }

        &-row3 {
            display: flex;
            align-items: center;
            padding: 12px 0px 15px;
            border-bottom: 1px solid #CCCCCC;
        }

        &-select {
            width: 153px;
            margin: 0px 10px;
            padding: 6px;
            font-size: 14px;
            border-radius: 10px;
            background-color: #ebebeb;
        }

        &-num {
            font-size: 14px;
        }

        &-close {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #008B77;
            border-radius: 100%;
            color: #008B77;
            cursor: pointer;
        }

        &-confirm {
            margin-top: 40px;
            padding: 6px 0px;
            text-align: center;
            color: white;
            border-radius: 20px;
            background-color: #008B77;
            cursor: pointer;
        }

        &-confirm:hover {
            background-color:#15C0A7;
        }
    }

}
</style>