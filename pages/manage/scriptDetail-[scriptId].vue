<template>
    <NuxtLayout name="custom">
        <div class="step">
            <div class="step-script-head">
                <nuxt-link to="/manage/script" class="step-script-head-leave"><div style="display:flex;align-items: center;"><img src="@/assets/images/Icon/arrow-left.svg"> 返回列表</div></nuxt-link>
                <div class="step-script-head-route">
                    <nuxt-link :to='`/manage/scriptSetting-${scriptId}`' class="step-script-head-route2">基本設定</nuxt-link>
                    <nuxt-link :to='`/manage/scriptDetail-${scriptId}`' class="step-script-head-route1">詳細內容</nuxt-link>
                </div>
                <div class="step-script-head-setting">
                    <div class="step-script-head-sub">啟用狀態：</div>
                    <el-switch v-model="isUsed" @change="statusChange" active-text="開啟" inactive-text="">
                    </el-switch>
                </div>
            </div>

            <!-- body -->
            <div class="step-script-edit-row">
                <div class="step-script-edit-title">詳細內容</div>
                <div v-if="isEdited" @click="isEdited = false" class="step-script-edit-edit">編輯</div>
                <div v-else class="step-script-edit-row2">
                    <div @click="store" class="step-script-edit-store">儲存</div>
                    <div @click="isEdited = true" class="step-script-edit-cancel">取消</div>
                </div>
            </div>

            <!-- body content -->

            <div v-for="detail in scriptDetail" :key="detail.scriptDetilId" v-if="isEdited" class="step-day">
                <div @click="toggleContent(detail.period)" class="step-day-head-row">
                    <div class="step-day-head">第 {{ detail.period }} 日</div>
                    <div class="step-day-up">^</div>
                </div>

                <div class="step-day-box" :id="`content-${detail.period}`">
                    <div class="step-day-row3">
                        <div class="step-day-title5">建議時間</div>
                        <div class="step-day-text">{{ detail.advisoryTime }} 分鐘</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">帶領方式說明</div>
                        <div class="step-day-text">{{ detail.description }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">本日劇情</div>
                        <div class="step-day-text">{{ detail.todayScript }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">額外資訊</div>
                        <div>
                            <div v-for="info, index in detail.additionalInfo" :key="index" class="step-day-text">資訊{{
                                index + 1
                            }}
                                {{ info }}</div>
                        </div>
                    </div>

                    <div class="step-day-row3">
                        <div class="step-day-title5">學生問題討論</div>
                        <div class="step-day-green">
                            <div class="step-day-green-row">
                                <div class="step-day-green-question">？</div>
                                <div class="step-day-green-head">{{ detail.stuContent }}</div>
                            </div>
                            <div v-for="config, index in detail.studentConfigs" class="step-day-green-content">
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
                                <div class="step-day-green-head">{{ detail.parContent }} </div>
                            </div>
                            <div v-for="config, index in detail.parentConfigs" class="step-day-green-content">
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
                                <span v-if="judgeHasFile(`drama-${detail.period}`)">{{ judgeHasFile(`drama-${detail.period}`) }}</span>
                                <img v-if="judgeHasFile(`drama-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title3">學習單</div>
                                <span v-if="judgeHasFile(`sheet-${detail.period}`)">{{ judgeHasFile(`sheet-${detail.period}`) }}</span>
                                <img v-if="judgeHasFile(`sheet-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div v-if="detail.period == 1" class="step-day-line"></div>
                            <div v-if="detail.period == 1"  class="step-day-row">
                                <div class="step-day-title3">教學簡報</div>
                                <span v-if="judgeHasFile(`bulletin-${detail.period}`)">{{ judgeHasFile(`bulletin-${detail.period}`) }}</span>
                                <img v-if="judgeHasFile(`bulletin-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title3">額外資訊</div>
                                <span v-if="judgeHasFile(`information-${detail.period}`)">{{ judgeHasFile(`information-${detail.period}`) }}</span>
                                <img v-if="judgeHasFile(`information-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- 結局日 -->
            <div v-if="isEdited" class="step-day">
                <div class="step-day-head-row">
                    <div class="step-day-head">第 {{ scriptData.scriptPeriod }} 日 (結局日)</div>
                    <div class="step-day-up">^</div>
                </div>

                <div class="step-day-box">
                    <div class="step-day-row3">
                        <div class="step-day-title5">建議時間</div>
                        <div class="step-day-text">{{ scriptEnding.advisoryTime }} 分鐘</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">帶領方式說明</div>
                        <div class="step-day-text">{{ scriptEnding.endingDescription }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">結局一描述 (鴞老師)</div>
                        <div class="step-day-text">{{ scriptEnding.endingOne }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">結局二描述 (鴿老師)</div>
                        <div class="step-day-text">{{ scriptEnding.endingTwo }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">結局三描述 (鴉老師)</div>
                        <div class="step-day-text">{{ scriptEnding.endingThree }}</div>
                    </div>
                    <div class="step-day-row3">
                        <div class="step-day-title5">結局四描述 (鷹老師)</div>
                        <div class="step-day-text">{{ scriptEnding.endingFour }}</div>
                    </div>

                    <div class="step-day-row3">
                        <div class="step-day-title5">結局影片</div>
                        <div class="step-day-net">
                            <div class="step-day-row">
                                <div class="step-day-title">結局一 (鴞老師) 影片</div>
                                <span v-if="judgeHasFile(`endingMovie-1`)">{{ judgeHasFile(`endingMovie-1`) }}</span>
                                <img v-if="judgeHasFile(`endingMovie-1`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title">結局二 (鴿老師) 影片</div>
                                <span v-if="judgeHasFile(`endingMovie-2`)">{{ judgeHasFile(`endingMovie-2`) }}</span>
                                <img v-if="judgeHasFile(`endingMovie-2`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title">結局三 (鴉老師) 影片</div>
                                <span v-if="judgeHasFile(`endingMovie-3`)">{{ judgeHasFile(`endingMovie-3`) }}</span>
                                <img v-if="judgeHasFile(`endingMovie-3`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title">結局四 (鷹老師) 影片</div>
                                <span v-if="judgeHasFile(`endingMovie-4`)">{{ judgeHasFile(`endingMovie-4`) }}</span>
                                <img v-if="judgeHasFile(`endingMovie-4`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                        </div>
                    </div>

                    <div class="step-day-row3">
                        <div class="step-day-title5">教材檔案</div>
                        <div class="step-day-net">
                            <div class="step-day-row">
                                <div class="step-day-title">學習單</div>
                                <img v-if="judgeHasFile(`endingSheet`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                            </div>
                            <div class="step-day-line"></div>
                            <!-- <div class="step-day-row">
                                <div class="step-day-title">學習簡報</div>
                                <img v-if="judgeHasFile(`endingBulletin`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
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
                                    <div class="step-day-test3" style="margin-right: 10px;">{{
                                        plusOrMinus[scriptEnding.orderlyOne] }}</div>
                                    <div class="step-day-test2">關係：</div>
                                    <div class="step-day-test3">{{ plusOrMinus[scriptEnding.relationOne] }}</div>
                                </div>
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title">結局二 (鴿老師)</div>
                                <div class="step-day-row2">
                                    <div class="step-day-test2">秩序：</div>
                                    <div class="step-day-test3" style="margin-right: 10px;">{{
                                        plusOrMinus[scriptEnding.orderlyTwo] }}</div>
                                    <div class="step-day-test2">關係：</div>
                                    <div class="step-day-test3">{{ plusOrMinus[scriptEnding.relationTwo] }}</div>
                                </div>
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title">結局三 (鴉老師)</div>
                                <div class="step-day-row2">
                                    <div class="step-day-test2">秩序：</div>
                                    <div class="step-day-test3" style="margin-right: 10px;">{{
                                        plusOrMinus[scriptEnding.orderlyThree] }}</div>
                                    <div class="step-day-test2">關係：</div>
                                    <div class="step-day-test3">{{ plusOrMinus[scriptEnding.relationThree] }}</div>
                                </div>
                            </div>
                            <div class="step-day-line"></div>
                            <div class="step-day-row">
                                <div class="step-day-title">結局四 (鷹老師)</div>
                                <div class="step-day-row2">
                                    <div class="step-day-test2">秩序：</div>
                                    <div class="step-day-test3" style="margin-right: 10px;">{{
                                        plusOrMinus[scriptEnding.orderlyFour] }}</div>
                                    <div class="step-day-test2">關係：</div>
                                    <div class="step-day-test3">{{ plusOrMinus[scriptEnding.relationFour] }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-day-grey">若計分結果未有正、負面傾向性，則以正面作為結果。</div>


                </div>
            </div>

            <!-- 編輯狀態 -->

            <div v-for="detail in editScriptDetail" :key="detail.scriptDetilId" v-if="!isEdited" class="step-day">
                <div @click="toggleContent(detail.period + 'edit')" class="step-day-head-row">
                    <div class="step-day-head-text">第 {{ detail.period }} 日</div>
                    <div class="step-day-head-up">^</div>
                </div>

                <div class="step-day-box" :id="`content-${detail.period}edit`">
                    <div class="step-day-title">*建議進行時間</div>
                    <input v-model="detail.advisoryTime" class="input step-day-input" type="number">
                    <div class="step-day-title">*帶領方式說明</div>
                    <textarea v-model="detail.description" class="input step-day-textarea" type="text"></textarea>
                    <div class="step-day-title">*本日劇情</div>
                    <textarea v-model="detail.todayScript" class="input step-day-textarea" type="text"></textarea>

                    <div class="step-day-row">
                        <div class="step-day-title3">*額外資訊</div>
                        <div @click="addOneItem(detail.period, 'additionalInfo')" class="step-day-add">＋增加</div>
                    </div>
                    <div v-for="info in detail.additionalInfo" :key="info.tempId" class="step-day-row2">
                        <input v-model="info.text" class="input step-day-input2" placeholder="請輸入說明文字" type="text">
                        <div @click="deleteOneItem(detail.period, 'additionalInfo', info.tempId)" class="step-day-close">-
                        </div>
                    </div>

                    <!-- 學生 -->
                    <div class="step-day-title2">學生討論內容</div>
                    <div class="step-day-net">
                        <div class="step-day-title">*學生討論題目</div>
                        <input v-model="detail.stuContent" class="input step-day-input1" placeholder="請輸入題目描述" type="text">
                        <div class="step-day-line"></div>

                        <div class="step-day-row">
                            <div class="step-day-title">*學生題目選項</div>
                            <div @click="addOneItem(detail.period, 'studentConfigs')" class="step-day-add">＋增加</div>
                        </div>
                        <div v-for="config in detail.studentConfigs" :key="config.tempId" class="step-day-row2">
                            <input v-model="config.stuDescription" class="input step-day-input3" placeholder="請輸入選項描述"
                                type="text">
                            <div class="step-day-title3">秩序</div>
                            <div class="step-day-container">
                                <select v-model="config.stuOrderly" class="select">
                                    <option :value="3">3</option>
                                    <option :value="2">2</option>
                                    <option :value="1">1</option>
                                    <option :value="0">0</option>
                                    <option :value="-1">-1</option>
                                    <option :value="-2">-2</option>
                                    <option :value="-3">-3</option>
                                </select>
                            </div>
                            <div class="step-day-title3">關係</div>
                            <div class="step-day-container">
                                <select v-model="config.stuRelation" class="select">
                                    <option :value="3">3</option>
                                    <option :value="2">2</option>
                                    <option :value="1">1</option>
                                    <option :value="0">0</option>
                                    <option :value="-1">-1</option>
                                    <option :value="-2">-2</option>
                                    <option :value="-3">-3</option>
                                </select>
                            </div>
                            <div @click="deleteOneItem(detail.period, 'studentConfigs', config.tempId)"
                                class="step-day-close">-
                            </div>
                        </div>
                    </div>

                    <!-- 家長 -->
                    <div class="step-day-title2">家長討論內容</div>
                    <div class="step-day-net">
                        <div class="step-day-title">*家長討論題目</div>
                        <input v-model="detail.parContent" class="input step-day-input1" placeholder="請輸入題目描述" type="text">
                        <div class="step-day-line"></div>

                        <div class="step-day-row">
                            <div class="step-day-title">*家長題目選項</div>
                            <div @click="addOneItem(detail.period, 'parentConfigs')" class="step-day-add">＋增加</div>
                        </div>
                        <div v-for="config in detail.parentConfigs" :key="config.tempId" class="step-day-row2">
                            <input v-model="config.parDescription" class="input step-day-input3" placeholder="請輸入選項描述"
                                type="text">
                            <div class="step-day-title3">秩序</div>
                            <div class="step-day-container">
                                <select v-model="config.parOrderly" class="select">
                                    <option :value="3">3</option>
                                    <option :value="2">2</option>
                                    <option :value="1">1</option>
                                    <option :value="0">0</option>
                                    <option :value="-1">-1</option>
                                    <option :value="-2">-2</option>
                                    <option :value="-3">-3</option>
                                </select>
                            </div>
                            <div class="step-day-title3">關係</div>
                            <div class="step-day-container">
                                <select v-model="config.parRelation" class="select">
                                    <option :value="3">3</option>
                                    <option :value="2">2</option>
                                    <option :value="1">1</option>
                                    <option :value="0">0</option>
                                    <option :value="-1">-1</option>
                                    <option :value="-2">-2</option>
                                    <option :value="-3">-3</option>
                                </select>
                            </div>
                            <div @click="deleteOneItem(detail.period, 'parentConfigs', config.tempId)"
                                class="step-day-close">-</div>
                        </div>
                    </div>

                    <div class="step-day-title2">教材檔案</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title3">劇情影片</div>
                            <span v-if="judgeHasFile(`drama-${detail.period}`)">{{judgeHasFile(`drama-${detail.period}`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`drama-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('drama', detail.period)" class="step-day-upload">上傳</div>
                                <input type="file" :id="`drama-${detail.period}`" style="display: none;"
                                    @change="changeFile" :data-period="detail.period" data-ref="drama">
                            </div>

                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title3">學習單</div>
                            <span v-if="judgeHasFile(`sheet-${detail.period}`)">{{judgeHasFile(`sheet-${detail.period}`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`sheet-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('sheet', detail.period)" class="step-day-upload">上傳</div>
                                <input type="file" :id="`sheet-${detail.period}`" style="display: none;"
                                    @change="changeFile" :data-period="detail.period" data-ref="sheet">
                            </div>
                        </div>
                        <div  v-if="detail.period == 1" class="step-day-row">
                            <div class="step-day-title3">教學簡報</div>
                            <span v-if="judgeHasFile(`bulletin-${detail.period}`)">{{judgeHasFile(`bulletin-${detail.period}`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`bulletin-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('bulletin', detail.period)" class="step-day-upload">上傳</div>
                                <input type="file" :id="`bulletin-${detail.period}`" style="display: none;"
                                    @change="changeFile" :data-period="detail.period" data-ref="bulletin">
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title3">額外資訊</div>
                            <span v-if="judgeHasFile(`information-${detail.period}`)">{{judgeHasFile(`information-${detail.period}`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`information-${detail.period}`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('information', detail.period)" class="step-day-upload">上傳</div>
                                <input type="file" :id="`information-${detail.period}`" style="display: none;"
                                    @change="changeFile" :data-period="detail.period" data-ref="information">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 結局日 -->
            <div v-if="!isEdited" class="step-day">
                <div class="step-day-head-row">
                    <div class="step-day-head-text">第 {{ scriptData.scriptPeriod }} 日 (結局日)</div>
                    <div class="step-day-head-up">^</div>
                </div>

                <div class="step-day-box">
                    <div class="step-day-title">*建議進行時間（分鐘）</div>
                    <input v-model="editEnding.advisoryTime" class="input step-day-input" placeholder="ex.1 分鐘"
                        type="number">
                    <div class="step-day-title">*帶領方式說明</div>
                    <textarea v-model="editEnding.endingDescription" class="input step-day-textarea" placeholder="請輸入帶領方式說明"
                        type="text"></textarea>
                    <div class="step-day-title">*結局一描述 (鴞老師)</div>
                    <textarea v-model="editEnding.endingOne" class="input step-day-textarea" placeholder="請輸入描述內容"
                        type="text"></textarea>
                    <div class="step-day-title">*結局二描述 (鴿老師)</div>
                    <textarea v-model="editEnding.endingTwo" class="input step-day-textarea" placeholder="請輸入描述內容"
                        type="text"></textarea>
                    <div class="step-day-title">*結局三描述 (鴉老師)</div>
                    <textarea v-model="editEnding.endingThree" class="input step-day-textarea" placeholder="請輸入描述內容"
                        type="text"></textarea>
                    <div class="step-day-title">*結局四描述 (鷹老師)</div>
                    <textarea v-model="editEnding.endingFour" class="input step-day-textarea" placeholder="請輸入描述內容"
                        type="text"></textarea>

                    <div class="step-day-title2">結局影片</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title3">結局一 (鴞老師) 影片</div>
                            <span v-if="judgeHasFile(`endingMovie-1`)">{{judgeHasFile(`endingMovie-1`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`endingMovie-1`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('endingMovie-1', 'end')" class="step-day-upload">上傳</div>
                                <input type="file" id="endingMovie-1" style="display: none;" @change="changeFile"
                                    data-period="end" data-ref="endingMovie-1">
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title3">結局二 (鴿老師) 影片</div>
                            <span v-if="judgeHasFile(`endingMovie-2`)">{{judgeHasFile(`endingMovie-2`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`endingMovie-2`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('endingMovie-2', 'end')" class="step-day-upload">上傳</div>
                                <input type="file" id="endingMovie-2" style="display: none;" @change="changeFile"
                                    data-period="end" data-ref="endingMovie-2">
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title3">結局三 (鴉老師) 影片</div>
                            <span v-if="judgeHasFile(`endingMovie-3`)">{{judgeHasFile(`endingMovie-3`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`endingMovie-3`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('endingMovie-3', 'end')" class="step-day-upload">上傳</div>
                                <input type="file" id="endingMovie-3" style="display: none;" @change="changeFile"
                                    data-period="end" data-ref="endingMovie-3">
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title3">結局四 (鷹老師) 影片</div>
                            <span v-if="judgeHasFile(`endingMovie-4`)">{{judgeHasFile(`endingMovie-4`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`endingMovie-4`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('endingMovie-4', 'end')" class="step-day-upload">上傳</div>
                                <input type="file" id="endingMovie-4" style="display: none;" @change="changeFile"
                                    data-period="end" data-ref="endingMovie-4">
                            </div>
                        </div>
                    </div>

                    <div class="step-day-title2">教材檔案</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title3">學習單</div>
                            <span v-if="judgeHasFile(`endingSheet`)">{{judgeHasFile(`endingSheet`)}}</span>
                            <div class="m-flex">
                                <img v-if="judgeHasFile(`endingSheet`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('endingSheet', 'end')" class="step-day-upload">上傳</div>
                                <input type="file" id="endingSheet" style="display: none;" @change="changeFile"
                                    data-period="end" data-ref="endingSheet">
                            </div>
                        </div>
                        <!-- <div class="step-day-row">
                            <div class="step-day-title3">教學簡報</div>
                            <div class="m-flex">
                                <span v-if="judgeHasFile(`endingBulletin`)">{{ judgeHasFile(`endingBulletin`) }}</span>
                                <img v-if="judgeHasFile(`endingBulletin`)" class="step-day-icon"
                                    src="~/assets/images/Icon/available.svg" alt="available">
                                <div @click="chooseFile('endingBulletin', 'end')" class="step-day-upload">上傳</div>
                                <input type="file" id="endingBulletin" style="display: none;" @change="changeFile"
                                    data-period="end" data-ref="endingBulletin">
                            </div>

                        </div> -->
                    </div>

                    <div class="step-day-title2">計分設定</div>
                    <div class="step-day-net">
                        <div class="step-day-row">
                            <div class="step-day-title">結局一 (鴞老師)</div>
                            <div class="step-day-row">
                                <div class="step-day-title3">秩序</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.orderlyOne" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                                <div class="step-day-title3">關係</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.relationOne" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局二 (鴿老師)</div>
                            <div class="step-day-row">
                                <div class="step-day-title3">秩序</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.orderlyTwo" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                                <div class="step-day-title3">關係</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.relationTwo" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局三 (鴉老師)</div>
                            <div class="step-day-row">
                                <div class="step-day-title3">秩序</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.orderlyThree" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                                <div class="step-day-title3">關係</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.relationThree" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="step-day-row">
                            <div class="step-day-title">結局四 (鷹老師)</div>
                            <div class="step-day-row">
                                <div class="step-day-title3">秩序</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.orderlyFour" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                                <div class="step-day-title3">關係</div>
                                <div class="step-day-container">
                                    <select v-model="editEnding.relationFour" class="select">
                                        <option :value="0">正面</option>
                                        <option :value="1">負面</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-day-grey">若計分結果未有正、負面傾向性，則以正面作為結果。</div>

                </div>
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup>
import { getScriptById, uploadDetail, editScriptById, uploadFileById, uploadEnding } from "~/api/script";
import { ElMessage, ElLoading } from 'element-plus'

const fractionOption = {
    0: "加分",
    1: "不加分"
}
const plusOrMinus = {
    0: "正面",
    1: "負面"
}
const route = useRoute();
const scriptId = route.params.scriptId
const scriptData = reactive({})
const scriptDetail = reactive([])
const scriptEnding = reactive({})
const editEnding = reactive({})
const editScriptDetail = reactive([])
const isUsed = ref(false)
const setScriptData = async () => {
    const { data } = await getScriptById(scriptId)
    Object.assign(scriptData, JSON.parse(JSON.stringify(data.value.data)))
    Object.assign(scriptDetail, JSON.parse(JSON.stringify(data.value.data.scriptDetail)))
    Object.assign(scriptEnding, JSON.parse(JSON.stringify(data.value.data.scriptEndingDTO)))
    Object.assign(editEnding, JSON.parse(JSON.stringify(data.value.data.scriptEndingDTO)))
    Object.assign(editScriptDetail, JSON.parse(JSON.stringify(data.value.data.scriptDetail)))
    editScriptDetail.forEach(o => {
        let additionalInfoList = []
        o.additionalInfo.forEach(i => additionalInfoList.push(
            {
                text: i,
                tempId: Math.random().toString(36)
            }
        ))
        o.additionalInfo = additionalInfoList
        o.studentConfigs.forEach(i => i.tempId = Math.random().toString(36))
        o.parentConfigs.forEach(i => i.tempId = Math.random().toString(36))
    })

    isUsed.value = scriptData.status == 0
}


const onlySetScriptData = async () => {
    const { data } = await getScriptById(scriptId)
    Object.assign(scriptData, JSON.parse(JSON.stringify(data.value.data)))
}

const judgeHasFile = (description) => {
    if (scriptData.mediaDTO) {
        let filterFile = scriptData.mediaDTO.filter(o => o.description == description)
        if(filterFile.length > 0){
            return filterFile[0].filename
        }else {
            return false
        }
        
    }
    return false
}

const fileList = reactive({})
const setFileList = () => {
    let fileMediaDTO = scriptData.mediaDTO.filter(o => o.description !== "cover")
    let fileLength = scriptData.scriptPeriod - 1
}

const addOneItem = (day, item) => {
    let dayData = editScriptDetail.filter(o => o.period == day)[0]
    if (item == 'additionalInfo') {
        dayData.additionalInfo.push({
            "text": "",
            'tempId': Math.random().toString(36)
        })
    } else if (item == 'studentConfigs') {
        dayData.studentConfigs.push({
            "stuDescription": "",
            "stuOrderly": 0,
            "stuRelation": 0,
            'tempId': Math.random().toString(36)
        })
    } else if (item == 'parentConfigs') {
        dayData.parentConfigs.push({
            "parDescription": "",
            "parOrderly": 0,
            "parRelation": 0,
            'tempId': Math.random().toString(36)
        })
    }

}

const deleteOneItem = (day, item, id) => {
    let dayData = editScriptDetail.filter(o => o.period == day)[0]
    let index = dayData[item].findIndex(item => item.tempId === id);
    if (dayData[item].length == 1) {
        ElMessage({
            message: '請至少輸入一筆資料！',
            type: 'warning',
        })
    } else {
        if (index !== -1) {
            dayData[item].splice(index, 1);
        }
    }
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

const statusChange = async () => {
    scriptData.status = isUsed.value ? 0 : 1;
    await editScriptById(scriptId, scriptData)
    await setScriptData()
}

const toggleContent = (id) => {
    var contentElement = document.getElementById(`content-${id}`);
    contentElement.classList.toggle("step-day-box-expanded");
}

const handleUploadDetail = async () => {
    for (let index = 0; index < editScriptDetail.length; index++) {
        editScriptDetail[index].additionalInfo = editScriptDetail[index].additionalInfo.map(o => o.text)
        editScriptDetail[index].studentConfigs.forEach(obj => {
            delete obj["tempId"]
        });
        editScriptDetail[index].parentConfigs.forEach(obj => {
            delete obj["tempId"]
        });
        await uploadDetail(editScriptDetail[index])
    }
}

const handleUploadEnding = async () => {
    await uploadEnding(editEnding)
}

const store = async () => {
    isEdited.value = true
    await handleUploadDetail()
    await handleUploadEnding()
    ElMessage({
        message: '儲存成功',
        type: 'success',
    })
    setScriptData()
}

const chooseFile = (ref, period) => {
    let button = document.getElementById(`${ref}-${period}`);
    if (period == 'end') {
        button = document.getElementById(ref);
    }
    button.click();
}


const changeFile = async (el) => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    const period = el.target.dataset.period;
    const elRef = el.target.dataset.ref;
    const formData = new FormData();
    formData.append('file', el.target.files[0])
    if (period == 'end') {
        formData.append('description', elRef)
    } else {
        formData.append('description', `${elRef}-${period}`)
    }

    await uploadFileById(scriptId, formData)
    await onlySetScriptData()
    loading.close()
    ElMessage({
        message: '上傳成功',
        type: 'success',
    })
}

const isEdited = ref(true)
nextTick(() => {
    setScriptData()
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/step.scss';

.m-flex {
    display: flex;
}
</style>