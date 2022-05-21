<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 微信扫码支付
 * @Date: 2022-05-21 09:39:11
 * @LastEditTime: 2022-05-21 10:27:53
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog v-model="dialogVisible" destroy-on-close custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="微信扫码付款" />
        <div class="dialog-body">

            <div class="child-item tip pay-tip">
                请在五分钟之内完成支付，剩余时间 
                <span class="countdown">{{ time }}</span> 
                秒
            </div>

            <div class="code">
                <img
                    src="@/assets/images/common/wx.png"
                    alt="支付"
                    class="code_img">
                <div id="qrcode">
                </div>
            </div>

            <div class="dialog-footer child-item">
                <el-button type="primary" @click="submitForm" class="submit-btn">支 付</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import DialogTitle from "components/DialogTitle";
import { reactive, ref, toRefs, inject } from 'vue'
import QRCode from "qrcodejs2";
export default {
    components: {
        DialogTitle,
    },
    setup(props, context){
        const message = inject('message');
        //  响应式数据
        const state = reactive({
            dialogVisible: true,
            timeFlag: null,  // 定时器
            time: 0,
        })
console.log(QRCode,'QRCode===');
        return {
            ...toRefs(state)
        }
    }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
