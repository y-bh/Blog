<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 支付
 * @Date: 2022-05-17 11:14:55
 * @LastEditTime: 2022-05-25 17:17:09
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog v-model="dialogVisible" @closed="cancelForm" custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="支付" />
        <div class="dialog-body">

            <div class="child-item">
                <span class="child-elem">支付金额</span>
                <span class="lighting">{{ payForm.payPrice }}元</span>
            </div>


            <div class="child-item clear-padding">
                <span class="label child-elem">支付方式</span>
                <div class="child-elem btn-wrap">
                    <span class="pay-btn child-elem" @click="payForm.payType = 'ali'"
                        :class="payForm.payType === 'ali' ? 'checked' : ''">
                        <img src="@/assets/images/common/alipay.png" alt="微信">
                        <span>支付宝</span>
                    </span>
                    <span class="pay-btn child-elem" @click="payForm.payType = 'wx'"
                        :class="payForm.payType === 'wx' ? 'checked' : ''">
                        <img src="@/assets/images/common/wx.png" alt="微信">
                        <span>微信</span>
                    </span>
                </div>

            </div>
            <div class="child-item tip">
                友情提示：如遇微信支付异常，请使用支付宝付款或联系专属销售
            </div>

            <div class="dialog-footer child-item">
                <el-button type="primary" @click="submitForm" class="submit-btn">立即支付</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import DialogTitle from "components/DialogTitle";
import { reactive, ref, toRefs, inject } from 'vue'
import { formatInt, deepCopy } from "tools/utility"
import { payOrder } from "model/payRecord.js";
export default {
    emits: ['createCode'],
    components: {
        DialogTitle
    },
    setup (props, ctx) {
        const message = inject('message');

        //  响应式数据
        const state = reactive({
            dialogVisible: false,
            // 续费表单
            payForm: {
                orderNo: null,
                payType: 'ali',  // 支付方式  ali  wx
                payPrice: null,  // 支付价格
            },
        });
        const methods = {
            async onOpen (row) {
                console.log(row, row.price,'row');
                if (row) {
                    state.payForm.orderNo = row.orderNo;
                    state.payForm.payPrice = row.price;
                    state.dialogVisible = true
                }
            },


            cancelForm () {
                state.payForm = {
                    orderNo: null,
                    payType: 'ali',  // 支付方式  ali  wx
                    payPrice: null,  // 支付价格
                }
               
            },
            // 支付
            async submitForm () {
                const reqData = {
                    orderNo: state.payForm.orderNo,
                    payType: 1,
                }

                if (state.payForm.payType === 'ali') {
                    reqData.payType = 1;

                    let params = {
                        url: "/payOrder/buyDiscountProxy",
                        type: 'post',
                        query: JSON.stringify(reqData)
                    }
                    localStorage.setItem('TQParams', JSON.stringify(params))
                    window.open("/payCenter");
                    // window.open("/payCenter?params=" + JSON.stringify(params));
                    return

                } else {
                    reqData.payType = 2;
                    let res = await payOrder(reqData);
                    if (res && res.code === 200) {
                        // 支付成功调取二维码弹窗
                        if (res.data && res.data.payUrl) {
                            const codeParams = {
                                orderId: res.data.orderId,
                                url: res.data.payUrl
                            }
                            state.dialogVisible = false
                            ctx.emit('createCode', codeParams);
                        } else {
                            message.error({
                                message: res?.message || '二维码获取失败',
                                showClose: true
                            })
                        }

                    } else {
                        message.error({
                            message: '二维码获取失败',
                            showClose: true
                        })
                    }

                }
            }
        }


        return {
            ...methods,
            ...toRefs(state)
        }
    }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>