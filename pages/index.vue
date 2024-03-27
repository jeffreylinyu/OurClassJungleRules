<template>
  <NuxtLayout name="default">
    <div class="box">
      <div class="top-block">
        <div class="text-box">
          <div class="text1">共創友善校園：<br>人際衝突&nbsp; X &nbsp;預防霸凌，<br>啟動學生正面力量！</div>
          <div class="text2">
            打造專為國小校園設計的全新教材！<br>
            這套教學教材包含 4 個人際衝突的故事，<br>
            每位角色背後都隱藏著不同的需求。<br>
            透過生動的故事，學生們將在每段劇情中做出關鍵選擇，<br>
            推進劇情發展，而他們的決定將共同決定故事的最終結局！
          </div>
        </div>
        <div class="background"></div>
      </div>
      <div class="top-over">
        <div class="layer"></div>
      </div>
      <div class="second-block">
        <div class="item item1">
          <div class="text-box">
            <div class="text1">設計理念</div>
            <div class="text2">
              受到少子化的影響，學生在家中少有跟手足相處的機會，來到學校才開始學習跟同儕互動，面對自己的需求，用本能的生存姿態在應對，學生間一定會有衝突，學生們也在衝突間學習如何跟他人相處。但若無師長的正向引導，任由同儕間經常發生衝突，久了就容易形成霸凌。
            </div>
          </div>
          <div class="background bg1"></div>
        </div>
        <div class="item item2">
          <div class="background bg2"></div>
          <div>
            <div class="text-box">
              <div class="text3">
                近幾年教育現場不斷在推動「反霸凌」，但是缺乏好操作的教材供老師使用，老師們僅能依賴自己的經驗，卻經常心有餘而力不足，因此阿普蛙設計了這套教材，我們期待從根本來解決問題，學生們往往是因為他們想要滿足自身需求，卻使用的錯誤的方式來滿足，而造成對他人的傷害而不自知。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="second-over">
        <div class="layer"></div>
      </div>
    </div>
    <div class="third-block">
      <div class="content-box">
        <div class="title">故事內容</div>
        <div class="text">本教材共有 4 個故事，每個故事長短不一，且分別呈現了人際衝突中常見的 4 種需求。</div>
        <div class="item-box">
          <div v-for="data in newScript" :key="data.id" class="item">
            <div class="background" :class="`background-${data.id}`"
            ></div>
            <div class="item-title">{{ data.head }}</div>
            <div class="item-content">
              故事大綱：{{ data.story }}<br>
              需求類型：{{ data.type }}<br>
              操作時間：{{ data.time }}<br>
            </div>
            <div @click="videoPlay(data.video)" class="item-btn">
              <span class="btn-span">第一日影片試播</span>
              <span class="arrowIcon">➔</span>
            </div>
          </div>

        </div>

        <div class="method">
          <div class="method-head">
            <div class="method-head-title">操作方式：</div>
            <div class="method-head-sub">以《為什麼不跟我玩》為例</div>
          </div>

          <div class="method-box">
            <img class="method-img" src="~assets/images/index/class1.jpg" alt="">
            <div class="method-row">
              <div class="method-day">Day 1<br>10分鐘</div>
              <div class="method-text">
                播放故事影片，讓學生了解劇情，<br>
                並發放學習單，讓學生帶回去與家長討論。
              </div>
            </div>
            <div class="method-row">
              <div class="method-day">Day 2<br>10分鐘</div>
              <div class="method-text">
                在課堂上統計各組的答案，填入網站系統。<br>
                接著播放第二日故事影片，並發放學習單。
              </div>
            </div>
            <div class="method-row">
              <div class="method-day">Day 3<br>一節課</div>
              <div class="method-text">
                在課堂上統計各組的答案，填入網站系統。<br>
                網站將根據前 2 天的答案給出不同的結局（結局共有 4 種）。<br>
                接著發放學習單，討論結局故事中角色的需求，以及該如何因應。
              </div>
            </div>
          </div>
        </div>

        <div class="content">
          4 則故事的複雜度各不相同，所以進行天數也不同，例《萌虎怎麼了》的故事比較單純，只需要操作 2 天，適合國小中年級或老師們第一次操作；《班長是公僕還是國王》的故事最為複雜且跟學生的人際發展有關，要進行 5 天，適合國小高年級或較熟悉流程的老師操作。
        </div>

        <div class="about">
          <div class="about-head">關於結局</div>
          <div class="about-text">
            每篇故事的結局有四種，由四位老師代表不同的衝突處理方式。整班同學的選擇，將在結局時召喚其中一位老師，反映出學生在處理衝突時的傾向。<br><br>
            我們認為處理班級衝突時，需要關注學生間及師生間的「關係」，且須兼顧班級「秩序」 。從關係和秩序的兩個向度，可交織出四種象限：
          </div>
          <img class="about-img" src="~assets/images/result_rules2.png" alt="">
        </div>

      </div>

      
    </div>

    <div class="intro">
      <div class="intro-outer">
        <div class="intro-content">
          <div class="intro-row">
            <div class="intro-price">NT.1200</div>
            <div class="intro-price-old">NT.1500</div>
          </div>
          <div class="intro-text">
            *本教材可使用折扣碼<br>
            *首賣折扣碼「nobullying」，再折 300 元。<br><br>

            內含：<br>
            教學簡報 X 4<br>
            故事影片 X 26<br>
            學習單 X 14<br>
            線上計分系統<br>
            詳細操作說明
          </div>
          <div class="intro-title">***購買一套即可全班操作***</div>
          <div class="intro-text">
            ｜課程目標｜<br>
            深入了解人際衝突中的情感與需求。<br>
            探討旁觀者的力量，如何影響事件發展。<br>
            共同思考衝突事件的聰明因應策略。<br><br>

            ｜課程內容｜<br>
            戲劇體驗：融入虛構的叢林班日常，透過生動戲劇影片，一同探討角色未來的選擇。<br>
            引導反思：從角色感受與需求出發，引導深入討論合理的因應策略，讓學生更理解彼此的情感需求。
          </div>
        </div>

        <div class="intro-imgs">
          <img class="intro-img-big" src="~assets/images/index/class2.jpg" alt="">
          <div class="">
            <div class="intro-column">
              <img class="intro-img1" src="~assets/images/index/ppt.png" alt="">
              <div class="intro-sub">教學簡報檔</div>
            </div>
            <div class="intro-column">
              <img class="intro-img2" src="~assets/images/index/learn.png" alt="">
              <div class="intro-sub">學習單</div>
            </div>
          </div>
          <div class="intro-buy">立即購買</div>
        </div>
      </div>
    </div>

    <div class="new-content">
      【感謝名單】<br>
      感謝財團法人RC教育基金會支持本教材開發！<br>
      感謝基隆市中和國小、仁愛國小協助遊戲測試！<br>
      感謝蘇明進老師、杜佳憲主任、王振皓老師、陳俞君老師協助測試，並提供寶貴意見！
    </div>
    <getTextbooks></getTextbooks>
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
import { getMyTask, edit, add } from "~/api/task";
import { ElMessage } from 'element-plus'
import { getScriptByNoToken as getScript } from "~/api/script";
import { useAuthStore } from '@/store/authStore';

let urlParams = utilities.getUrlParams()
const router = useRouter()
if (!!urlParams) {
  console.log("urlParams", urlParams)
  useAuthStore().googleLogin(urlParams)
  // router.push(router.currentRoute.value.fullPath);
  if (urlParams.hasOwnProperty('checkLicense') && urlParams.checkLicense == "true"){
        router.push({ path: '/mission/myList' });
    } else {
        router.push({ path: '/verificationCode' , query: { isGoogleLogin: true }})
    }
}

const newScript = reactive([
  {
    id: '0',
    img: '../assets/images/scripts/body.jpg',
    head: '《萌虎怎麼了》',
    story: '萌虎有過動症，某天因為不滿同學的開玩笑，難以控制情緒而引發衝突。',
    type: '生理需求',
    time: '10 分鐘＋一節課',
    video: 'https://storage.googleapis.com/wasupstudio-bucket/video/1703443475693.mp4'
  },
  {
    id: '1',
    img: '../assets/images/scripts/play.jpg',
    head: '《為什麼不跟我玩》',
    story: '俏鼠想要跟同學玩，卻不知道「一直戳」同學，會讓他人感到不舒服。',
    type: '玩樂需求',
    time: '10 分鐘 x2＋一節課',
    video: 'https://storage.googleapis.com/wasupstudio-bucket/video/1703445014261.mp4'
  },
  {
    id: '2',
    img: '../assets/images/scripts/friend.jpg',
    head: '《金馬的秘密》',
    story: '金馬為了融入籃球校隊的群體，卻不知道該如何拒絕不合理的要求，反而傷害了原本要好的同學。',
    type: '同儕歸屬',
    time: '10 分鐘 x3＋一節課',
    video: 'https://storage.googleapis.com/wasupstudio-bucket/video/1703445184614.mp4'
  },
  {
    id: '3',
    img: '../assets/images/scripts/power.jpg',
    head: '《班長是公僕還是國王》',
    story: '班長為了帶領班上獲得好的班級競賽成績，與同學們制定了班規，在執行新班規的期間，逐漸累積了「民怨」。',
    type: '權力與掌握',
    time: '10分鐘 x4＋一節課',
    video: 'https://storage.googleapis.com/wasupstudio-bucket/1697747252310.mp4'
  },
])

const currentVideoUrl = ref("")
const centerDialogVisible = ref(false)
const videoPlay = (url) => {
    currentVideoUrl.value = url
    centerDialogVisible.value = true
}

const allScript = reactive([])
const setAllScript = async () => {
  const { data } = await getScript()
  // let list = JSON.parse(JSON.stringify(data.value.data.list))
  // // list = list.filter(o => o.status !== 0)
  // allScript.length = 0
  // allScript.push(...list)

  let list = JSON.parse(JSON.stringify(data.value.data));
  list = list.filter(o => o.status !== 2);
  allScript.length = 0;
  allScript.push(...list);
  allScript.forEach(scriptData => {
    scriptData.hasImg = getFileUrl(scriptData.mediaDTO, 'cover') !== false
    if (scriptData.hasImg) {
      scriptData.imgUrl = getFileUrl(scriptData.mediaDTO, 'cover')
    }
    let titleList = scriptData.title.split("-");
    scriptData.title1 = ""
    scriptData.title2 = ""
    if (titleList.length > 1) {
      scriptData.title1 = titleList[0]
      scriptData.title2 = titleList[1]
    }

  })

}

const getFileUrl = (fileList, target) => {
  let filterFile = fileList.filter(o => o.description == target)
  if (filterFile.length > 0) {
    return filterFile[0].filePath
  }
  return false
}

const allMissionData = reactive([])
const init = async () => {
  await setAllScript()
  // const { data } = await getMyTask()
  // let list = JSON.parse(JSON.stringify(data.value.data.list))
  // list = list.filter(o => o.status !== 2)
  // allMissionData.length = 0
  // list.forEach(mission => {
  //   allMissionData.push(getScriptById(mission.scriptId))
  // });


}


const getScriptById = (id) => {
  if (allScript.length > 0) {
    if (allScript.filter(o => o.scriptId == id).length > 0) {
      return allScript.filter(o => o.scriptId == id)[0]
    }
    return null
  }
  return null
}

nextTick(() => {
  init()
})
</script>

<style lang="scss" scoped>

// @import '~/assets/styles/popup.scss';

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


.box {
  width: 100%;


  .top {
    &-block {
      width: 100%;
      height: 702px;
      background-color: #fffbf4;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: 21px;
      align-items: flex-start;

      @include respond-to('phone') {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      .text-box {
        display: flex;
          align-items: flex-start;
          flex-direction: column;
          padding: 0 20px;
          margin: 50px 0 0 0;
          width: 50%;

        @include respond-to('phone') {
          margin: 40px 0 0 20px;
          width: 90%;
        }

        @include respond-to('pad') {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          padding: 0 20px;
          margin: 50px 0 0 0;
          width: 50%;
        }

        .text1 {
          font-weight: 700;
          font-size: 42px;
          color: $primary1;
          margin-bottom: 40px;
          letter-spacing: 1.5px;

          @include respond-to('phone') {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 1.5px;
            width: 70%;
          }
        }

        .text2 {
          font-weight: 400;
          font-size: 24px;
          color: $text2;
          // padding-bottom: 230px;
          letter-spacing: 0.5px;

          @include respond-to('phone') {
            font-size: 14px;
            letter-spacing: 0.5px;
            padding-bottom: 40px;
          }
        }
      }

      .background {
        background-image: url('../assets/images/cover_material.png');
        background-repeat: no-repeat;
        background-size: auto;
        background-position-x: center;
        background-position-y: center;
        width: 50%;
        height: 533px;

        @include respond-to('phone') {
          width: 95%;
          height: 400px;
          margin: auto;
          background-size: contain;
        }
      }
    }

    &-over {
      width: 100%;
      height: 106px;
      background-color: $primary3;
      overflow: hidden;
      position: relative;

      .layer {
        position: absolute;
        height: 1500px;
        width: calc(100% * 2);
        left: 50%;
        bottom: 0;
        border-radius: 50%;
        transform: translateX(-50%);
        background-color: #fffbf4;

        @include respond-to('phone') {
          height: 800px;
        }
      }
    }
  }

  .second {
    &-block {
      width: 100%;
      height: 1046px;
      background-color: $primary3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;

      .item1 {
        border-bottom: 1px solid $primary2;
      }

      .item {
        width: 930px;
        height: 496px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include respond-to('phone') {
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
        }

        .text-box {
          @include respond-to('phone') {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .text1 {
            font-weight: 700;
            font-size: 32px;
            color: $secondary1;
            margin-bottom: 32px;
            letter-spacing: 1.5px;

            @include respond-to('phone') {
              font-size: 32px;
              font-weight: 700;
              line-height: 38px;
              letter-spacing: 1.5px;
              margin-top: 36px;
            }
          }

          .text2 {
            font-weight: 400;
            font-size: 16px;
            color: $secondary2;
            letter-spacing: 0.5px;
            width: 461px;

            @include respond-to('phone') {
              width: 90%;
              font-size: 16px;
              line-height: 22px;
              letter-spacing: 0.5px;
              margin-bottom: 20px;
            }
          }

          .text3 {
            font-weight: 400;
            font-size: 16px;
            color: $secondary2;
            letter-spacing: 0.5px;
            width: 458px;

            @include respond-to('phone') {
              width: 90%;
              font-size: 16px;
              line-height: 22px;
              letter-spacing: 0.5px;
              margin-bottom: 20px;
            }
          }
        }

        .background {
          width: 384px;
          height: 384px;

          background-repeat: no-repeat;
          background-size: cover;
          background-position-x: center;
          background-position-y: center;

          @include respond-to('phone') {
            width: 100%;
            height: 237px;
            background-size: contain;
            margin-bottom: 20px;
          }
        }

        .bg1 {
          background-image: url('../assets/images/image1.png');
        }

        .bg2 {
          background-image: url('../assets/images/image2.png');
        }
      }

      .item2 {
        @include respond-to('phone') {
          display: flex;
          flex-direction: column-reverse;
        }
      }
    }

    &-over {
      width: 100%;
      height: 106px;
      background-color: $background2;
      overflow: hidden;
      //定位
      position: relative;

      .layer {
        position: absolute;
        height: 1500px;
        width: calc(100% * 2);
        left: 50%;
        bottom: 0;
        border-radius: 50%;
        transform: translateX(-50%);
        background-color: $primary3;

        @include respond-to('phone') {
          height: 800px;
        }
      }
    }
  }

  .third {
    &-block {
      width: 100%;
      padding-bottom: 50px;
      background-color: $background2;
      display: flex;
      justify-content: center;
      align-items: center;

      @include respond-to('phone') {
        height: auto;
      }

      .content-box {
        width: 1, 164px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        @include respond-to('phone') {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-weight: 700;
          font-size: 32px;
          color: $primary3;
          margin-top: 54px;
          display: flex;
          justify-content: center;
          letter-spacing: 1.5px;
        }

        .text {
          font-weight: 400;
          font-size: 16px;
          color: $text1;
          margin-top: 32px;
          display: flex;
          justify-content: center;
          letter-spacing: 0.5px;
          width: 924px;

          @include respond-to('phone') {
            width: 90%;
          }
        }

        .item-box {
          width: 1180px;
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;

          @include respond-to('phone') {
            flex-direction: column;
            width: 90%;
            align-items: center;
          }

          .item {
            min-width: 279px;
            max-width: 279px;
            margin-bottom: 15px;
            height: 500px;
            background: $secondary2;
            border: 3px solid $border4;
            border-radius: 32px;
            margin-right: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;

            @include respond-to('phone') {
              width: 100%;
              margin-bottom: 16px;
            }

            .background {
              background-color: #fffbf4;
              background-image: url('../assets/images/scripts/body.jpg');
              width: 100%;
              height: 175px;
              background-repeat: no-repeat;
              background-size: cover;
              background-position-x: center;
              background-position-y: center;
              border: 1px solid $border3;
            }

            .background-0 {
              background-image: url('../assets/images/scripts/body.jpg');
            }

            .background-1 {
              background-image: url('../assets/images/scripts/play.jpg');
            }

            .background-2 {
              background-image: url('../assets/images/scripts/friend.jpg');
            }

            .background-3 {
              background-image: url('../assets/images/scripts/power.jpg');
            }

            &-title {
              font-weight: 500;
              font-size: 16px;
              color: $text1;
              margin-top: 24px;
              letter-spacing: 0.5px;
              height: 45px;
              text-align: center;
              width: 85%;

            }

            &-content {
              font-weight: 400;
              font-size: 16px;
              color: $text2;
              margin-bottom: 5px;
              letter-spacing: 0.5px;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              width: 80%;
              height: 180px;
            }

            &-btn {
              width: 231px;
              height: 36px;
              background: $primary1;
              border-radius: 50px;
              margin-top: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              cursor: pointer;

              .btn-span {
                font-weight: 700;
                font-size: 14px;
                letter-spacing: 0.5px;
              }

              .arrowIcon {
                font-size: 14px;
                margin-left: 5px;
              }
            }
          }

        }

        .content {
          width: 1164px;
          background: $background1;
          border: 3px solid $primary1;
          border-radius: 32px;
          font-weight: 400;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 32px;
          letter-spacing: 0.5px;
          padding: 32px;

          @include respond-to('phone') {
            width: 90%;
            height: auto;
            padding: 32px;
            margin-bottom: 80px;
          }
        }
      }
    }

  }

  // 操作方式

  .method {
    max-width: 1200px;
    width: 100%;
    margin: 30px 0px;
    padding: 0px 14px;

    &-head {
      display: flex;
      font-size: 32px;
      letter-spacing: 1.5px;

      @include respond-to('phone') {
        font-size: 24px;
        flex-direction: column;
        align-items: center;
      }
    }

    &-head-title {
      color: #007362;
      font-weight: 700;
    }

    &-head-sub {
      margin-left: 0px;
    }

    &-box {
      position: relative;
      margin-top: 40px;
    }

    &-img {
      position: absolute;
      top: 0px;
      right: 50px;
      width: 400px;

      @include respond-to('phone') {
        display: none;
      }
    }

    &-row {
      display: flex;
      align-items: center;
      margin: 0px 0px 20px;

      @include respond-to('phone') {
        flex-direction: column;
        text-align: center;
      }
    }

    &-day {
      padding: 10px 20px;
      font-size: 32px;
      background-color: #FFC300;
      border-radius: 10px;
      color: white;
    }

    &-text {
      margin-left: 20px;
      font-size: 18px;

      @include respond-to('phone') {
        margin-top: 10px;
      }
    }
  }

  // 關於結局

  .about {
    max-width: 1200px;
    margin: 50px 14px 0px 14px;

    @include respond-to('phone') {
      
    }

    &-head {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #007362;
    }

    &-text {
      margin-top: 20px;
      font-size: 24px;
    }

    &-img {
      margin-top: 10px;
    }
  }

  // 介紹

  .intro {
    padding: 20px 30px 20px;
    background-color: #007362;
    color: white;
      
    @include respond-to('phone') {
      padding: 14px 14px 30px;
    }

    &-outer {
      max-width: 1200px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      
      @include respond-to('phone') {
        flex-direction: column;
      }
    }

    &-content {
      
    }

    &-row {
      display: flex;
      align-items: flex-end;
    }

    &-price {
      color: #FFC300;
      font-size: 32px;
      font-weight: bold;
    }

    &-price-old {
      margin-left: 20px;
      font-size: 24px;
    }

    &-text {
      font-size: 18px;
      line-height: 1.8;
      
      @include respond-to('phone') {
        font-size: 16px;
      }
    }

    &-title {
      margin: 20px 0px;
      color: #FFC300;
      font-size: 32px;
      font-weight: bold;
      
      @include respond-to('phone') {
        font-size: 24px;
      }
    }

    &-imgs {
      margin-top: 20px;
    }

    &-img-big {
      width: 300px;
      margin: auto;
      
      @include respond-to('phone') {
        width: 100%;
      }
    }

    &-img1 {
      width: 300px;
      margin: auto;
      
      @include respond-to('phone') {
        width: 90%;
      }

    }

    &-img2 {
      width: 200px;
      margin: auto;
      
      @include respond-to('phone') {
        width: 90%;
      }

    }

    &-column {
      margin: 30px 10px 0px;
    }

    &-sub {
      margin-top: 14px;
      text-align: center;
      font-size: 18px;
    }

    &-buy {
      margin: 32px auto 0px;
      width: 149px;
      height: 56px;
      background: #FFC300;
      color: black;
      border-radius: 50px;
      font-weight: 700;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 1px;
      cursor: pointer;
    }
  }

  .new-content {
    max-width: 1164px;
    width: 100%;
    background: #FFFBF4;
    border: 3px solid #008B77;
    border-radius: 32px;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px auto;
    letter-spacing: 0.5px;
    padding: 32px;

    @include respond-to('phone') {
      width: 90%;
      height: auto;
      padding: 32px;
      margin-bottom: 36px;
    }

  }

}</style>