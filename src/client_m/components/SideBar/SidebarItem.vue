<!--
 * @Author: dengxiujie
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-05 18:02:35
 * @LastEditTime: 2022-05-31 16:18:04
-->
<template>
  <li class="show-side" @click="props.showB"><i class="iconfont icon-zhankai"></i></li>
  <template v-for="(item, index) in menuList" :key="index" class="aaaa">
    <el-submenu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <i v-if="item.meta.icon" class="iconfont" :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem :menuList="item.children"></SidebarItem>
    </el-submenu>
    <el-menu-item v-else :index="item.path" :class="item.path">
      <template #title>
        <i v-if="item.meta.icon" class="iconfont" :class="item.meta.icon"></i>
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
    showB: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    //const refData = toRefs(null);


    return {
      //   ...refData,
      props
    };
  },
};
</script>
<style lang="scss" scoped>
.show-side{
  display: none;
  height: 55px;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>