<!--
 * @Author: dengxiujie
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-04-28 09:43:56
 * @LastEditTime: 2022-05-27 15:16:06
-->
<template>
    <div class="page-container">
        <top-nav></top-nav>
        <p class="tip1">哎呀！网页找不到了，你可以返回再试一次～</p>
        <p class="tip2">{{jumpTime}}秒后自动跳转到首页</p>
        <el-row class="click">
            <el-col :span="12">
                <el-button type="primary" class="back" @click="back()"></el-button>
            </el-col>
            <el-col :span="12">
                <el-button class="last" @click="last()">上一步</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
//import topNav from "@/components/navMenu/topNav";

export default {

    data() {

        return {
            jumpTime: 5,
            timeClock: ''
        }
    },

}
</script>
<style lang="scss" scoped>

</style>