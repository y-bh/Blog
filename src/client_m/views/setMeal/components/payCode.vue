<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 微信扫码支付
 * @Date: 2022-05-21 09:39:11
 * @LastEditTime: 2022-05-21 11:42:52
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog 
        v-model="dialogVisible" 
        destroy-on-close 
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        custom-class="customize_dialog dialog-alone dialog-pay">
        <DialogTitle title-content="微信扫码付款" />
        <div class="dialog-body">

            <div class="child-item tip pay-tip">
                请在<span class="countdown">{{ time }}秒</span> 内完成支付
            </div>

            <div class="code">
                <img
                    src="@/assets/images/common/wx.png"
                    alt="支付"
                    class="code_img">
                <div id="qrcode">
                </div>
            </div>

            <!-- <div class="dialog-footer child-item">
                <el-button type="primary" @click="submitForm" class="submit-btn">支 付</el-button>
            </div> -->
        </div>
    </el-dialog>
</template>
<script>
import DialogTitle from "components/DialogTitle";
import { reactive, ref, toRefs, inject } from 'vue'
import { useRoute, useRouter } from "vue-router";
import QRCode from "qrcode";
import { getState } from "model/meal.js";
export default {
    components: {
        DialogTitle,
    },
    emits: ['updateMeal'],
    setup(props, context){
        const message = inject('message');
        const $router = useRouter();
        //  响应式数据
        const state = reactive({
            dialogVisible: true,
            timeFlag: null,  // 定时器
            time: 0,
        })
        const methods = {
            onOpen(code){
                if(code){
                    state.dialogVisible = true;
                    state.time = 300;
                    clearInterval(state.timeFlag);
                    document.getElementById("qrcode").innerHTML = "";
                    new QRCode("qrcode", {
                        width: 250,
                        height: 250,
                        text: code.url,
                        colorDark: "#000",
                        colorLight: "#fff",
                        redRecordId: code.redRecordId || null
                    });

                    timeFlag = setInterval(async () => {
                        state.time--;
                        // 每隔3秒刷新一下订单状态
                        if (state.time % 3 === 0) {
                            let resp = await getState(code.orderId);
                            //resp: 0 未支付  1：支付成功
                            if (resp === 2) {
                                message.success({
                                    message: "支付成功！",
                                    showClose: true,
                                });
                                methods.clearCode();
                                //  刷新用户信息
                                // window.$mine = await this.$api('User.GetMineInfo', {});
                                $router.push('/manager/index');
                            }
                        }
                        if (this.time <= 0) {
                            message.error({
                                message: "支付失败！",
                                showClose: true,
                            });
                            methods.clearCode();
                        }
                    }, 1000);
                }
            },
            clearCode(){
                clearInterval(state.timeFlag);
                //如果微信支付关闭，则清空二维码
                let div = document.getElementById("qrcode");
                div.removeChild(div.childNodes[1]);
                div.removeChild(div.childNodes[0]);
                context.emit('updateMeal', false)
            }
        }
        console.log(QRCode,'QRCode===');
        return {
            ...toRefs(state)
        }
    }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
.dialog-pay{
    max-width: 400px;
}
</style>
