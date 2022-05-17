<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 补量
 * @Date: 2022-05-17 11:14:55
 * @LastEditTime: 2022-05-17 16:59:43
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog v-model="dialogVisible" destroy-on-close 
        custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="补量" />
        <div class="dialog-body">
            <!-- 套餐名称 -->
            <span class="child-item meal-introduce" v-text="mealData.desc"></span>

            <div class="child-item">
                <span class="child-elem">每日提取上限:</span>
                <span>{{ mealData.limitIp }}</span>
                <span>（含赠送{{ mealData.sendIp || 0 }}IP）</span>
            </div>
            <div class="child-item">
                <span class="child-elem">套餐剩余天数:</span>
                <span>{{ mealData.limitDays }}</span>
                <span>（含今日）</span>
            </div>

            <el-form :model="mealData.form" :inline="true" :rules="form_rules" ref="formRef">
                <el-form-item label="每日补量" prop="number" class="child-item">
                    <el-input v-model="mealData.form.number" @input="supplementPrice"
                        oninput="value=value.replace(/\D|^0/g,'')">
                    </el-input>
                    <div class="form-item-tip">
                        <span>补量后每日提取上限：</span>
                        <span>
                            {{ parseInt(mealData.limitIp) + parseInt(mealData.sendIp) + parseInt(mealData.form.number)}}
                        </span>
                    </div>
                </el-form-item>
            </el-form>

            <div class="child-item">
                <span class="child-elem">应付金额</span>
                <span class="lighting">{{ mealData.payMoney ? mealData.payMoney.toFixed(2) : 0 }}元</span>
            </div>

            <div class="child-item clear-padding">
                <span class="label child-elem">支付方式</span>
                <div class="child-elem btn-wrap">
                    <span class="pay-btn child-elem" @click="changeWays('ail')"
                        :class="mealData.payType === 'ali' ? 'checked' : ''">
                        <img src="@/assets/images/common/alipay.png" alt="微信">
                        <span>支付宝</span>
                    </span>
                    <span class="pay-btn child-elem" @click="changeWays('wx')"
                        :class="mealData.payType === 'wx' ? 'checked' : ''">
                        <img src="../../../assets/images/common/wx.png" alt="微信">
                        <span>微信</span>
                    </span>
                </div>

            </div>
            <div class="child-item tip">
                友情提示：如遇微信支付异常，请使用支付宝付款或联系专属销售
            </div>
            <div class="child-item money-wrap">
                <span class="pay-intr child-elem">实付金额</span>
                <span class="lighting child-elem">
                    {{ mealData.payPrice ? parseFloat(mealData.payPrice, 2).toFixed(2) : '--'}}元
                </span>
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
export default {
    emits: ['query'],
    components: {
        DialogTitle,
    },
    setup (props, context) {
        const message = inject('message');
        const checkIp = (rule, value, callback) => {
            if (value) {
                if (value % 1000 !== 0) {
                    return callback(new Error('每日补量必须为1000的倍数'))
                } else {
                    callback();
                }
            } else {
                callback()
            }
        }
        //  响应式数据
        const state = reactive({
            dialogVisible: false,
            // 续费表单
            mealData: {
                desc: '【固定-5分钟-7天】剩余可用时长：7天',
                limitIp: null,  // 每日提取上限
                sendIp: null, // 赠送ip
                limitDays: null, // 套餐剩余天数
                form: {
                    number: null
                },
                payMoney: null,  // 应付金额
                payType: 'ali',  // 支付方式  ali  wx
                payPrice: null,  // 实际支付价格
            },
            form_rules: {
                number: [
                    { required: true, message: '请输入每日补量', trigger: 'blur' },
                    { validator: checkIp, trigger: 'blur' }
                ],
            }
        });
        const methods = {
            onOpen (row) {
                if (row) {
                    state.dialogVisible = true
                }
            },
            supplementPrice () { },
            changeWays (mode) {
                this.mealData.payType = mode;
            },
            cancelForm () { },
            submitForm () { }
        }
        console.log(props, 'props');

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