<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 14:55:26
 * @LastEditTime: 2022-04-27 16:51:15
-->
<template>
  <footer class="footer">这是底部</footer>
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
    //const refData = toRefs(null);
    return {
     //   ...refData,
    }
  }
  };
</script>
<style lang="scss" scoped>
.footer{
  height: 100px;
  background: #bcdfdc;
}
</style>