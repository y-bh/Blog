<!--
 * @Author: dengxiujie
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-04-27 14:22:11
 * @LastEditTime: 2022-05-27 14:04:51
-->
<template>
  <div class="layout">
    <el-row class="main" :style="{ minHeight: defaultHeight + 'px'}">
      <div class="slide-affix">
        <div class="slide-affix--fixed">
          <SideBar></SideBar>
        </div>
      </div>


      <div class="main-right">
        <el-config-provider :locale="locale">
          <router-view />
        </el-config-provider>
      </div>
    </el-row>
  </div>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
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
    let defaultHeight = ref(800);
    const headerRef = ref(null);
    const getMainHeight = () => {
      let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
     
      //console.log("窗口的高度-----header", height);
      // let headerH = headerRef.value?.$el.clientHeight || 0;
      let headerH = document.querySelector(".header").offsetHeight;
      const footerHeight = document.querySelector("footer").offsetHeight;
      console.log(headerH, footerHeight,'====');
      defaultHeight.value = height - headerH - footerHeight - 80;
  
    };

    onBeforeMount(() => {});
    onMounted(() => {
      getMainHeight();
      window.addEventListener("resize", getMainHeight);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", getMainHeight);
    });
    return {
      defaultHeight,
      headerRef,
      locale: zhCn
    };
  },
};
</script>
<style lang="scss" scoped>
.layout {
  background: #fff;
  margin-top: 80px;
  .main {
    position: relative;
    height: calc(100% - 84px);
    overflow: auto;
    font-size: 14px;
    display: flex;
    justify-content: start;
    width: 1420px;
    margin: 0 auto;

    .sideBar {
      width: 180px;
      margin-right: 20px;
      flex-shrink: 0;
      background: #ffffff;
      ::v-deep(.el-menu) {
        border: none;
        box-shadow: 0px 0px 20px rgba(208, 224, 255, 0.4);
      }
    }
    .main-right {
      flex: 1;
      overflow: auto;
      padding: 0;
      // 设置padding为了显示阴影
      padding: 40px 20px 20px 20px;
      margin-left: 0;
      // margin-right: -20px;
      box-sizing: border-box;
      // margin-left: 20px;
    }
  }
}
</style>