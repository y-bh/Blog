<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:53:12
 * @LastEditTime: 2022-05-31 18:41:16
-->
<template>
  <aside class="sideBar">
    <el-menu
      :default-active="activePath"
      :router="isCollapse"
      class="sideBar-menu"
      :collapse="false"
      @open="handleOpen"
      @close="handleClose"
    >
      <SidebarItem :menuList="filterRouteList" v-bind="$attrs"></SidebarItem>
    </el-menu>
  </aside>
</template>

<script>
import { reactive, ref, toRefs, onBeforeMount, onMounted, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import SidebarItem from "./SidebarItem";
export default {
  name: "",
  props: {},
  components: {
    SidebarItem,
  },
  setup(props, { attrs }) {
    // route响应式对象，监控变化，传值
    const $route = useRoute();
    const $router = useRouter();

    let activePath = ref("user");
    activePath.value = $route.path.replace("/manager/", "");
    const isCollapse = ref(true);

    let routeList = [];
    let filterRouteList = [];
    // console.log("-------过滤前：", $router.options.routes);
    routeList = $router.options.routes;
    // 将子路由中ignore为true的路由过滤掉
    const filterRoute = (routeList, filterRouteList) => {
      if (routeList && routeList.length) {
        routeList.forEach((item) => {
          if (!item.ignore) {
            let tempData = {
              path: item.path,
              name: item.name,
              meta: item.meta,
            };
            if (item.children && item.children.length) {
              tempData.children = [];
              filterRoute(item.children, tempData.children);
            }
            filterRouteList.push(tempData);
          }
        });
      }
    };
    filterRoute(routeList, filterRouteList);
    filterRouteList = filterRouteList[0].children;
    //console.log("---------过滤后：", filterRouteList);

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    // onBeforeMount(() => {});
    onMounted(() => {
      console.log(props, "props-bar");
    });
    //const refData = toRefs(null);
    onBeforeRouteUpdate((to) => {
      console.log("onBeforeRouteUpdate", to.path);
    });
    watch(
      () => $route.path,
      (newValue, oldValue) => {
        //console.log("watch----------", newValue);
        let newActivePath = newValue
          ? newValue.replace("/manager/", "")
          : "user";
        activePath.value = newActivePath;
      },
      { immediate: false }
    );
    return {
      isCollapse,
      activePath,
      filterRouteList,
      handleOpen,
      handleClose,
      attrs,
    };
  },
};
</script>
<style lang="scss" scoped>
.sideBar {
  // width: 220px;
  min-height: 200px;
  background: #dfd4bc;
  border-radius: 8px;
  // :v-deep(.el-menu)  {
  //   background-image: linear-gradient(to bottom right, rgba(208, 224, 255, 0.5), rgba(208, 224, 255, 0.2), #fff, #fff, #fff);

  //   // .el-menu-item {
  //   //   padding: 0 !important;
  //   //   text-align: center;
  //   // }
  // }
  
}
</style>