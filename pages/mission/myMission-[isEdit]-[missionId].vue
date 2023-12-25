<template>
    <NuxtLayout name="custom">
        <div class="mission">
            <div class="mission-head">
                <nuxt-link v-if="isEdit" to="/mission/myList" class="mission-head-leave">
                    <div style="display:flex;align-items: center;"><img src="@/assets/images/Icon/arrow-left.svg"> 返回列表
                    </div>
                </nuxt-link>
                <nuxt-link v-else to="/mission/list" class="mission-head-leave">
                    <div style="display:flex;align-items: center;"><img src="@/assets/images/Icon/arrow-left.svg"> 返回列表
                    </div>
                </nuxt-link>
                <div class="mission-head-text">{{ scriptData.title }}</div>
                <div v-if="isEdit" @click="isShowEdit = true" class="mission-head-edit">
                    <img class="mission-head-img" src="~assets/images/Icon/edit.svg" alt="">
                </div>
                <div v-if="!isEdit"></div>
            </div>

            <div class="mission-basic">
                <div class="mission-basic-bg">
                    <img v-if="scriptData.hasImg" :src="scriptData.imgUrl" alt="">
                </div>
                <div class="mission-basic-row">
                    <div>
                        <div class="mission-basic-head">{{ scriptData.title }}</div>
                        <div class="mission-basic-sub">教學重點</div>
                        <div class="mission-basic-text" v-for="(item, index) in scriptData.goal" :key="index">
                            {{ index + 1 }}. {{ item }}
                        </div>
                        <div class="mission-basic-sub">給老師的提醒</div>
                        <div class="mission-basic-text" v-for="(item, index) in scriptData.tips" :key="index">
                            {{ index + 1 }}. {{ item }}
                        </div>
                    </div>
                    <div class="mission-basic-line"></div>
                    <div>
                        <div class="mission-basic-grey">任務狀態</div>
                        <div class="mission-basic-text2">{{ statusMap[taskData.status] }}</div>
                        <div class="mission-basic-grey">結束時間</div>
                        <div class="mission-basic-text2">{{ taskData.endTimeStr }}</div>
                        <div class="mission-basic-grey">建立時間</div>
                        <div class="mission-basic-text2">{{ taskData.createTimeStr }}</div>
                    </div>
                </div>
            </div>

            <div class="mission-desc">
                <div class="mission-desc-row">
                    <img class="mission-desc-img" src="~assets/images/Icon/notice.svg" alt="">
                    <div class="mission-desc-pre">前導說明</div>
                </div>
                <div class="mission-desc-text" v-for="(item, index) in scriptData.preamble" :key="index">
                    {{ index + 1 }}. {{ item }}
                </div>
            </div>

            <div class="mission-day">
                <div class="mission-head2">
                    <div v-for="i,index in (scriptData.day)" :key="index" :id="`mission-head2-${i}`" @click="missionHeadClick(i)"
                        class="mission-head2-last">第
                        {{ i }} 日</div>
                    <!-- <div class="mission-head-unselect"></div> -->
                    <div :id="`mission-head2-${scriptData.dayEnd}`" @click="missionHeadClick(scriptData.dayEnd)"
                        class="mission-head2-last">
                        <div>第 {{ scriptData.dayEnd }} 日</div>
                        <div class="mission-head2-hint">(結局日)</div>
                    </div>
                </div>

                <div v-if="currentPeriod !== scriptData.dayEnd" class="mission-body">
                    <div v-if="currentPeriod !== 1" @click="openFillScoreModel(currentPeriod-1)" class="backfill">
                        <img src="@/assets/images/Icon/edit_hover.svg" />
                        填寫第{{ currentPeriod - 1 }}日分數
                    </div>
                    <div class="mission-body-head">帶領方式說明</div>
                    <div class="mission-body-text">{{ currentDetail.description }}</div>
                    <div class="mission-body-head">建議進行時間</div>
                    <div class="mission-body-text">{{ currentDetail.advisoryTime }}分鐘</div>
                    <div class="mission-body-line"></div>

                    <div class="mission-body-head">本日劇情影片</div>
                    <div class="mission-body-videoBox" :style="`background: no-repeat center url(${scriptData.imgUrl})`">
                        <div class="mission-body-video">
                            <div class="mission-body-video-head">{{ scriptData.title }} 第 {{ currentDetail.period }} 日</div>
                            <div @click="videoPlay(currentDetail.drama)" class="mission-body-video-play">
                                <img class="mission-body-video-img" src="~assets/images/Icon/play.svg" alt="">
                                <div>播放影片</div>
                            </div>
                            <div @click="openContentPopup(currentDetail.todayScript)" class="mission-body-video-text">
                                <img class="mission-body-video-img" src="~assets/images/Icon/detail-ccc.svg" alt="">
                                <div>閱讀文字版</div>
                            </div>
                            <div @click="qrDownload(currentDetail.drama, `第${currentDetail.period}日劇情`)"
                                class="mission-body-video-text">
                                <img class="mission-body-video-img" src="~assets/images/Icon/download-ccc.svg" alt="">
                                <div>影片 QR code 下載</div>
                            </div>
                        </div>
                    </div>


                    <div class="mission-body-row">
                        <div class="mission-body-box">學生問題討論</div>
                        <div class="mission-body-box">家長問題討論</div>
                    </div>

                    <div class="mission-body-row0">
                        <!-- 左側 -->
                        <div class="mission-body-box">
                            <div class="mission-body-box-header">
                                <div class="mission-body-box-question">?</div>
                                <div class="mission-body-box-head">{{ currentDetail.stuContent }}</div>
                            </div>
                            <div v-for="config, index in currentDetail.studentConfigs" :key="index" class="mission-body-box-row1">
                                <div class="mission-body-box-row2">
                                    <div class="mission-body-box-answer">{{ numberToLetter(index + 1) }}</div>
                                    <div class="mission-body-box-text">{{ config.stuDescription }}</div>
                                </div>
                                <el-tooltip class="box-item"
                                    :content="`秩序效果：${config.stuOrderly}，關係效果：${config.stuRelation}`" placement="top"
                                    effect="light">
                                    <img class="mission-body-box-info" src="~assets/images/Icon/information.svg" alt="">
                                </el-tooltip>

                            </div>

                        </div>
                        <!-- 右側 -->
                        <div class="mission-body-box">
                            <div class="mission-body-box-header">
                                <div class="mission-body-box-question">?</div>
                                <div class="mission-body-box-head">{{ currentDetail.parContent }}</div>
                            </div>
                            <div v-for="config, index in currentDetail.parentConfigs" :key="index" class="mission-body-box-row1">
                                <div class="mission-body-box-row2">
                                    <div class="mission-body-box-answer">{{ numberToLetter(index + 1) }}</div>
                                    <div class="mission-body-box-text">{{ config.parDescription }}</div>
                                </div>
                                <el-tooltip class="box-item"
                                    :content="`秩序效果：${config.parOrderly}，關係效果：${config.parRelation}`" placement="top"
                                    effect="light">
                                    <img class="mission-body-box-info" src="~assets/images/Icon/information.svg" alt="">
                                </el-tooltip>
                            </div>

                        </div>
                    </div>

                    <!-- 額外資訊 -->

                    <div class="mission-body-head2">額外資訊</div>
                    <div class="mission-body-row2" v-for="info, index in currentDetail.additionalInfo" :key="index">
                        <div class="mission-body-sub">資訊 {{ index + 1 }}</div>
                        <div class="mission-body-text">{{ info }}</div>
                    </div>

                    <div class="mission-body-line"></div>

                    <!-- 本日計分 -->
                    <div class="mission-body-head">本日計分</div>
                    <div class="mission-body-net">
                        <div class="mission-body-text"><span v-if="scoreLength == 0">目前還未填寫分數</span></div>
                        <div @click="openFillScoreModel('')" class="mission-body-write">
                            <img class="mission-body-edit" src="~assets/images/Icon/edit.svg" alt="">
                            <div>填寫分數</div>
                        </div>
                    </div>

                    <!-- 計分 -->
                    <template v-if="scoreLength !== 0">
                        <div class="mission-count">
                            <div class="mission-count-header">
                                <div class="mission-count-title">學生討論題選項</div>
                                <div class="mission-count-row">
                                    <div class="mission-count-text">數量</div>
                                    <div class="mission-count-text">秩序統計</div>
                                    <div class="mission-count-text">關係統計</div>
                                </div>
                            </div>

                            <div v-for="item,i in stuList" :key="i" class="mission-count-row2">
                                <div class="mission-count-choose">
                                    <div class="mission-count-sub1">{{ item.text }}</div>
                                    <div class="mission-count-sub2">秩序效果：{{ item.orderly }}，關係效果：{{ item.relation }}</div>
                                </div>
                                <div class="mission-count-row3">
                                    <div class="mission-count-count">{{ item.count }}</div>
                                    <div class="mission-count-count">{{ item.orderly * item.count }}</div>
                                    <div class="mission-count-count">{{ item.relation * item.count }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="mission-count-sum">
                            <div class="mission-count-sum1">
                                <div class="mission-count-title2">小計</div>
                                <div class="mission-count-num">{{ stuTotal.orderly }}</div>
                            </div>
                            <div class="mission-count-sum2">{{ stuTotal.relation }}</div>
                        </div>


                        <div class="mission-count">
                            <div class="mission-count-header">
                                <div class="mission-count-title">家長討論題選項</div>
                                <div class="mission-count-row">
                                    <div class="mission-count-text">數量</div>
                                    <div class="mission-count-text">秩序統計</div>
                                    <div class="mission-count-text">關係統計</div>
                                </div>
                            </div>

                            <div v-for="item,i in parList" :key="i" class="mission-count-row2">
                                <div class="mission-count-choose">
                                    <div class="mission-count-sub1">{{ item.text }}</div>
                                    <div class="mission-count-sub2">秩序效果：{{ item.orderly }}，關係效果：{{ item.relation }}</div>
                                </div>
                                <div class="mission-count-row3">
                                    <div class="mission-count-count">{{ item.count }}</div>
                                    <div class="mission-count-count">{{ item.orderly * item.count }}</div>
                                    <div class="mission-count-count">{{ item.relation * item.count }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="mission-count-sum">
                            <div class="mission-count-sum1">
                                <div class="mission-count-title2">小計</div>
                                <div class="mission-count-num">{{ parTotal.orderly }}</div>
                            </div>
                            <div class="mission-count-sum2">{{ parTotal.relation }}</div>
                        </div>
                        <div class="mission-count-total">
                            <div class="mission-count-total">
                                <div class="mission-count-title3">每日小計</div>
                                <div class="mission-count-num2">{{ stuTotal.orderly + parTotal.orderly }}</div>
                            </div>
                            <div class="mission-count-num3">{{ stuTotal.relation + parTotal.relation }}</div>
                        </div>
                    </template>



                    <div class="mission-body-line"></div>

                    <!-- 教材檔案 -->
                    <div class="mission-body-head">教材檔案</div>
                    <div class="mission-body-net2">
                        <div class="mission-body-row3">
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">學習單</div>
                                <!-- <a v-if="currentDetail.sheet" target="_blank" :href="currentDetail.sheet" download="sheet">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </a> -->
                                <img @click="handelDownloadPDF()" class="mission-body-icon"
                                    src="~assets/images/Icon/download.svg" alt="">
                            </div>
                            <div v-if="currentPeriod == 1" class="mission-body-row4">
                                <div class="mission-body-head3">教學簡報</div>
                                <a v-if="currentDetail.bulletin" target="_blank" :href="currentDetail.bulletin"
                                    download="sheet">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="mission-body-line2"></div>
                        <div class="mission-body-row3">
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">額外資訊</div>
                                <div v-if="currentDetail.information" @click="downloadFile(currentDetail.bulletin)">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </div>
                            </div>
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">本日影片 QR code </div>
                                <div v-if="currentDetail.sheet"
                                    @click="qrDownload(currentDetail.drama, `第${currentDetail.period}日劇情`)">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-if="currentPeriod == scriptData.dayEnd" class="mission-body">
                    <div class="mission-body-head">帶領方式說明</div>
                    <div class="mission-body-text">{{ currentDetail.endingDescription }}</div>
                    <div class="mission-body-head">建議進行時間</div>
                    <div class="mission-body-text">{{ currentDetail.advisoryTime }}分鐘</div>
                    <div class="mission-body-line"></div>

                    <div class="mission-body-head">計分總覽</div>
                    <div class="mission-body-scoring">
                        <div class="mission-body-scoring-titleBox">
                            <div style="width: 40%;">項目</div>
                            <div style="width: 25%;">秩序</div>
                            <div style="width: 25%;">關係</div>
                            <div style="width: 10%;">編輯</div>
                        </div>
                        <div v-for="total,i in totalList" :key="i" class="mission-body-scoring-itemBox">
                            <div style="width: 40%;">第 {{ total.period }} 日得分小計</div>
                            <div style="width: 25%;">{{ total.orderly }}</div>
                            <div style="width: 25%;">{{ total.relation }}</div>
                            <div style="width: 10%;">
                                <div @click="openFillScoreModel(total.period)" style="width:45px;"
                                    class="mission-body-write">
                                    <img class="mission-body-edit" style="width:25px;height:25px;"
                                        src="~assets/images/Icon/edit-b.svg" alt="">
                                </div>
                            </div>
                        </div>
                        <div v-if="isAllScoreFill" class="mission-body-scoring-totalScore">
                            <div class="score-title" style="width: 40%;">分數總計</div>
                            <div style="width: 25%;">{{ allTotal.orderly }}</div>
                            <div style="width: 25%;">{{ allTotal.relation }}</div>
                            <div style="width: 10%;">
                            </div>
                        </div>
                        <div v-if="isAllScoreFill" class="mission-body-scoring-end">
                            <div class="score-title" style="width: 40%;">本次結局</div>
                            <div class="score-endText" style="width: 25%;">{{ quadrantOption[quadrant] }}</div>
                            <div style="width: 25%;"></div>
                            <div style="width: 10%;">
                            </div>
                        </div>
                    </div>

                    <div @click="centerDialogVisible = true" class="mission-body-head">本次結局</div>
                    <div v-if="scoreLength !== 0" class="mission-body-videoBox"
                        :style="`background: no-repeat center url(${scriptData.imgUrl})`">
                        <div v-if="!isVideoPlay" class="mission-body-video">
                            <div class="mission-body-video-head">{{ quadrantOption[quadrant] }}</div>
                            <div v-if="currentDetail[`endingMovie${quadrant}`]"
                                @click="videoPlay(currentDetail[`endingMovie${quadrant}`])" class="mission-body-video-play">
                                <img class="mission-body-video-img" src="~assets/images/Icon/play.svg" alt="">
                                <div>播放影片</div>
                            </div>
                            <div @click="openContentPopup(currentDetail[endingTextOption[quadrant]])"
                                class="mission-body-video-text">
                                <img class="mission-body-video-img" src="~assets/images/Icon/detail-ccc.svg" alt="">
                                <div>閱讀文字版</div>
                            </div>
                            <div @click="qrDownload(currentDetail[`endingMovie${quadrant}`], `第${quadrant}日劇情`)"
                                class="mission-body-video-text">
                                <img class="mission-body-video-img" src="~assets/images/Icon/download-ccc.svg" alt="">
                                <div>影片 QR code 下載</div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="mission-body-net">分數還未填寫完畢</div>
                    </div>
                    <div class="mission-body-line"></div>

                    <!-- 全部結局 -->
                    <div class="mission-body-head">全部結局</div>
                    <div class="mission-body-net2">
                        <div class="mission-body-row3">
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">{{ scriptData.title }} 結局一 (鴞老師)</div>
                                <div style="display: flex;">
                                    <img v-if="currentDetail.endingMovie1" @click="videoPlay(currentDetail.endingMovie1)"
                                        class="mission-body-bgIcon" style="margin-right: 12px;"
                                        src="~assets/images/Icon/play.svg" alt="">
                                    <img @click="openContentPopup(currentDetail.endingOne)" class="mission-body-icon"
                                        style="margin-right: 12px;" src="~assets/images/Icon/detail.svg" alt="">
                                    <img v-if="currentDetail.endingMovie1"
                                        @click="qrDownload(currentDetail.endingMovie1, `結局日結局一`)" class="mission-body-icon"
                                        src="~assets/images/Icon/download.svg" alt="">
                                </div>
                                <!-- <a v-if="currentDetail.sheet" :href="currentDetail.sheet" download="sheet">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </a> -->
                            </div>
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">{{ scriptData.title }} 結局二 (鴿老師)</div>
                                <div style="display: flex;">
                                    <img v-if="currentDetail.endingMovie2" @click="videoPlay(currentDetail.endingMovie2)"
                                        class="mission-body-bgIcon" style="margin-right: 12px;"
                                        src="~assets/images/Icon/play.svg" alt="">
                                    <img @click="openContentPopup(currentDetail.endingTwo)" class="mission-body-icon"
                                        style="margin-right: 12px;" src="~assets/images/Icon/detail.svg" alt="">
                                    <img v-if="currentDetail.endingMovie2"
                                        @click="qrDownload(currentDetail.endingMovie2, `結局日結局二`)" class="mission-body-icon"
                                        src="~assets/images/Icon/download.svg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="mission-body-line2"></div>
                        <div class="mission-body-row3">
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">{{ scriptData.title }} 結局三 (鴉老師)</div>
                                <div style="display: flex;">
                                    <img v-if="currentDetail.endingMovie3" @click="videoPlay(currentDetail.endingMovie3)"
                                        class="mission-body-bgIcon" style="margin-right: 12px;"
                                        src="~assets/images/Icon/play.svg" alt="">
                                    <img @click="openContentPopup(currentDetail.endingThree)" class="mission-body-icon"
                                        style="margin-right: 12px;" src="~assets/images/Icon/detail.svg" alt="">
                                    <img v-if="currentDetail.endingMovie3"
                                        @click="qrDownload(currentDetail.endingMovie3, `結局日結局三`)" class="mission-body-icon"
                                        src="~assets/images/Icon/download.svg" alt="">
                                </div>
                            </div>
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">{{ scriptData.title }} 結局四 (鷹老師)</div>
                                <div style="display: flex;">
                                    <img v-if="currentDetail.endingMovie4" @click="videoPlay(currentDetail.endingMovie4)"
                                        class="mission-body-bgIcon" style="margin-right: 12px;"
                                        src="~assets/images/Icon/play.svg" alt="">
                                    <img @click="openContentPopup(currentDetail.endingFour)" class="mission-body-icon"
                                        style="margin-right: 12px;" src="~assets/images/Icon/detail.svg" alt="">
                                    <img v-if="currentDetail.endingMovie4"
                                        @click="qrDownload(currentDetail.endingMovie4, `結局日結局四`)" class="mission-body-icon"
                                        src="~assets/images/Icon/download.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mission-body-line"></div>
                    <div class="mission-body-head">教材檔案</div>
                    <div class="mission-body-net2">
                        <div class="mission-body-row3">
                            <div class="mission-body-row4">
                                <div class="mission-body-head3">學習單</div>
                                <!-- <a v-if="currentDetail.endingSheet" target="_blank" :href="currentDetail.endingSheet"
                                    download="sheet">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </a> -->
                                <img @click="handelDownloadPDF()" class="mission-body-icon"
                                    src="~assets/images/Icon/download.svg" alt="">
                            </div>
                            <!-- <div class="mission-body-row4">
                                <div class="mission-body-head3">教學簡報</div>
                                <a v-if="currentDetail.endingBulletin" target="_blank" :href="currentDetail.endingBulletin"
                                    download="sheet">
                                    <img class="mission-body-icon" src="~assets/images/Icon/download.svg" alt="">
                                </a>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- day end -->

            <!-- popup -->
            <!-- 編輯資料 -->
            <div v-if="isShowEdit" class="popup">
                <div @click="isShowEdit = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">編輯任務</div>
                        <div class="item-title">*任務名稱</div>
                        <div><input v-model="taskEditData.taskName" class="input" placeholder="請輸入文字" type="text"></div>
                        <div class="item-title">*選擇劇本</div>
                        <div style="margin-bottom: 16px;" class="select-container">
                            <select v-model="taskEditData.scriptId" class="select">
                                <option :value="item.value" v-for="item of scriptOption" :key="item.value">{{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="item-title">*預期參與組數</div>
                        <div><input v-model="taskEditData.estimatedParticipants" class="input" placeholder="請輸入數字"
                                type="number"></div>
                        <div class="item-title">*結束日期</div>
                        <div><input v-model="taskEditData.endTime" class="input" type="date"></div>
                        <div @click="saveTaskEdit" class="btn-green">確認</div>
                    </div>
                </div>
            </div>

            <!-- 劇情內容 -->
            <div v-if="isShowInfo" class="popup">
                <div @click="isShowInfo = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">劇情內容</div>
                        <div class="text">{{ showContent }}</div>
                        <!-- <div class="text">砰!一聲巨大的聲響，蓋過下課時教室裡嘈雜的人聲，同學們紛紛轉過頭去尋找聲音的來源。</div>
                        <div class="text">「好痛......」只見嬌小瘦弱的林曉兔跌坐在地上，正撫摸著自己瘀青的膝蓋，一旁是倒掉的課桌椅，看來就是她造成了剛剛那聲巨響。</div>
                        <div class="text">一個龐大的身影突然籠罩著林曉兔，她抬起頭，臉上浮現了害怕的表情。</div>
                        <div class="text">黑影的主人，是身型壯碩的張萌虎，正惡狠狠地瞪著林曉兔，，右腳也不斷地抖著。</div>
                        <div class="text">張萌虎說:「妳很會跑嘛，再跑給我看啊!我看妳現在往哪裡跑?」</div>
                        <div class="text">說完還用力地踹了倒掉的桌子一腳，又發出「砰!」的一聲，教室裡的人們都嚇了一大跳。</div>
                        <div class="text">「等、等一下，」林曉兔微微顫抖地說:「我剛剛只是在開玩笑，我不是故意——」</div>
                        <div class="text">砰!不等林曉兔說玩，張萌虎又踹倒了旁邊一張椅子，林曉兔發出一聲驚恐的尖叫。</div>
                        <div class="text">「開玩笑?」張萌虎咬牙切齒地說著:「所以你是在笑我?妳覺得很好玩、很好笑囉?」</div>
                        <div class="text">林曉兔嚇得低下頭，張萌虎怒吼一聲，又掀翻了一張桌子。同學們你看我、我看你，但一時沒有任何人敢有動作......</div> -->
                    </div>
                </div>
            </div>

            <!-- 填寫分數 -->
            <div v-show="isShowWrite" class="popup">
                <div @click="isShowWrite = false" class="box">
                    <div @click.stop class="block-box">
                        <div class="title">劇情內容</div>
                        <div class="mission-pop">
                            <div class="mission-pop-row">
                                <div class="mission-pop-title">第 {{ currentScoreEditDay }} 日</div>
                                <div @click="fillScoreOptionAdd(currentScoreEditDay)" class="mission-pop-add">+ 增加</div>
                            </div>
                            <div class="mission-pop-row2">
                                <div class="mission-pop-answer">學生答案</div>
                                <div class="mission-pop-answer">家長答案</div>
                            </div>
                            <div style="height:300px;overflow: auto;">
                                <div v-for="option, index in fillScoreOption" :key="option.id" class="mission-pop-row3">
                                    <div class="mission-pop-num">{{ index + 1 }}</div>
                                    <select v-model="option.stuAns" class="select mission-pop-select">
                                        <option v-for="config, i in currentScoreDetail.studentConfigs" :key="i" :value="config.id">{{
                                            `${numberToLetter(i + 1)} ${config.stuDescription}` }}</option>
                                    </select>
                                    <select v-model="option.parAns" class="select mission-pop-select">
                                        <option v-for="config, i in currentScoreDetail.parentConfigs" :key="i" :value="config.id">{{
                                            `${numberToLetter(i + 1)} ${config.parDescription}` }}</option>
                                    </select>
                                    <div @click="removeOptionItem(option)" class="mission-pop-close">-</div>
                                </div>
                            </div>

                            <div @click="sendFillScoreOption()" class="mission-pop-confirm">確認</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="centerDialog">
            <client-only>
                <el-dialog v-model="centerDialogVisible">
                    <video v-if="centerDialogVisible" :src="currentVideoUrl" controls></video>
                </el-dialog>
            </client-only>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { addScore, getScoreByTaskId, getScore, deleteScore } from "~/api/score";
import { getScriptById, getScript, downloadPDF } from "~/api/script";
import { getTaskById, edit as editTask } from "~/api/task";
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'

const endingTextOption = {
    1: 'endingOne',
    2: 'endingTwo',
    3: 'endingThree',
    4: 'endingFour',
}

const handelDownloadPDF = async () => {
    let data = {
        "media": `drama-${currentPeriod.value}`,
        "taskId": taskData.taskId,
        "sheet": `sheet-${currentPeriod.value}`
    }
    if (currentPeriod.value == scriptData.dayEnd) {
        let mediaQuadrant = !quadrant.value ? 1 : quadrant.value
        data = {
            "media": `endingMovie-${mediaQuadrant}`,
            "taskId": taskData.taskId,
            "sheet": `endingSheet`
        }
    }
    let pdfData = await downloadPDF(data)
    let pdfUrl = pdfData.data.value.data
    var a = document.createElement('a');
    a.href = pdfUrl;
    a.click();
    window.URL.revokeObjectURL(url);
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

const downloadFile = (url) => {
    fetch('https://storage.cloud.google.com/wasupstudio-bucket/1692752760483.png', {
        mode: 'no-cors', // 必要设置，解决跨域
    }).then(async res => {
        let blob = await res.blob()
        return blob
    }).then((blob) => {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        a.download = 'filename'
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    })
}

const isAllScoreFill = ref(false)
const checkAllScoreFill = () => {
    let check = true
    let allFillPeriod = score.map(o => o.period)
    for (let index = 0; index < scriptData.day; index++) {
        let isExist = allFillPeriod.includes(index + 1)
        check = check && isExist
    }
    isAllScoreFill.value = check
}

let score = reactive([])
let scoreLength = ref(0)
const setScore = async () => {
    let { data } = await getScoreByTaskId(missionId)
    score.length = 0
    score.push(...(data.value.data.list))
    scoreLength.value = score.length
    checkAllScoreFill()
}

const currentScoreEditDay = ref("")
const fillScoreOption = reactive([])
const openFillScoreModel = (day = "") => {
    isShowWrite.value = true
    fillScoreOption.length = 0
    let dday
    if (day == "") {
        dday = currentPeriod.value
    } else {
        dday = day
    }
    setCurrentScoreDetail(dday)
    currentScoreEditDay.value = dday
    let score = getScoreByCurrentPeriod(dday)
    for (let index = 0; index < taskData.estimatedParticipants; index++) {
        if (score.length < index + 1) {
            fillScoreOption.push({
                "id": Math.random().toString(36),
                "taskId": taskData.taskId,
                "period": dday,
                "scriptId": scriptId.value,
                "parAns": null,
                "stuAns": null,
                "questionId": null
            })
        } else {
            let data = score[index];
            fillScoreOption.push({
                "id": Math.random().toString(36),
                "taskId": taskData.taskId,
                "period": dday,
                "scriptId": scriptId.value,
                "parAns": data.parAns,
                "stuAns": data.stuAns,
                "questionId": data.questionId
            })
        }
    }
}
const fillScoreOptionLength = ref(0)
const fillScoreOptionAdd = (day = "") => {
    let dday
    if (day == "") {
        dday = currentPeriod.value
    } else {
        dday = day
    }
    let numberOfPeople = taskData.estimatedParticipants
    if (fillScoreOption.length < numberOfPeople) {
        fillScoreOption.push({
            "id": Math.random().toString(36),
            "taskId": taskData.taskId,
            "period": dday,
            "scriptId": scriptId.value,
            "parAns": "",
            "stuAns": ""
        })
    }
}
const removeOptionItem = async (score) => {
    let index = fillScoreOption.findIndex(item => item.id === score.id);
    if (index !== -1) {
        fillScoreOption.splice(index, 1);
    }
    if (score.hasOwnProperty("questionId")) {
        await deleteScore(score.questionId)
    }
}
const sendFillScoreOption = async () => {
    fillScoreOption.forEach(obj => {
        delete obj["id"]
    });
    await addScore(JSON.parse(JSON.stringify(fillScoreOption)))
    isShowWrite.value = false
    ElMessage({
        message: '儲存成功',
        type: 'success',
    })

    await setScore()
    await setScoreList(JSON.parse(JSON.stringify(currentScoreDetail)))
    if (scriptData.dayEnd == currentPeriod.value) {
        setScoreOverview()
    }
    fillScoreOption.length = 0
}

const route = useRoute();
const missionId = route.params.missionId
const taskData = reactive({})
const taskEditData = reactive({})
const scriptId = ref('')
const init = async () => {
    const { data } = await getTaskById(missionId)
    Object.assign(taskData, JSON.parse(JSON.stringify(data.value.data)))
    Object.assign(taskEditData, JSON.parse(JSON.stringify(data.value.data)))
    taskEditData.endTime = taskEditData.endTime.split(' ')[0]
    taskData.createTimeStr = dayjs(taskData.createTime).format('YYYY/MM/DD')
    taskData.endTimeStr = dayjs(taskData.endTime).format('YYYY/MM/DD')
    scriptId.value = taskData.scriptId
    await setScriptData()
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

// 依據“日”取得評分
const getScoreByCurrentPeriod = (dday) => {
    let filterData = score.filter(o => o.scriptId == scriptData.scriptId && o.taskId == taskData.taskId && o.period == dday)
    return filterData
}

const isEdit = JSON.parse(route.params.isEdit)
const scriptData = reactive({})
const statusMap = {
    0: '開啟任務',
    1: '進行中',
    2: '完成(包含結束)',
}
const dayjs = useDayjs()
const setScriptData = async () => {
    const { data } = await getScriptById(scriptId.value)
    Object.assign(scriptData, JSON.parse(JSON.stringify(data.value.data)))
    scriptData.hasImg = getFileUrl(scriptData.mediaDTO, 'cover') !== false
    scriptData.day = parseInt(scriptData.scriptPeriod, 10) - 1;
    scriptData.dayEnd = parseInt(scriptData.scriptPeriod, 10);
    if (scriptData.hasImg) {
        scriptData.imgUrl = getFileUrl(scriptData.mediaDTO, 'cover')
    }
    scriptData.scriptDetail.forEach(detail => {
        detail.sheet = getFileUrl(scriptData.mediaDTO, `sheet-${detail.period}`)
        detail.bulletin = getFileUrl(scriptData.mediaDTO, `bulletin-${detail.period}`)
        detail.information = getFileUrl(scriptData.mediaDTO, `information-${detail.period}`)
        detail.drama = getFileUrl(scriptData.mediaDTO, `drama-${detail.period}`)

    });

    scriptData.scriptEndingDTO.endingMovie1 = getFileUrl(scriptData.mediaDTO, `endingMovie1`)
    scriptData.scriptEndingDTO.endingMovie2 = getFileUrl(scriptData.mediaDTO, `endingMovie2`)
    scriptData.scriptEndingDTO.endingMovie3 = getFileUrl(scriptData.mediaDTO, `endingMovie3`)
    scriptData.scriptEndingDTO.endingMovie4 = getFileUrl(scriptData.mediaDTO, `endingMovie4`)
    scriptData.scriptEndingDTO.endingSheet = getFileUrl(scriptData.mediaDTO, `endingSheet`)
    scriptData.scriptEndingDTO.endingBulletin = getFileUrl(scriptData.mediaDTO, `endingBulletin`)
    nextTick(() => {
        missionHeadClick(1)
        setCurrentDetail(1)
        setCurrentScoreDetail(1)
    })
}

const isShowInfo = ref(false)
const showContent = ref("")
const openContentPopup = (content) => {
    isShowInfo.value = true
    showContent.value = content
}

const isVideoPlay = ref(false)
const onVideoPlay = () => {
    isVideoPlay.value = true
}

const onVideoPause = () => {
    isVideoPlay.value = false
}

const currentVideoUrl = ref("")
const centerDialogVisible = ref(false)
const videoPlay = (url) => {
    currentVideoUrl.value = url
    centerDialogVisible.value = true
}

const getFileUrl = (fileList, target) => {
    let filterFile = fileList.filter(o => o.description == target)
    if (filterFile.length > 0) {
        return filterFile[0].filePath
    }
    return false
}

const selectedMission = ref(0)
const missionHeadClick = (id) => {
    if (selectedMission.value === id) {
        return;
    }

    var contentElement = document.getElementById(`mission-head2-${selectedMission.value}`);
    if (contentElement) {
        contentElement.classList.remove("mission-head2-selected");
    }

    selectedMission.value = id;
    contentElement = document.getElementById(`mission-head2-${id}`);
    if (contentElement) {
        contentElement.classList.add("mission-head2-selected");
    }

    setCurrentDetail(id)
    setCurrentScoreDetail(id)

    if (scriptData.dayEnd == id) {
        setScoreOverview()
    }
}

let allTotal = reactive({
    orderly: 0,
    relation: 0
})
const quadrantOption = {
    1: "結局一 (鴞老師)",
    2: "結局二 (鴿老師)",
    3: "結局三 (鴉老師)",
    4: "結局四 (鷹老師)"
}
const quadrant = ref(null)
const totalList = reactive([])
const setScoreOverview = async () => {
    totalList.length = 0
    allTotal.orderly = 0
    allTotal.relation = 0
    for (let index = 1; index <= scriptData.day; index++) {
        let detail = getDetailByPeriod(index)
        let scoreTotal = await setScoreList(detail)
        let orderly = scoreTotal.stuTotal.orderly + scoreTotal.parTotal.orderly
        let relation = scoreTotal.stuTotal.relation + scoreTotal.parTotal.relation
        totalList.push({
            period: index,
            orderly: orderly,
            relation: relation
        })
        allTotal.orderly += orderly
        allTotal.relation += relation
    }
    if (allTotal.orderly == 0) {
        allTotal.orderly = 1
    }
    if (allTotal.relation == 0) {
        allTotal.relation = 1
    }
    setEndQuadrant(allTotal.orderly, allTotal.relation)
}

const setEndQuadrant = (orderly, relation) => {
    if (orderly > 0 && relation > 0) {
        quadrant.value = 1
    } else if (orderly < 0 && relation > 0) {
        quadrant.value = 2
    } else if (orderly < 0 && relation < 0) {
        quadrant.value = 3
    } else if (orderly > 0 && relation < 0) {
        quadrant.value = 4
    }
}

const getDetailByPeriod = (period) => {
    let filterData = scriptData.scriptDetail.filter(o => o.period == period)
    if (filterData.length > 0) {
        return filterData[0]
    }
    return null
}

const currentScoreDetail = reactive({})
const setCurrentScoreDetail = async (period) => {
    for (let key in currentScoreDetail) {
        delete currentScoreDetail[key];
    }
    if (period == scriptData.dayEnd) {
        Object.assign(currentScoreDetail, scriptData.scriptEndingDTO)
    } else {
        let filterData = scriptData.scriptDetail.filter(o => o.period == period)
        
        if (filterData.length > 0) {
            Object.assign(currentScoreDetail, filterData[0])
        }
    }
}

const currentPeriod = ref(1)
const currentDetail = reactive({})
const setCurrentDetail = async (period) => {

    for (let key in currentDetail) {
        delete currentDetail[key];
    }
    currentPeriod.value = period
    if (period == scriptData.dayEnd) {
        Object.assign(currentDetail, scriptData.scriptEndingDTO)
    } else {
        let filterData = scriptData.scriptDetail.filter(o => o.period == period)
        if (filterData.length > 0) {
            Object.assign(currentDetail, filterData[0])
        }
    }
    await setScoreList(currentDetail)
}
let stuList = reactive([])
let parList = reactive([])
let stuTotal = reactive({
    orderly: 0,
    relation: 0
})
let parTotal = reactive({
    orderly: 0,
    relation: 0
})
const setScoreList = async (detail) => {
    let stuDatas = detail.studentConfigs.map(o => {
        return {
            id: o.id,
            text: o.stuDescription,
            orderly: o.stuOrderly,
            relation: o.stuRelation,
            count: 0
        }
    })
    let parDatas = detail.parentConfigs.map(o => {
        return {
            id: o.id,
            text: o.parDescription,
            orderly: o.parOrderly,
            relation: o.parRelation,
            count: 0
        }
    })
    for (let item of score) {
        let stuId = parseInt(item.stuAns, 10);
        let parId = parseInt(item.parAns, 10);
        let stuItem = stuDatas.find(obj => obj.id === stuId);
        if (stuItem) {
            stuItem.count++;
        }

        let parItem = parDatas.find(obj => obj.id === parId);
        if (parItem) {
            parItem.count++;
        }
    }
    stuList.length = 0
    parList.length = 0
    stuList.push(...stuDatas)
    parList.push(...parDatas)
    stuTotal.orderly = 0
    stuTotal.relation = 0
    stuDatas.forEach(o => {
        stuTotal.orderly += o.count * o.orderly
        stuTotal.relation += o.count * o.relation

    })
    parTotal.orderly = 0
    parTotal.relation = 0
    parList.forEach(o => {
        parTotal.orderly += o.count * o.orderly
        parTotal.relation += o.count * o.relation
    })
    return {
        stuTotal: stuTotal,
        parTotal: parTotal,
    }

}
const allScript = reactive([])
const scriptOption = reactive([])
async function setAllScript() {
    const { data } = await getScript()
    let list = JSON.parse(JSON.stringify(data.value.data.list))
    // list = list.filter(o => o.status !== 0)
    allScript.length = 0
    allScript.push(...list)
    scriptOption.length = 0
    allScript.forEach(res => {
        scriptOption.push({
            text: res.title,
            value: res.scriptId
        })
    })
}


async function saveTaskEdit() {
    isShowEdit.value = false

    taskEditData.endTime = dayjs(taskEditData.endTime).format('YYYY-MM-DD HH:mm:ss')
    if (taskEditData.taskName === '') {
        ElMessage({
            message: '請輸入任務名稱！',
            type: 'warning',
        })
    } else if (taskEditData.scriptId === '') {
        ElMessage({
            message: '請選擇劇本！',
            type: 'warning',
        })
    } else if (taskEditData.estimatedParticipants === '') {
        ElMessage({
            message: '請輸入預期參與組數！',
            type: 'warning',
        })
    } else if (taskEditData.endTime === '') {
        ElMessage({
            message: '請輸入結束日期！',
            type: 'warning',
        })
    } else {
        await editTask(taskEditData.taskId, taskEditData).then((res) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            })
            init()
        }).catch(() => {
            ElMessage.error('更新失敗')
        })
    }
}


const isShowEdit = ref(false)
const isShowVideo = ref(false)

const isShowWrite = ref(false)

nextTick(() => {
    setScore()
    init()
    setAllScript()
})

</script>

<style lang="scss" scoped>
@import '~/assets/styles/popup.scss';
@import '~/assets/styles/form.scss';
@import '~/assets/styles/manage.scss';
@import '~/assets/styles/table.scss';

.backfill {
    cursor: pointer;
    display: flex;
    height: 40px;
    width: 160px;
    margin-top: 10px;
    padding: 5px 12px;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border-radius: 50px;
    border: 1px solid var(--primary-color-1, #008B77);
    background: var(--primary-color-1, #008B77);
    color: var(--secondary-color-2, #FFF);
    font-family: Noto Sans TC;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 1px;
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

    &-body {
        width: 928px;
        margin-top: 20px;
    }

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
            white-space: pre-line;
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
            margin-right: 110px;
        }

        &-sum2 {
            margin-right: 136px;
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
            margin-right: 111px;
            font-size: 24px;
            color: white;
        }

        &-num3 {
            margin-right: 132px;
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
    }

}
</style>