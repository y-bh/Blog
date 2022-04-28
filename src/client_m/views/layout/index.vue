<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:22:11
 * @LastEditTime: 2022-04-27 17:10:38
-->
<template>
  <div class="layout">
    <Header></Header>
    <main class="layout-main">
      <SideBar></SideBar>
      <div class="main-right">
        <router-view />
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";

import Header from "components/Header";
import Footer from "components/Footer";
import SideBar from "components/SideBar";

export default {
  name: "",
  components: {
    Header,
    Footer,
    SideBar,
  },
  props: {},
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(null);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="scss" scoped>
.layout {
  .layout-main {
    display: flex;
    margin: 20px;
    background: red;
    .sideBar{
      flex-shrink: 0;
    }
    .main-right {
      width: 1200px;
    }
  }
}
</style>