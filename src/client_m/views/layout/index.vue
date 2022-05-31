<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:22:11
 * @LastEditTime: 2022-05-31 18:32:00
-->
<template>
  <div class="layout">
    <el-row class="main" :style="{ minHeight: defaultHeight + 'px'}">
      <div class="slide-affix" :class="b ? 'show-on-hidden' : ''">
        <div class="slide-affix--fixed">
          <SideBar :showB="showSideB"></SideBar>
        </div>
      </div>


      <div class="main-right">
        <el-config-provider :locale="locale">
          <router-view />
        </el-config-provider>
      </div>
    </el-row>
    <GiftDialog></GiftDialog>
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
import GiftDialog from "components/GiftDialog"
export default {
  name: "layout",
  components: {
    Header,
    Footer,
    SideBar,
    GiftDialog
  },
  props: {},
  setup() {
    const state = reactive({
      b: false
    })

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

    function showSideB() {
      state.b = !state.b
    }


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
      locale: zhCn,
      ...toRefs(state),
      showSideB,
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
      width: 220px;
      margin-right: 20px;
      flex-shrink: 0;
      background: #ffffff;
      ::v-deep(.el-menu) {
        padding: 25px 0;
        border: none;
        color: #4C5664;
        box-shadow: 0px 0px 20px rgba(208, 224, 255, 0.4);
        line-height: 21px;
        li{
          height: 51px;
        }
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

    .slide-affix{
      transition: width 0.3s;
      .slide-affix--fixed{
        transition: width 0.3s;
        .sideBar{
          transition: width 0.3s;
          i{
            display: none;
          }
        }
      }
    }
  }
}
</style>