<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 合并套餐
 * @Date: 2022-05-17 11:18:51
 * @LastEditTime: 2022-05-26 15:18:28
-->
<template>
    <el-dialog v-model="dialogVisible" destroy-on-close custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="合并套餐" />
        <div class="dialog-body">
            <p class="child-item">您想要将此套餐合并到哪个套餐？请输入套餐ID</p>
            <el-input class="child-item" v-model="mergeForm.sequence"></el-input>
            <div class="dialog-footer child-item double-item">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMerge()">确 定</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import DialogTitle from "components/DialogTitle";
import { reactive, ref, toRefs, inject } from 'vue'
import { mergeMeal } from "model/meal.js";
export default {
    components: {
        DialogTitle,
    },
    emits: ['updateTable'],
    setup (props, context) {
        const message = inject('message');
        const state = reactive({
            dialogVisible: false,
            mergeForm: {
                proxyId: null, // 原套餐id
                sequence: null,  // 新套餐编号
            }
        });
        const methods = {
            onOpen(row){
                if(row){
                    state.mergeForm.proxyId = row.id;
                    state.mergeForm.sequence = null;
                    state.dialogVisible = true;
                    // console.log(row,'row');
                }
            },
            async submitMerge(){
                if(!state.mergeForm.sequence){
                    message.warning({
                        message: '请输入套餐ID',
                        showClose: true
                    })
                } else {
                    let res = await mergeMeal(state.mergeForm);
                    if(res && res.code === 200){
                        message.success({
                            message: '合并套餐成功',
                            showClose: true
                        })
                        context.emit('updateTable', false)
                    } else {
                        message.success({
                            message: res && res.message || '合并失败',
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