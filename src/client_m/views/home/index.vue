<!--
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-04-25 17:37:05
 * @LastEditTime: 2022-04-29 12:10:22
-->
<template>
  <div>我是4432</div>
  <el-button type="primary">Primary</el-button>
  <img src="/manager/images/empty.png" alt="">
  <div class="bg"></div>
  <div class="bg2"></div>
  <img src="/manager/images/logo.png" alt="">
</template>

<script>

import { inject } from "vue";
import { getTest } from "model/index.js";
import { useStore } from "vuex";
export default {
  setup() {
    const re = inject("$re");
    const store = useStore();
    const test = async () => {
      const res = await getTest();
      console.log("个人中心测试接口:",  res);
    };

    console.log("cccccccccccccccc", re, store.state);
    test();
  },
};
</script>
<style lang="scss" scoped>
.bg{
  width: 300px;
  height: 300px;
  margin: 10px auto;
  border: 1px solid red;
 //background: url(assets/images/empty.png);
}
.bg2{
  width: 300px;
  height: 300px;
  margin: 10px auto;
  border: 1px solid red;
 background: url(assets/images/logo.png);
}
</style>