<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 修改时效
 * @Date: 2022-05-17 11:14:55
 * @LastEditTime: 2022-05-17 18:01:42
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog v-model="dialogVisible" destroy-on-close custom-class="customize_dialog dialog-double">
        <DialogTitle title-content="修改时效" />
        <div class="dialog-body">
            <div class="meal-introduce">
                <p class="meal-title">{{ mealForm.name }}</p>
                <ul class="meal-cont">
                    <li class="meal-item">
                        <span>IP时效：</span>
                        <span>{{ mealForm.ipAging || '--' }}分钟</span>
                    </li>
                    <li class="meal-item">
                        <span>IP单价：</span>
                        <span>{{ mealForm.ipUnit || 0 }}元/IP</span>
                    </li>
                    <li class="meal-item">
                        <span v-if="mealForm.mealType == 0">IP总量：</span>
                        <span v-else-if="mealForm.mealType == 1">每日提取上限：</span>
                        每日提取上限：
                        <span>{{ mealForm.ipCount }}（含赠送{{ mealForm.ipSend || 0 }},赠送IP不参与换算）</span>
                    </li>
                    <!-- 包量 -->
                    <li class="meal-item" v-if="mealForm.mealType == 0">
                        <span>IP剩余量：</span>
                        <span>{{ mealForm.laveNumber }}（含赠送{{ mealForm.ipSend }}）</span>
                    </li>
                    <!-- 包时 -->
                    <li class="meal-item" v-if="mealForm.mealType == 1">
                        <span>IP剩余天数：</span>
                        <span>{{ mealForm.laveDays }}（含今日）</span>
                    </li>
                    <li class="meal-item">
                        <span>套餐余额：</span>
                        <span>{{ mealForm.balance }}元</span>
                    </li>
                </ul>
            </div>

            <el-form :model="mealForm.changeForm" :inline="true" :rules="changeForm_rules" ref="changeFormRef"
                label-width="120px">
                <el-form-item label="选择IP时效" prop="ipAging">
                    <el-select style="width: 160px;" v-model="mealForm.changeForm.ipAging" filterable placeholder="请选择"
                        @change="changeIpAging($event)">
                        <el-option v-for="(item, index) in ipAgingOptions" :key="index" :label="item.content"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 不可小于对应时效的剩余IP总量 -->
                <!--  -->
                <el-form-item v-if="mealForm.mealType == 0" label="剩余IP总量"
                    :prop="mealForm.mealType == 0 ? 'laveIp' : ''">
                    <el-input style="width: 170px" :disabled="!mealForm.changeForm.ipAging"
                        :placeholder="mealForm.changeForm.ipAging ? '请输入' : '请先选择IP时效'"
                        v-model="mealForm.changeForm.laveIp" oninput="value=value.replace(/\D|^0/g,'')"
                        @input="calculatePrice"></el-input>
                </el-form-item>
                <!-- 不可小于对应时效的提取上限 -->
                <el-form-item v-if="mealForm.mealType !== 1" label-width="120px" label="每日提取上限"
                    :prop="mealForm.mealType !== 1 ? 'limit' : ''">
                    <el-input style="width: 160px" :disabled="!mealForm.changeForm.ipAging"
                        :placeholder="mealForm.changeForm.ipAging ? '请输入' : '请先选择IP时效'" v-model="mealForm.changeForm.limit"
                        @input="calculatePrice" oninput="value=value.replace(/\D|^0/g,'')">

                    </el-input>
                </el-form-item>
            </el-form>

            <div class="child-item money-wrap">
                <span class="child-elem">支付差价</span>
                <span class="child-elem lighting">{{ mealForm.agio ? (mealForm.agio).toFixed(2) : 0 }}元</span>
            </div>

            <div class="child-item clear-padding">
                <span class="label child-elem">支付方式</span>
                <div class="child-elem btn-wrap">
                    <span class="pay-btn child-elem" @click="changeWays('ali')"
                        :class="mealForm.payType === 'ali' ? 'checked' : ''">
                        <img src="@/assets/images/common/alipay.png" alt="微信">
                        <span>支付宝</span>
                    </span>
                    <span class="pay-btn child-elem" @click="changeWays('wx')"
                        :class="mealForm.payType === 'wx' ? 'checked' : ''">
                        <img src="../../../assets/images/common/wx.png" alt="微信">
                        <span>微信</span>
                    </span>
                </div>

            </div>
            <div class="child-item tip">
                友情提示：如遇微信支付异常，请使用支付宝付款或联系专属销售
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
            mealForm: {
                name: '套餐名称',
                mealType: null,
                ipAging: null, // IP时效
                ipUnit: null,  // IP单价
                ipCount: null,  // IP总量
                laveNumber: null, // IP剩余量
                ipSend: null,  // 赠送IP
                laveDays: null, // 剩余天数
                balance: null,  // 套餐余额
                changeForm: {
                    ipAging: null,  // IP时效 
                    laveIp: null,  // 剩余IP总量
                    limit: null,  // 每日提取上限
                },
                payType: 'ali',  // 支付方式  ali  wx
                agio: null,  // 支付差价
            },
            ipCountLimit: null,   // 剩余IP总量/每日提取上限   限制的值
            unitPrice: null,  // 临时保存不同时效对应的单价
            changeForm_rules: {
                ipAging: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                laveIp: [
                    { required: true, message: '请输入剩余IP总量', trigger: 'blur' },
                    { validator: checkNumber, trigger: 'blur' }
                ],
                limit: [
                    { required: true, message: '请输入提取上限', trigger: 'blur' },
                    { validator: checkLimit, trigger: 'blur' }
                ],

            },
            ipAgingOptions: [],
            wxTimer: null,  // 定时器
            wxTime: 300, // 倒计时
        });
        var checkNumber = (rule, value, callback) => {
            if (state.mealForm.changeTimeForm.laveIp) {
                if (value < state.ipCountLimit) {
                    callback(new Error("剩余IP总量不可小于" + state.ipCountLimit))
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };

        var checkLimit = (rule, value, callback) => {
            if (value < state.ipCountLimit) {
                callback(new Error("每日提取上限不可小于" + state.ipCountLimit))
            } else {
                callback();
            }

        };
        const methods = {
            onOpen (row) {
                if (row) {
                    state.dialogVisible = true
                }
            },
            changeIpAging (val) {
                // 差价清空
                state.mealForm.agio = 0;
                let item = null;
                state.ipCountLimit = null;
                if (val) {
                    state.ipAgingOptions.forEach(elem => {
                        if (elem.id == val) {
                            item = elem;
                            return
                        }
                    })

                    if (item) {
                        state.ipCountLimit = item.total;   // 当前IP时效对应的剩余IP总量
                        state.mealForm.changeTimeForm.laveIp = item.total;  // 剩余IP总量  包量
                        state.mealForm.changeTimeForm.limit = item.total;  // 每日提取上限  包时
                        state.unitPrice = item.unitPrice;   // 时效的单价
                    }
                }
            },
            // 计算差价
            calculatePrice (val) {
                state.mealForm.agio = (val - state.ipCountLimit) * state.unitPrice
            },
            // 改变支付方式
            changeWays (mode) {
                state.mealForm.payType = mode;
            },
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

.meal-introduce {
    padding: 0 0 20px 0;
    box-sizing: border-box;

    .meal-title {
        margin: 0;
        padding: 0 0 10px 0;
        font-size: 16px;
        font-weight: bold;
        box-sizing: border-box;
    }

    .meal-cont {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;

        .meal-item {
            padding: 5px 8px 10px 0;
            margin-right: 25px;
            box-sizing: border-box;
            list-style: none;
        }
    }
}
</style>
