<template>
  <NuxtLayout name="default">
    <div class="box">
      <div class="top-block">
        <div class="text-box">
          <div class="text1">共創友善校園：<br>人際衝突&nbsp; X &nbsp;預防霸凌，<br>啟動學生正面力量！</div>
          <div class="text2">打造專為國小校園設計的全新教材！
            這套教學教材包含四個引人入勝的劇本，每位角色背後都隱藏著不同的需求。透過生動的故事，學生們將在每段劇情中做出關鍵選擇，推進劇情發展，而他們的決定將共同決定故事的最終結局！
            為孩子們打造一個充滿想像力和互動的學習環境，啟發他們的思考，培養問題解決的能力。
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
        <div class="title">關於教材</div>
        <div class="text">我們已將教學所需要使用的素材全部放在網站上，包含 &nbsp;26&nbsp; 部影片、各個劇本所要用的教學簡報、學習單等，讓老師們準備課程更加便利！<br>
          透過這個課程，孩子將會認識人的『需求』，而且我們不只是告訴他們方法，還會引導他們討論如何『適當』地滿足這些需求。我們的目標是培養孩子自己發現事物、關心別人的能力。
        </div>
        <div class="item-box">
          <div v-for="data in allScript" :key="data.scriptId" class="item">
            <div class="background" :style="`background: no-repeat center/cover url(${data.imgUrl})`"></div>
            <div class="item-title"><div>{{ data.title1 }}</div><div>{{ data.title2 }}</div></div>
            <div class="item-content">{{ data.description }}</div>
            <nuxt-link :to="`/chapter-${data.scriptId}`" class="item-btn">
              <span class="btn-span">劇本介紹</span>
              <span class="arrowIcon">➔</span>
            </nuxt-link>
          </div>

        </div>
        <div class="content">
          每天發生一段故事，學生回家可以和家長一起討論，隔天回到學校，再和同學們一起決定故事如何發展。每個選擇都會影響結局唷！最後，由老師帶領大家一起聊聊劇情結局。這樣的學習方式不僅有趣，也能讓孩子在遊戲中學到更多！

        </div>
      </div>
    </div>
    <getTextbooks></getTextbooks>
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
  if (urlParams.hasOwnProperty('checkLicense') && urlParams.checkLicense){
        router.push({ path: '/mission/myList' });
    } else {
        router.push({ path: '/verificationCode' , query: { isGoogleLogin: true }})
    }
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
          align-items: start;
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
          align-items: start;
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
            height: 350px;
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
              background-image: url('../assets/images/cover_material.png');
              width: 100%;
              height: 175px;
              background-repeat: no-repeat;
              background-size: 110%;
              background-position-x: right;
              background-position-y: bottom;
              border: 1px solid $border3;
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
              margin-top: 12px;
              letter-spacing: 0.5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 80%;

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

}</style>