<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-05 18:02:35
 * @LastEditTime: 2022-05-06 13:44:04
-->
<template>
  <template v-for="(item, index) in menuList" :key="index" class="aaaa">
    <el-submenu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem :menuList="item.children"></SidebarItem>
    </el-submenu>
    <el-menu-item v-else :index="item.path" :class="item.path">
      <template #title>
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "SidebarItem",
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    onMounted(() => {});
    //const refData = toRefs(null);
    return {
      //   ...refData,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>