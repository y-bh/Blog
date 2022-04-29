<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:53:12
 * @LastEditTime: 2022-04-27 18:39:14
-->
<template>
  <aside class="sideBar">
    <nav>
      <ul>
        <li><router-link to="user">个人账户</router-link></li>
        <li><router-link to="finance">资金明细</router-link></li>
        <li><router-link to="myOrder">我的订单</router-link></li>
        <li><router-link to="setMeal">我的套餐</router-link></li>
        <li><router-link to="longIp">我的长效IP</router-link></li>
        <li>I<router-link to="whiteListIp">P白名单</router-link></li>
        <li><router-link to="giftManage">礼券管理</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "",
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
.sideBar {
  width: 180px;
  min-height: 200px;
  background: #dfd4bc;
  li {
    border: 1px solid #ffffff;
    padding: 5px;
    &:hover {
      background: #e3a6a6;
    }
  }
}
</style>