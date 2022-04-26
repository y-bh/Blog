<!--
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-04-25 17:37:05
 * @LastEditTime: 2022-04-26 15:30:56
-->
<template>
  <div>我是4432</div>
  <el-button type="primary">Primary</el-button>
</template>

<script>
import { inject } from "vue";
import { getTest } from "model/index.js";
import {useStore} from "vuex"
export default {
  setup() {
    const re = inject("$re");
    const store = useStore()
    const test = async () => {
      const res = await getTest();
      console.log("个人中心测试接口:", process.env.common, res);
    };

    console.log("cccccccccccccccc", re,store.state);
    test();
  },
};
</script>
<style lang="scss" scoped>
</style>