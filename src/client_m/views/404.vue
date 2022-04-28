<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-28 09:43:56
 * @LastEditTime: 2022-04-28 09:43:57
-->
<template>
    <div class="page-container">
        <top-nav></top-nav>
        <p class="tip1">你似乎来到了没有IP的沙漠~</p>
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
    components: {
        //topNav
    },
    data() {

        return {
            jumpTime: 5,
            timeClock: ''
        }
    },
   async mounted() {
        // this.jumpInterval();
        this.jumpTime = setTimeout(this.jumpInterval, 1000);
    },
    methods: {
        jumpInterval(){
           this.timeClock = setInterval(() => {
                if(this.jumpTime > 0){
                    this.jumpTime--;
                } else {
                    this.jumpIndex();
                }

            }, 1000);
        },
        jumpIndex(){
            clearInterval(this.timeClock);
            this.$message({
                showClose: true,
                message: '即将回到首页',
                duration: 2000,
                type: 'success',
                onClose: function(){
                    location.href = '/index/index';
                }
            });
        },

        back() {
            this.$message({
                showClose: true,
                message: '即将回到首页',
                duration: 1000,
                type: 'success',
                onClose: function(){
                    location.href = '/index/index';
                }
            });
            // location.href = "/index/index.html"
        },
        last() {
            this.$router.go(-1);
        },
    },
    // watch:{
    //     jumpTime:
    // }

}
</script>
<style lang="scss" scoped>
.page-container {
    font-size: 20px;
    text-align: center;
    width: 100%;
    height: 100%;
    background: url("/my/images/index/tq404.png") no-repeat;
    margin: 0;
    background-size: 100% 100%;

    p {
        margin: 0;
    }

    .tip1 {
        color: #333333;
        padding: 33% 0 1% 0;
    }

    .tip2 {
        color: #666666;
    }

    .click {
        width: 27%;
        margin: 30px auto 0;

        .back {
            width: 220px;
            height: 60px;
            background: #3E6AE2;
            border-radius: 4px;
            font-size: 24px;
            color: #FFFFFF;
            border: none;
        }

        .last {
            width: 220px;
            height: 60px;
            border: 1px solid #3E6AE2;
            border-radius: 4px;
            font-size: 24px;
            color: #63A2FF;
            background: transparent;
        }

        .last:hover {
            background: transparent;
        }
    }

}
</style>