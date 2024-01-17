<template>
    <div>
        <!-- body -->
        <div class="step-day-title4">基本設定</div>
        <div class="step-day-outer">
            <div class="step-day-row">
                <div class="step-day-title5">劇本封面</div>
                <div class="step-day-img">
                    <img v-if="props.infoData.imgData !== ''" :src="props.infoData.imgData" alt="">
                </div>
            </div>
            <div class="step-day-row">
                <div class="step-day-title5">劇本名稱</div>
                <div class="step-day-text">{{ props.infoData.title }}</div>
            </div>
            <div class="step-day-row">
                <div class="step-day-title5">劇本簡述</div>
                <div class="step-day-text">{{ props.infoData.description }}</div>
            </div>
            <div class="step-day-row">
                <div class="step-day-title5">劇本時長 (天)</div>
                <div class="step-day-text">{{ props.infoData.scriptPeriod }}天</div>
            </div>
            <div class="step-day-row">
                <div class="step-day-title5">教學重點</div>
                <div class="step-day-text">
                    <div v-for="(item, index) in props.infoData.goal" :key="index">
                        {{ index + 1 }}. {{ item }}
                    </div>
                </div>
            </div>
            <div class="step-day-row">
                <div class="step-day-title5">給老師的提醒</div>
                <div class="step-day-text">
                    <div v-for="(item, index) in props.infoData.tips" :key="index">
                        {{ index + 1 }}. {{ item }}
                    </div>
                </div>
            </div>
            <div class="step-day-row">
                <div class="step-day-title5">前導說明</div>
                <div class="step-day-text">
                    <div v-for="(item, index) in props.infoData.preamble" :key="index">
                        {{ index + 1 }}. {{ item }}
                    </div>
                </div>
            </div>
        </div>

        <div class="step-day-title4">詳細內容</div>

        <!-- 第一日 -->
        <div v-for="dayData in props.detailData">
            <div class="step-day">
                <div @click="toggleContent(dayData.period)" class="step-day-head-row">
                    <div class="step-day-head">第 {{ dayData.period }} 日</div>
                    <div class="step-day-up">^</div>
                </div>

                <div class="step-day-box" :id="`confirm-content-${dayData.period}`">
                    <div class="step-day-row3">
                        <div class="step-day-title5">建議時間</div>
                        <div class="step-day-text">{{ dayData.advisoryTime }} 分鐘</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">帶領方式說明</div>
                        <div class="step-day-text">{{ dayData.description }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">本日劇情</div>
                        <div class="step-day-text">{{ dayData.todayScript }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">額外資訊</div>
                        <div class="step-day-text">
                            <div v-for="(item, index) in dayData.additionalInfo" :key="index">
                                {{ index + 1 }}. {{ item.text }}
                            </div>
                        </div>
                    </div>

                    <div class="step-day-row3">
                        <div class="step-day-title5">學生問題討論</div>
                        <div class="step-day-green">
                            <div class="step-day-green-row">
                                <div class="step-day-green-question">？</div>
                                <div class="step-day-green-head">{{ dayData.stuContent }}</div>
                            </div>
                            <div v-for="config, index in dayData.studentConfigs" class="step-day-green-content">
                                <div class="step-day-green-row2">
                                    <div class="step-day-green-answer">{{ numberToLetter(index + 1) }}</div>
                                    <div class="step-day-green-head">{{ config.stuDescription }}</div>
                                </div>
                                <div class="step-day-green-row3">
                                    <div class="step-day-green-sub">秩序：</div>
                                    <div class="step-day-green-text">{{ config.stuOrderly }}</div>
                                    <div class="step-day-green-sub">關係：</div>
                                    <div class="step-day-green-text">{{ config.stuRelation }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="step-day-row3">
                        <div class="step-day-title5">家長問題討論</div>
                        <div class="step-day-green">
                            <div class="step-day-green-row">
                                <div class="step-day-green-question">？</div>
                                <div class="step-day-green-head">{{ dayData.parContent }} </div>
                            </div>
                            <div v-for="config, index in dayData.parentConfigs" class="step-day-green-content">
                                <div class="step-day-green-row2">
                                    <div class="step-day-green-answer">{{ numberToLetter(index + 1) }}</div>
                                    <div class="step-day-green-head">{{ config.parDescription }}</div>
                                </div>
                                <div class="step-day-green-row3">
                                    <div class="step-day-green-sub">秩序：</div>
                                    <div class="step-day-green-text">{{ config.parOrderly }}</div>
                                    <div class="step-day-green-sub">關係：</div>
                                    <div class="step-day-green-text">{{ config.parRelation }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="step-day-row3">
                        <div class="step-day-title5">教材檔案</div>
                        <div class="step-day-net">
                            <div class="step-day-row">
                                <div class="step-day-title3">劇情影片</div>
                                <span v-if="dayData.drama">{{ getFileName(dayData.drama) }}</span>
                                <img v-if="dayData.drama" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title3">學習單</div>
                                <span v-if="dayData.sheet">{{ getFileName(dayData.sheet) }}</span>
                                <img v-if="dayData.sheet" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            </div>
                            <div v-if="dayData.period == 1" class="step-day-line"></div>
                            <div v-if="dayData.period == 1" class="step-day-row">
                                <div class="step-day-title3">教學簡報</div>
                                <span v-if="dayData.bulletin">{{ getFileName(dayData.bulletin) }}</span>
                                <img v-if="dayData.bulletin" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title3">額外資訊</div>
                                <span v-if="dayData.information">{{ getFileName(dayData.information) }}</span>
                                <img v-if="dayData.information" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <!-- 結局日 -->
        <div class="step-day">
            <div @click="toggleContent(props.infoData.scriptPeriod)" class="step-day-head-row">
                <div class="step-day-head">第 {{ props.infoData.scriptPeriod }} 日 (結局日)</div>
                <div class="step-day-up">^</div>
            </div>

            <div class="step-day-box" :id="`confirm-content-${props.infoData.scriptPeriod}`">
                <div class="step-day-row3">
                    <div class="step-day-title5">建議時間</div>
                    <div class="step-day-text">{{ props.endingData.advisoryTime }} 分鐘</div>
                </div>
                <div class="step-day-row3">
                    <div class="step-day-title5">帶領方式說明</div>
                    <div class="step-day-text">{{ props.endingData.endingDescription }}</div>
                </div>
                <div class="step-day-row3">
                    <div class="step-day-title5">結局一描述 (鴞老師)</div>
                    <div class="step-day-text">{{ props.endingData.endingOne }}</div>
                </div>
                <div class="step-day-row3">
                    <div class="step-day-title5">結局二描述 (鴿老師)</div>
                    <div class="step-day-text">{{ props.endingData.endingTwo }}</div>
                </div>
                <div class="step-day-row3">
                    <div class="step-day-title5">結局三描述 (鴉老師)</div>
                    <div class="step-day-text">{{ props.endingData.endingThree }}</div>
                </div>
                <div class="step-day-row3">
                    <div class="step-day-title5">結局四描述 (鷹老師)</div>
                    <div class="step-day-text">{{ props.endingData.endingFour }}</div>
                </div>

                <div class="step-day-row3">
                    <div class="step-day-title5">結局影片</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title">結局一 (鴞老師) 影片</div>
                            <span v-if="props.endingData['endingMovie-1']">{{ getFileName(props.endingData['endingMovie-1']) }}</span>
                            <img v-if="props.endingData['endingMovie-1']" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                        </div>
                        <div class="step-day-line"></div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局二 (鴿老師) 影片</div>
                            <span v-if="props.endingData['endingMovie-2']">{{ getFileName(props.endingData['endingMovie-2']) }}</span>
                            <img v-if="props.endingData['endingMovie-2']" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                        </div>
                        <div class="step-day-line"></div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局三 (鴉老師) 影片</div>
                            <span v-if="props.endingData['endingMovie-3']">{{ getFileName(props.endingData['endingMovie-3']) }}</span>
                            <img v-if="props.endingData['endingMovie-3']" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                        </div>
                        <div class="step-day-line"></div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局四 (鷹老師) 影片</div>
                            <span v-if="props.endingData['endingMovie-4']">{{ getFileName(props.endingData['endingMovie-4']) }}</span>
                            <img v-if="props.endingData['endingMovie-4']" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                        </div>
                    </div>
                </div>

                <div class="step-day-row3">
                    <div class="step-day-title5">教材檔案</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title">學習單</div>
                            <span v-if="props.endingData.endingSheet">{{ getFileName(props.endingData.endingSheet) }}</span>
                            <img v-if="props.endingData.endingSheet" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                        </div>
                        <div class="step-day-line"></div>
                        <!-- <div class="step-day-row">
                            <div class="step-day-title">學習簡報</div>
                            <img v-if="props.endingData.endingBulletin" class="step-day-icon" src="~/assets/images/Icon/available.svg"
                                alt="available">
                        </div> -->
                    </div>
                </div>

                <div class="step-day-row3">
                    <div class="step-day-title5">計分設定</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title">結局一 (鴞老師)</div>
                            <div class="step-day-row2">
                                <div class="step-day-test2">秩序：</div>
                                <div class="step-day-test3" style="margin-right: 10px;">{{ plusOrMinus[props.endingData.orderlyOne] }}</div>
                                <div class="step-day-test2">關係：</div>
                                <div class="step-day-test3">{{ plusOrMinus[props.endingData.relationOne] }}</div>
                            </div>
                        </div>
                        <div class="step-day-line"></div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局二 (鴿老師)</div>
                            <div class="step-day-row2">
                                <div class="step-day-test2">秩序：</div>
                                <div class="step-day-test3" style="margin-right: 10px;">{{ plusOrMinus[props.endingData.orderlyTwo] }}</div>
                                <div class="step-day-test2">關係：</div>
                                <div class="step-day-test3">{{ plusOrMinus[props.endingData.relationTwo] }}</div>
                            </div>
                        </div>
                        <div class="step-day-line"></div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局三 (鴉老師)</div>
                            <div class="step-day-row2">
                                <div class="step-day-test2">秩序：</div>
                                <div class="step-day-test3" style="margin-right: 10px;">{{ plusOrMinus[props.endingData.orderlyThree] }}</div>
                                <div class="step-day-test2">關係：</div>
                                <div class="step-day-test3">{{ plusOrMinus[props.endingData.relationThree] }}</div>
                            </div>
                        </div>
                        <div class="step-day-line"></div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局四 (鷹老師)</div>
                            <div class="step-day-row2">
                                <div class="step-day-test2">秩序：</div>
                                <div class="step-day-test3" style="margin-right: 10px;">{{ plusOrMinus[props.endingData.orderlyFour] }}</div>
                                <div class="step-day-test2">關係：</div>
                                <div class="step-day-test3">{{ plusOrMinus[props.endingData.relationFour] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-day-grey">若計分結果未有正、負面傾向性，則以正面作為結果。</div>


            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    infoData: {
        type: Object,
    },
    detailData: {
        type: Object,
    },
    endingData: {
        type: Object,
    },
})

const getFileName = (formData) => {
    if(formData){
        return formData.get('file').name
    }else {
        return ""
    }
   
}

const fractionOption = {
    0: "加分",
    1: "不加分"
}

const plusOrMinus = {
    0: "正面",
    1: "負面"
}

const numberToLetter = (number) => {
    if (Number.isInteger(number) && number >= 1 && number <= 26) {
        const charCode = number + 64;
        const letter = String.fromCharCode(charCode);
        return letter;
    } else {
        return number;
    }
}

const nonEndingDayLength = ref()
const initData = () => {
    nonEndingDayLength.value = props.infoData.scriptPeriod - 1
}
initData()

const toggleContent = (id) => {
    var contentElement = document.getElementById(`confirm-content-${id}`);
    contentElement.classList.toggle("step-day-box-expanded");
}

let coverImgPath
const setCoverImgPat = () => {
    let formData = props.infoData.imgData
    // var urlSearchParams = new URLSearchParams();
    // for (var pair of formData.entries()) {
    //     urlSearchParams.append(pair[0], pair[1]);
    // }
    // let urlEncodedString = urlSearchParams.toString();
    coverImgPath = formData
}
setCoverImgPat()
</script>

<style lang="scss" scoped>
@import '~/assets/styles/step.scss';

.box {}
</style>