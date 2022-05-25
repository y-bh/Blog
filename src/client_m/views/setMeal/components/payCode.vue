<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 微信扫码支付
 * @Date: 2022-05-21 09:39:11
 * @LastEditTime: 2022-05-25 13:19:54
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog 
        v-model="dialogVisible" 
        destroy-on-close 
        :close-on-click-modal="true"
        :close-on-press-escape="false"
        custom-class="customize_dialog dialog-alone dialog-pay">
        <DialogTitle title-content="微信扫码付款" />
        <div class="dialog-body">

            <div class="child-item tip pay-tip">
                请在<span class="countdown">{{ time }}秒</span> 内完成支付
            </div>

            <div class="code">
                <!-- <img
                    src="@/assets/images/common/wx.png"
                    alt="支付"
                    class="code_img"> -->
                    <div class="code-url">
                        <qrcode-vue :value="codeUrl" :size="size" level="H" />
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
import QrcodeVue from 'qrcode.vue'
import { getState } from "model/meal.js";
export default {
    components: {
        DialogTitle,
        QrcodeVue
    },
    emits: ['updateMeal'],
    setup(props, context){
        const message = inject('message');
        const $router = useRouter();
        //  响应式数据
        const state = reactive({
            dialogVisible: false,
            codeUrl: '',
            size: 250,
            timeFlag: null,  // 定时器
            time: 0,
        })
        const methods = {
            onOpen(code){
                if(code){
                    console.log(code,'code===');
                    state.time = 300;
                    clearInterval(state.timeFlag);
                    state.codeUrl = code.url
                    state.dialogVisible = true;
                    state.timeFlag = setInterval(async () => {
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
                state.codeUrl = '';
                context.emit('updateMeal', false);
                state.dialogVisible = false;
            }
        }
     
        return {
            ...toRefs(state),
            ...methods
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
