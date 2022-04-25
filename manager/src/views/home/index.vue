<!--
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: 首页
 * @Date: 2021-07-16 14:55:35
 * @LastEditTime: 2022-03-14 16:39:12
-->
<template>

  <div class="home">
    hello world {{ state.name }}
  </div>

</template>

<script>

import {reactive} from "vue";
export default {
  setup() {

    const state =reactive({
      name:'朱占伟',
    }) 


    return {
      state
    }
  }
};
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
