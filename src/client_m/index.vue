<!--
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 个人中心首页
 * @Date: 2022-04-25 16:08:31
 * @LastEditTime: 2022-05-27 16:03:11
-->

<template>
 <router-view />
</template>

<script>
import { watch, nextTick } from 'vue'
import { useRoute, useRouter} from 'vue-router'
export default {
    name: 'App',
    setup(){
      const $route = useRoute();
      const $router = useRouter();
      watch(
        () => $route.path,
        // 路由刷新回到页面顶部
        async () => {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
          await nextTick()
        }
      )
    }
}

</script>
<style lang="scss" scoped>
  body{
    color: red;
    font-size: 362px;
  }
</style>