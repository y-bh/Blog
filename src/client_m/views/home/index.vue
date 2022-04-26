<!--
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-04-25 17:37:05
 * @LastEditTime: 2022-04-26 13:57:36
-->
<template>
  <div>我是32</div>
</template>

<script>
import {getTest} from "model/index.js"
export default {

  setup(){
    const test = async ()=>{
      const res = await getTest()
      console.log("个人中心测试接口:",res)
    }


    test()
  }

}

</script>
<style lang="scss" scoped>
</style>