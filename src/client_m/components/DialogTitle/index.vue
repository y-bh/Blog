<!--
 * @Author: 李云涛
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-12 17:52:14
 * @LastEditTime: 2022-05-28 10:53:59
-->
<template #title>
  <div class="dialog-title">
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg"></div>
    <div class="bg title-text">{{titleContent}}</div>
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
      background-color: #b9d1fe;
    }
    &:nth-child(2) {
      clip-path: polygon(0 0, 50px 0, 0 100%);
      background: linear-gradient(300deg, #e2ecff, #e2ecff 90%, #dce8fe);
    }
    &:nth-child(3) {
      clip-path: polygon(50px 0, 112px 0, 62px 100%, 0 100%);

      background: linear-gradient(300deg, #d5e3fe, #d5e3fe 80%, #ccdcfd);
    }
    &:nth-child(4) {
      clip-path: polygon(
        calc(100% - 112px) 0,
        calc(100% - 50px) 0,
        100% 100%,
        calc(100% - 62px) 100%
      );

      background: linear-gradient(60deg, #d5e3fe, #d5e3fe 80%, #ccdcfd);
    }
    &:nth-child(5) {
      clip-path: polygon(calc(100% - 50px) 0, 100% 0, 100% 100%);

      background: linear-gradient(60deg, #e2ecff, #e2ecff 90%, #dce8fe);
    }
  }
  .title-text {
    line-height: 80px;
    font-size: 24px;
    color: #1968fc;
    font-weight: 700;
    text-align: center;
    z-index: 2;
  }
}
</style>