<!--
 * @Author: dengxiujie
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-04-27 14:53:32
 * @LastEditTime: 2022-05-11 18:46:15
-->
<template>
  <header class="header" v-if="false">
    这是头部
  </header>
</template>

<script>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
  name: '',
  props:{
  },
  setup() {
    onBeforeMount(() => {
    })
    onMounted(() => {
    })
   // const refData = toRefs(null);
    return {
    //    ...refData,
    }
  }
  };
</script>
<style lang="scss" scoped>
.header{
  height: 100px;
  background: transparent;
}
</style>