<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:53:12
 * @LastEditTime: 2022-05-06 16:49:17
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
      <SidebarItem :menuList="filterRouteList"></SidebarItem>
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
  setup(props, {}) {
    // route响应式对象，监控变化，传值
    const $route = useRoute();
    const $router = useRouter();

    let activePath = ref("user");
    activePath.value = $route.path.replace("/manager/","")
    const isCollapse = ref(true);

    let routeList = [];
    let filterRouteList = [];
    console.log("-------过滤前：", $router.options.routes);
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
    // onMounted(() => {});
    //const refData = toRefs(null);
    onBeforeRouteUpdate((to) => {
      console.log("onBeforeRouteUpdate", to.path);
    });
    watch(
      () => $route.path,
      (newValue, oldValue) => {
        console.log("watch", newValue);
      },
      { immediate: true }
    );
    return {
      isCollapse,
      activePath,
      filterRouteList,
      // handleOpen,
      // handleClose,
    };
  },
};
</script>
<style lang="scss" scoped>
.sideBar {
  width: 200px;
  min-height: 200px;
  background: #dfd4bc;
  // li {
  //   border: 1px solid #ffffff;
  //   padding: 5px;
  //   &:hover {
  //     background: #e3a6a6;
  //   }
  // }
}
</style>