<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 续费
 * @Date: 2022-05-17 11:14:55
 * @LastEditTime: 2022-05-17 17:53:09
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog v-model="dialogVisible" destroy-on-close 
        custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="续费" />
        <div class="dialog-body">
            <span class="child-item meal-introduce" v-text="renewForm.desc"></span>
            <!-- 包时显示 -->
            <div v-show="timeRenew" class="child-item">
                <span class="label child-elem">增加时长</span>
                <el-select v-model="renewForm.time" placeholder="选择时长" clearable collapse-tags
                    @change="changeTime($event)">
                    <el-option v-for="(item, index) in packageTime" :key="index" :label="item.time + '天'"
                        :value="item.mealId">
                    </el-option>
                </el-select>
            </div>
            <div class="child-item">
                <span class="child-elem">应付金额</span>
                <span class="lighting">{{ renewForm.acturalprice }}元</span>
            </div>
<!-- v-if="isShowEnvelope && (renewForm.mealType === 0 || renewForm.mealType === 1 || renewForm.mealType === 10)" -->
            <div class="child-item envelope">
                <span class="label child-elem">我的红包</span>
                <el-select v-model="renewForm.redRecordId" placeholder="请选择" @change="calcPayPrice">
                    <el-option v-for="item in recordOption" :key="item.id" :label="item.label"
                        :value="parseInt(item.id)">
                    </el-option>
                </el-select>
            </div>

            <div class="child-item clear-padding">
                <span class="label child-elem">支付方式</span>
                <div class="child-elem btn-wrap">
                    <span class="pay-btn child-elem" @click="renewForm.payType = 'ali'"
                        :class="renewForm.payType === 'ali' ? 'checked' : ''">
                        <img src="@/assets/images/common/alipay.png" alt="微信">
                        <span>支付宝</span>
                    </span>
                    <span class="pay-btn child-elem" @click="renewForm.payType = 'wx'"
                        :class="renewForm.payType === 'wx' ? 'checked' : ''">
                        <img src="../../../assets/images/common/wx.png" alt="微信">
                        <span>微信</span>
                    </span>
                </div>

            </div>
            <div class="child-item tip">
                友情提示：如遇微信支付异常，请使用支付宝付款或联系专属销售
            </div>
            <div class="child-item money-wrap">
                <span class="child-elem">实付金额</span>
                <span class="child-elem lighting">{{ renewForm.payPrice ? parseFloat(renewForm.payPrice, 2).toFixed(2) : '--' }}元</span>
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
        //  响应式数据
        const state = reactive({
            dialogVisible: false,
            // 续费表单
            renewForm: {
                time: null,
                desc: '【固定-5分钟-7天】剩余可用时长：7天',
                acturalprice: null, // 应付金额
                mealType: null,  // 套餐类型  0 1 10 可以用红包  其他不展示
                redRecordId: null,  // 红包id
                payType: 'ali',  // 支付方式  ali  wx
                payPrice: null,  // 实际支付价格
                payDiscount: null,  //折扣
                timeMealId: null,  //包时套餐的mealId
                timeId: null,   //包时套餐的row.id
            },
            //包时套餐天数数组
            packageTime: [],
            recordOption: [], // 红包数组
            isShowEnvelope: false,
            timeRenew: true
        });
        const methods = {
            onOpen (row) {
                if (row) {
                    state.dialogVisible = true
                }
            },
            changeTime () { },
            calcPayPrice(){},
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