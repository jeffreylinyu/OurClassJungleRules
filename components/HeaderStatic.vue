<template>
  <div class="box">
    <PaidMemberDialog v-model="isPaidMemberDialogShow"></PaidMemberDialog>
    <nuxt-link class="title" to="/">
      <div>我們班的叢林法則</div>
    </nuxt-link>
    <div class="item">
      <nuxt-link to="/" class="link" :class="{ 'link-action': routeName == 'index' }">
        首頁
        <div v-if="routeName == 'index'" class="decoration"></div>
      </nuxt-link>
      <div class="link sublink" :class="{ 'link-action': routeName == 'chapter' }">
        劇本介紹 ▾
        <div v-if="routeName == 'chapter'" class="decoration"></div>
        <div class="subbox">
          <div class="arrow"></div>
          <div class="submenu">
            <nuxt-link v-for="data in allScript" :key="data.scriptId" :to="`/chapter-${data.scriptId}`">
              <div class="subitem">{{ data.title }}</div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <a href="https://www.wasupstudio.com/about.html" target="_blank" class="link" :class="{ 'link-action': routeName == 'about' }">關於阿普蛙
        <div v-if="routeName == 'about'" class="decoration"></div>
      </a>
      <!-- <nuxt-link to="/about" class="link" :class="{ 'link-action': routeName == 'about' }">
        關於阿普蛙
        <div v-if="routeName == 'about'" class="decoration"></div>
      </nuxt-link> -->
      <nuxt-link to="/connection" class="link" :class="{ 'link-action': routeName == 'connection' }">
        聯絡阿普蛙
        <div v-if="routeName == 'connection'" class="decoration"></div>
      </nuxt-link>
      <nuxt-link v-if="checkLicense" to="/mission/myList" class="link"
        :class="{ 'link-action': routeName == 'mission-myList' }">
        我的任務
        <div v-if="routeName == 'mission-myList'" class="decoration"></div>
      </nuxt-link>
    </div>

    <div class="login-box">
      <div v-if="isLogin && permissions !== 'ROLE_USER'" class="setting-box">
        <img class="setting-icon" src="~assets/images/Icon/setting.svg" alt="">
        <div class="setting-dropdown">
          <div class="arrow"></div>
          <div class="submenu">
            <nuxt-link to="/manage/user">
              <div class="subitem">使用者管理</div>
            </nuxt-link>
            <nuxt-link to="/manage/code">
              <div class="subitem">註冊碼管理</div>
            </nuxt-link>
            <nuxt-link to="/mission/list">
              <div class="subitem">任務總覽</div>
            </nuxt-link>
            <nuxt-link to="/manage/product">
              <div class="subitem">商品管理</div>
            </nuxt-link>
            <nuxt-link to="/manage/script">
              <div class="subitem">劇本教材管理</div>
            </nuxt-link>
            <nuxt-link to="/manage/purchaseInformation">
              <div class="subitem">購買資訊</div>
            </nuxt-link>
            <nuxt-link to="/manage/statistics">
              <div class="subitem" style="border-bottom: none;">資料統計</div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-if="isLogin" class="user-box">
        <img class="user-icon" src="~assets/images/Icon/user.svg" alt="">
        <div class="user-dropdown">
          <div class="arrow"></div>
          <div class="submenu">
            <nuxt-link to="/manage/userInfoEdit">
              <div class="subitem">個人資料編輯</div>
            </nuxt-link>
            <nuxt-link to="/pwdEdit-nav">
              <div class="subitem">密碼變更</div>
            </nuxt-link>
            <div class="subitem" @click="handleSignOut" style="border-bottom: none;">登出</div>
          </div>
        </div>
      </div>


      <nuxt-link v-if="!isLogin" to="/login">
        <div class="login-btn">登入 / 註冊</div>
      </nuxt-link>
      <div v-if="!checkLicense" @click="isPaidMemberDialogShow = true" class="get-btn">立即購買</div>
    </div>

    <div class="item-box-phone">
      <img v-if="!isHeaderOpen" @click="isHeaderOpen = true" class="menu-icon" src="~assets/images/Icon/menu.svg" alt="">
      <img v-if="isHeaderOpen" @click="isHeaderOpen = false" class="menu-icon" src="~assets/images/Icon/cancel.svg"
        alt="">
    </div>

    <div v-if="isHeaderOpen" class="dropdown-menu-box">
      <div class="item-phone">
        <nuxt-link to="/" class="link" :class="{ 'link-action': routeName == 'index' }">
          首頁
        </nuxt-link>
        <!-- <div class="link sublink" @click="isOpenSubbox = !isOpenSubbox"
          :class="{ 'link-action': routeName == 'chapter' }">
          劇本介紹 <span>▾</span>
        </div>
        <div v-if="isOpenSubbox" class="subbox">
          <div class="arrow"></div>
          <div class="submenu">
            <nuxt-link v-for="data in allScript" :key="data.scriptId" :to="`/chapter-${data.scriptId}`">
              <div class="subitem">{{ data.title }}</div>
            </nuxt-link>
          </div>
        </div> -->

        <!-- <nuxt-link to="/about" class="link" :class="{ 'link-action': routeName == 'about' }">
          關於阿普蛙
        </nuxt-link> -->
        <a href="https://www.wasupstudio.com/about.html" target="_blank" class="link" :class="{ 'link-action': routeName == 'about' }">關於阿普蛙</a>
        <nuxt-link to="/connection" class="link" :class="{ 'link-action': routeName == 'connection' }">
          聯絡阿普蛙
        </nuxt-link>
        <nuxt-link v-if="checkLicense" to="/mission/myList" class="link"
          :class="{ 'link-action': routeName == 'mission-myList' }">
          我的任務
        </nuxt-link>

        <div v-if="isLogin && permissions === 'ROLE_ADMIN'">
          <nuxt-link to="/manage/user" style="margin-top: 16px;" class="link"
            :class="{ 'link-action': routeName == 'manage-user' }">
            使用者管理
          </nuxt-link>
          <nuxt-link to="/manage/code" class="link" :class="{ 'link-action': routeName == 'manage-code' }">
            註冊碼管理
          </nuxt-link>
          <nuxt-link to="/mission/list" class="link" :class="{ 'link-action': routeName == 'mission-list' }">
            任務總覽
          </nuxt-link>
          <nuxt-link to="/manage/product" class="link" :class="{ 'link-action': routeName == 'manage-product' }">
            商品管理
          </nuxt-link>
          <nuxt-link to="/manage/script" class="link" :class="{ 'link-action': routeName == 'manage-script' }">
            劇本教材管理
          </nuxt-link>
          <nuxt-link to="/manage/purchaseInformation" class="link" :class="{ 'link-action': routeName == 'manage-purchaseInformation' }">
            購買資訊
          </nuxt-link>
          <nuxt-link to="/manage/statistics" class="link" :class="{ 'link-action': routeName == 'none' }">
            資料統計
          </nuxt-link>
        </div>

        <div v-if="isLogin">
          <nuxt-link to="/manage/userInfoEdit" style="margin-top: 16px;" class="link"
            :class="{ 'link-action': routeName == 'manage-userInfoEdit' }">
            個人資料編輯
          </nuxt-link>
          <nuxt-link to="/pwdEdit-nav" class="link" :class="{ 'link-action': routeName == 'manage-pwdEdit' }">
            密碼變更
          </nuxt-link>
        </div>
      </div>
      <div class="login-btn-box">
        <nuxt-link v-if="!isLogin" to="/login">
          <div class="login-box">
            登入 / 註冊
          </div>
        </nuxt-link>
        <div v-if="!checkLicense" @click="isPaidMemberDialogShow = true">
          <div class="get-btn">立即購買</div>
        </div>
        <div v-if="isLogin" @click="handleSignOut" class="signOut-box">
          登出
        </div>
        
      </div>

    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { useAuthStore } from '@/store/authStore';
import { storeToRefs } from 'pinia'
import { getScriptByNoToken as getScript } from "~/api/script";

let isPaidMemberDialogShow = ref(false)
const closeDialog = () => {
  isPaidMemberDialogShow.value = false
}

let auth = useAuthStore()
const { isLogin, permissions, checkLicense } = storeToRefs(auth)

const handleSignOut = () => {
  useAuthStore().signOut()
}

const allScript = reactive([])
const setAllScript = async () => {
  const { data } = await getScript()
  let list = JSON.parse(JSON.stringify(data.value.data))
  list = list.filter(o => o.status !== 2)
  allScript.length = 0
  allScript.push(...list)
}

nextTick(() => {
  setAllScript()
})
let routeName = ref("")

let isHeaderOpen = ref(false)
let isOpenSubbox = ref(false)


const route = useRoute();

watch(route, value => {
  routeName.value = route.name
}, { deep: true, immediate: true })
</script>

<style lang="scss" scoped>
.box {
  height: 56px;
  width: 100vw;
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid $border3;

  .item-box-phone {
    display: none;

    @include respond-to('phone') {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: flex-end;
    }

    .menu-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }



  }

  .dropdown-menu-box {
    display: none;

    @include respond-to('phone') {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 56px;
      left: 0px;
      width: 100vw;
      height: calc(100vh - #{56}px);
      background-color: #fff;
      z-index: 99999;
    }

    .item-phone {
      .link {
        width: 100%;
        padding: 12px 32px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: Noto Sans TC;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0.5px;
        color: $text3;
        cursor: pointer;
      }

      .link-action {
        color: $primary1;
      }

      .sublink {
        display: flex;
        justify-content: space-between;

      }

      .subbox {
        background-color: $background2;

        .subitem {
          padding: 12px 40px;
          font-size: 16px;
          font-family: Noto Sans TC;
          font-weight: 500;
          line-height: 22px;
          letter-spacing: 0.5px;
          color: $text2;
        }

      }
    }

    .login-btn-box {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 28px;


      .login-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        background-color: $primary1;
        padding: 8px 12px;
        color: #fff;
        width: 148px;
        height: 36px;
        margin: 0;
      }

      .get-btn {
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 1px;
        padding: 8px 12px;
        width: 148px;
        height: 36px;
        background: #FFC300;
        border-radius: 50px;
        color: #333;
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin-left: 8px;
      }

      .signOut-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        padding: 8px 12px;
        color: $primary1;
        width: 311px;
        height: 36px;
        margin: 0;
        margin-top: 28px;
        border: 1px solid $primary1;
      }
    }

  }

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    margin-right: 50px;
    display: flex;
    align-items: center;
    color: $primary1;
    letter-spacing: 2px;

    @include respond-to('phone') {
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 2px;
    }
  }

  .item {
    display: flex;

    @include respond-to('phone') {
      display: none;
    }

    .link {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      color: $text3;
      flex-direction: column;
      position: relative;
      cursor: pointer;
      letter-spacing: 1px;
    }

    .link-action {
      color: $text1;
    }

    .decoration {
      position: absolute;
      bottom: -11px;
      width: 100%;
      height: 2px;
      background-color: $primary1;
    }

    .subbox {
      position: absolute;
      top: 18px;
      right: -60px;
      padding-top: 20px;
      display: none;
      z-index: 999;

      .submenu {
        background-color: #fff;
        width: 160px;
        -webkit-box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
        -moz-box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
        box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
        border-radius: 5px;

        & a {
          color: $text2;
          letter-spacing: 0.5px;
          font-weight: 400;
          font-size: 14px;
          width: 100%;
          border-radius: 5px;
        }
      }

      .arrow {
        position: absolute;
        top: 10px;
        left: 30px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
      }


      .subitem {
        width: 100%;
        padding: 8px 12px;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 5px;


        &:hover {
          background-color: #eeeeee;
        }
      }
    }

    .sublink:hover {
      .subbox {
        display: block;
      }
    }
  }

  .login-box {
    margin-left: auto;
    display: flex;


    @include respond-to('phone') {
      display: none;
    }


    .setting-icon {
      width: 30px;
      margin-right: 8px;
      cursor: pointer;
    }

    .setting-box {
      display: flex;
      align-items: center;
      position: relative;

      .setting-dropdown {
        position: absolute;
        top: 41px;
        left: -78px;
        width: 160px;
        background-color: #fff;
        z-index: 999;
        display: none;

        .arrow {
          position: absolute;
          top: -10px;
          left: 85px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #fff;
        }

        .subitem {
          width: 100%;
          padding: 8px 12px;
          border-bottom: 1px solid #e5e5e5;
          border-radius: 5px;

          &:hover {
            background-color: #eeeeee;
          }
        }

        .submenu {
          background-color: #fff;
          width: 160px;
          -webkit-box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
          -moz-box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
          box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
          border-radius: 5px;

          & a {
            color: $text2;
            letter-spacing: 0.5px;
            font-weight: 400;
            font-size: 14px;
            width: 100%;
            border-radius: 5px;
          }
        }
      }
    }


    .setting-box:hover .setting-dropdown {
      display: block;
    }

    .user-icon {
      width: 30px;
      margin-right: 8px;
      cursor: pointer;
    }

    .user-box {
      display: flex;
      align-items: center;
      position: relative;

      .user-dropdown {
        position: absolute;
        top: 41px;
        left: -115px;
        width: 160px;
        background-color: #fff;
        z-index: 999;
        display: none;

        .arrow {
          position: absolute;
          top: -10px;
          left: 121px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #fff;
        }

        .subitem {
          width: 100%;
          padding: 8px 12px;
          border-bottom: 1px solid #e5e5e5;
          border-radius: 5px;

          &:hover {
            background-color: #eeeeee;
          }
        }

        .submenu {
          background-color: #fff;
          width: 160px;
          -webkit-box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
          -moz-box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
          box-shadow: 1px 1px 18px 0px rgba(50, 50, 50, 0.33);
          border-radius: 5px;

          & .subitem {
            color: $text2;
            letter-spacing: 0.5px;
            font-weight: 400;
            font-size: 14px;
            width: 100%;
            border-radius: 5px;
          }
        }
      }
    }

    .user-box:hover .user-dropdown {
      display: block;
    }

    .login-btn {
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      padding: 8px 12px;
      width: 115px;
      height: 36px;
      background: $primary1;
      border-radius: 50px;
      color: $secondary2;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }

    .login-btn:hover {
      background:#15C0A7;
    }

    .get-btn {
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      padding: 8px 12px;
      width: 105px;
      height: 36px;
      background: #FFC300;
      border-radius: 50px;
      color: #333;
      display: flex;
      justify-content: center;
      cursor: pointer;
      margin-left: 8px;
    }
  }
}
</style>