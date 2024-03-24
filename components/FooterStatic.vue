<template>
  <div class="box">
    <div class="content-box">
      <div class="content content1">
        <div class="title">關於</div>
        <nuxt-link to="/terms" class="link-item">使用者條款與權益</nuxt-link>
        <nuxt-link to="/privacy" class="link-item">隱私權政策</nuxt-link>
      </div>
      <div class="content content2">
        <div class="title">幫助</div>
        <a href="https://www.wasupstudio.com/about.html" target="_blank" class="link-item">關於阿普蛙</a>
        <nuxt-link to="/question" class="link-item">常見問題</nuxt-link>
        <nuxt-link to="/connection" class="link-item">聯絡阿普蛙</nuxt-link>
      </div>
      <div class="content content3">
        <div class="title2">阿普蛙工作室有限公司</div>
        <div class="text-item">地址：基隆市仁愛區忠三路34號</div>
        <div class="text-item">E-mail: wasupstudio@gmail.com</div>
        <div class="text-item">課程窗口 & 合作洽談：林侃眉 0933-769550 </div>
        <div class="text-item">遊戲設計 & 課程設計：吳健毅 0908-858625</div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 314px;
  background-color: $secondary1;
  display: flex;
  justify-content: center;

  @include respond-to('phone') {
    flex-direction: column;
    height: auto;
    align-items: center;
    padding-bottom: 80px;
  }

  .content1 {
    // margin-left: 138px;
  }

  .content2 {
    margin-left: 170px;

    @include respond-to('phone') {
      margin: 0;
    }
  }

  .content3 {
    margin-left: 400px;

    @include respond-to('phone') {
      margin: 0;
    }
  }

  .content-box {
    display: flex;


    @include respond-to('phone') {
      flex-direction: column;
      width: 90%;
    }

    .content {
      padding-top: 80px;
      display: flex;
      flex-direction: column;
      

      .title {
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.5px;
        color: $text1;
        margin-bottom: 4px;
        letter-spacing: 0.5px;
        color: $text1;
      }

      .title2 {
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 1.5px;
        margin-bottom: 8px;
        color: $text1;
      }

      .link-item {
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 0.5px;
        margin-top: 8px;
        text-decoration-line: underline;
        letter-spacing: 0.5px;
        color: $text2;
      }

      .text-item {
        margin-top: 8px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.5px;
        color: $text1;
      }
    }
  }
}
</style>