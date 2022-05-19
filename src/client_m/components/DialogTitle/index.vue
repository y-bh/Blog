<!--
 * @Author: 李云涛
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-05-12 17:52:14
 * @LastEditTime: 2022-05-12 18:13:41
-->
<template #title>
  <div class="dialog-title">
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="title-text">{{titleContent}}</div>
  </div>
</template>

<script>
export default {
  name: "ManagerDialogTitle",
  props: {
    titleContent: {
      type: String,
      required: true,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-title {
  position: relative;
  width: 100%;
  height: 80px;
  border-radius: 8px 8px 0px 0px;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    &:nth-child(1) {
      background-color: rgba(25, 104, 252, 0.37);
    }
    &:nth-child(2) {
      clip-path: polygon(0 0, 50px 0, 0 100%);
      background: linear-gradient(300deg, #e3ecff, #cfe0ff);
    }
    &:nth-child(3) {
      clip-path: polygon(50px 0, 100px 0, 50px 100%, 0 100%);

      background: linear-gradient(300deg, #edf3ff, #b9d1fe);
    }
    &:nth-child(4) {
      clip-path: polygon(
        calc(100% - 100px) 0,
        calc(100% - 50px) 0,
        100% 100%,
        calc(100% - 50px) 100%
      );

      background: linear-gradient(60deg, #edf3ff, #b9d1fe);
    }
    &:nth-child(5) {
      clip-path: polygon(calc(100% - 50px) 0, 100% 0, 100% 100%);

      background: linear-gradient(60deg, #e3ecff, #cfe0ff);
    }
  }
  .title-text {
    line-height: 80px;
    font-size: 24px;
    color: #1968fc;
    font-weight: 700;
    text-align: center;
  }
}
</style>