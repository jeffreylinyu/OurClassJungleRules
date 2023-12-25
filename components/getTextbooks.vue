<template>
  <div class="fourth-block">
    <div class="content-box">
      <div class="text">霸凌往往因為旁觀者的冷漠或害怕，我們希望孩子能成為正義的助人者，一同打造充滿和諧的班級文化！同時應兼顧老師與學生間的關係，好的關係不僅讓學生更喜歡學習，還能教會他們和同學和平相處，學會自己解決問題。這不僅改善現階段的人際衝突，更有助於未來的人際發展！
</div>
      <div class="btn" @click="isPaidMemberDialogShow = true">立即取得教材</div>
    </div>
  </div>
  <PaidMemberDialog v-model="isPaidMemberDialogShow"></PaidMemberDialog>
</template>

<script setup>
let isPaidMemberDialogShow = ref(false)
const closeDialog = () => {
  isPaidMemberDialogShow.value = false
}
</script>

<style lang="scss" scoped>
.fourth {
  &-block {
    width: 100%;
    height: 335px;
    background-color: $primary3;

    @include respond-to('phone') {
      height: auto;
    }

    .content-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .text {
        margin-top: 80px;
        font-weight: 400;
        font-size: 24px;
        color: $secondary2;
        letter-spacing: 0.5px;
        display: flex;
        justify-content: center;
        text-align: center;
        width: 928px;

        @include respond-to('phone') {
          width: 90%;
        }
      }

      .btn {
        margin-top: 32px;
        width: 149px;
        height: 56px;
        background: $secondary1;
        border-radius: 50px;
        font-weight: 700;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 1px;
        cursor: pointer;

        @include respond-to('phone') {
          margin-bottom: 80px;
        }
      }
    }

  }
}</style>