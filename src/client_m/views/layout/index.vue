<!--
 * @Author: dengxiujie
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-04-27 14:22:11
 * @LastEditTime: 2022-05-16 15:45:31
-->
<template>
  <div class="layout">
    <main class="layout-main">
      <SideBar></SideBar>
      <div class="main-right">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
} from "vue";

import Header from "components/Header";
import Footer from "components/Footer";
import SideBar from "components/SideBar";
export default {
  name: "layout",
  components: {
    Header,
    Footer,
    SideBar,
  },
  props: {},
  setup() {
    // let defaultHeight = ref(800);
    // const headerRef = ref(null);
    // const getMainHeight = () => {
    //   let height =
    //     window.innerHeight ||
    //     document.documentElement.clientHeight ||
    //     document.body.clientHeight;
    //   //console.log("窗口的高度-----", height);
    //   let headerH = headerRef.value.$el.clientHeight;
    //   defaultHeight.value = height - headerH - 100;
    // };

    // onBeforeMount(() => {});
    // onMounted(() => {
    //   //console.log(222222, headerRef.value);
    //   getMainHeight();
    //   window.addEventListener("resize", getMainHeight, false);
    // });
    // onBeforeUnmount(() => {
    //   window.removeEventListener("resize", getMainHeight);
    // });
    // return {
    //   defaultHeight,
    //   headerRef,
    // };
  },
};
</script>
<style lang="scss" scoped>
.layout {
  background: #fff;
  .layout-main {
    display: flex;
    max-width: 1400px;
    margin: 110px auto 40px;
    // min-height: 700px;

    .sideBar {
      width: 180px;
      margin-right: 40px;
      flex-shrink: 0;
      background: #ffffff;
      ::v-deep(.el-menu) {
        border: none;
        box-shadow: 0px 0px 20px rgba(208, 224, 255, 0.4);
      }
    }
    .main-right {
      // width: 1200px;
      background: red;
      width: 100%;
      background: #fff;
      // margin-left: 20px;
    }
  }
}
</style>