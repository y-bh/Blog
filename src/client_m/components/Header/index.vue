<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:53:32
 * @LastEditTime: 2022-04-27 16:50:48
-->
<template>
  <header class="header">
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
  background: #bcdfdc;
}
</style>