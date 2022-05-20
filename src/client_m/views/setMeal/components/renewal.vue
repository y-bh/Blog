<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 续费
 * @Date: 2022-05-17 11:14:55
 * @LastEditTime: 2022-05-19 17:47:17
-->
<template>
    <!-- 支付弹窗 -->
    <el-dialog v-model="dialogVisible"
        @closed="cancelForm"
        custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="续费" />
        <div class="dialog-body">
            <span class="child-item meal-introduce" v-text="renewForm.desc"></span>
            <!-- 包时显示 -->
            <div v-if="isPackageTime" class="child-item">
                <span class="label child-elem">增加时长</span>
                <el-select v-model="renewForm.mealTime" placeholder="选择时长" clearable collapse-tags
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

            <div class="child-item envelope" v-if="isShowEnvelope && (renewForm.mealType === 0 || renewForm.mealType === 1 || renewForm.mealType === 10)">
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
import { formatInt, deepCopy } from "tools/utility"
import { getRenewList, getRedPackage } from "model/meal.js";
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
                proxyId: null,
                mealTime: null,  // 增加时长
                price: '',  //套餐价格（每个ip价格 * ip数量） 定制套餐则是定制价
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
            renewInfo: null,   // 包时套餐信息
            //包时套餐天数数组
            packageTime: [],
            recordOption: [], // 红包数组
            isShowEnvelope: false,
            isPackageTime: false,  // 是否是包时套餐
            isCustomize: false,  // 是否是定制套餐
        });
        const methods = {
            async onOpen (row) {
                if (row) {
                    state.isPackageTime = row.proxyType === 1;
                    state.isCustomize = row.discount;  // 判断是不是定制
                    state.isShowEnvelope = false;   // 打开弹窗默认不显示红包
                    
                    state.renewForm.mealType = formatInt(row.proxyType) || null;  //0 1 10可以用红包
                    state.renewForm.mealTime = formatInt(row.proxyMealId)
                    // 获取套餐续费信息
                    await methods.getRenewData(row);

                    state.renewForm.proxyId = state.renewInfo && state.renewInfo.proxyId;  // 支付id
                    state.renewForm.desc = state.renewInfo && state.renewInfo.desc;  // 支付desc

                    state.dialogVisible = true
                }
            },
            async getRenewData(row){
                let res = await getRenewList(row.id);

                if(res && res.code === 200){
                    state.renewInfo = res.data;
                    state.packageTime = state.renewInfo.mealRes || null;
                }

                if(state.packageTime){ // 包时
                    methods.changeTime()
                } else {   //包量
                    state.renewForm.price = state.renewInfo.price ? (state.renewInfo.price).toFixed(2) : 0;
                    state.renewForm.acturalprice = state.renewInfo.discount ?
                        (state.renewInfo.price * state.renewInfo.discount * 0.01).toFixed(2) :
                        state.renewForm.price;
                    state.renewForm.payPrice = state.renewInfo.discount ?
                        (state.renewInfo.price * state.renewInfo.discount * 0.01).toFixed(2) :
                        state.renewForm.price;
                }
                
            
            },
            
            //包时套餐续费 改变时长  重新参与计算
            async changeTime () { 
                state.packageTime.forEach(elem => {
                    if (elem && elem.mealId == state.renewForm.mealTime) {
                        state.renewForm.timeMealId = elem.mealId;
                        state.renewForm.price = elem.price ? (elem.price).toFixed(2) : 0;
                        state.renewForm.payDiscount = elem.discount !== null ? elem.discount[0] : 100;
                        state.renewForm.acturalprice = (elem.price * state.renewForm.payDiscount * 0.01).toFixed(2);
                        state.renewForm.payPrice = (elem.price * state.renewForm.payDiscount * 0.01).toFixed(2);
                    }
                })
                // 非定制，包量/包时/计次可用红包
                if(!state.isCustomize && (state.renewForm.mealType === 0 || state.renewForm.mealType === 1 || state.renewForm.mealType === 10)){
                    await methods.getRedEnvelope()
                }
            },
            async getRedEnvelope(){
                state.renewForm.redRecordId = null;
                state.recordOption = [];
                let res = await getRedPackage();
                if(res && res.code === 200){
                    state.isShowEnvelope = true;
                    if(res.data){
                        res.data.forEach(item =>{
                            // 将未过期，门槛金额小于应付金额的红包塞入数组
                            if(item && item.state === 3 && item.endTime && item.doorsill <= state.renewForm.acturalprice){
                                let days = Math.ceil((item.endTime - Math.floor(((new Date()).getTime()) / 1000)) / 86400);
                                item.label = '满' + item.doorsill + '减' + item.money + '（' + days + '天有效期' + '）'
                                state.recordOption.push(item)
                            }
                        })
                    }
                    
                } 

                if(!state.recordOption.length){
                    state.isShowEnvelope = false;
                    state.recordOption = [
                        {
                            "state": 0, // -1过期 1禁用 2已用 3未用
                            "id": 0, // 红包记录Id
                            "doorsill": null, // 门槛
                            "money": null, // 抵用金额
                            "redPackageName": "", // 红包名称
                            "createTime": null, // 起
                            "endTime": null, // 止
                            "label": '暂无可用红包'
                        }
                    ];
                }
                // 默认拿第一个红包
                state.renewForm.redRecordId = !state.renewForm.redRecordId ? state.recordOption[0].id : null
                methods.calcPayPrice()
            },
            // 计算实际支付价格
            calcPayPrice(){
                let deductPrice = 0;
                if(state.renewForm.redRecordId){
                    state.recordOption.forEach(elem => {
                        if(elem.id === state.renewForm.redRecordId){
                            deductPrice = elem.money;
                        }
                    })
                }
                state.renewForm.payPrice = state.renewForm.acturalprice - deductPrice;
            },
            cancelForm () { 
                state.renewForm = {
                    proxyId: null,
                    mealTime: null,  // 增加时长
                    price: '',  //套餐价格（每个ip价格 * ip数量） 定制套餐则是定制价
                    desc: '【固定-5分钟-7天】剩余可用时长：7天',
                    acturalprice: null, // 应付金额
                    mealType: null,  // 套餐类型  0 1 10 可以用红包  其他不展示
                    redRecordId: null,  // 红包id
                    payType: 'ali',  // 支付方式  ali  wx
                    payPrice: null,  // 实际支付价格
                    payDiscount: null,  //折扣
                    timeMealId: null,  //包时套餐的mealId
                    timeId: null,   //包时套餐的row.id
                }
                state.renewInfo = null;
                state.packageTime = [];
                state.recordOption = [];
                state.isShowEnvelope = false;
                state.isPackageTime = false;
                state.isCustomize = false;
            },
            // 支付
            submitForm () { }
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