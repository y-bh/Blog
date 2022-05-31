<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 重置密码
 * @Date: 2022-05-17 11:18:51
 * @LastEditTime: 2022-05-31 09:37:23
-->
<template>
    <el-dialog v-model="dialogVisible" :show-close="false" destroy-on-close custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="重置密码" />
        <div class="dialog-body">
            <p class="child-item">确定将您的套餐密码重置吗？</p>
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
import { formatInt, randomString } from "tools/utility"
import { resetSecret } from "model/meal.js";
export default {
    components: {
        DialogTitle,
    },
    emits: ['updateTable'],
    setup (props, context) {
        const message = inject('message');
        // 引入全局变量
        const global = inject('_global');
        const state = reactive({
            dialogVisible: false,
            mergeForm: {
                id: null
            }
        });
        const methods = {
            onOpen(row){
                state.mergeForm.id = row.id;
                state.dialogVisible = true;
            },
            async submitMerge(){
                let res = await resetSecret(state.mergeForm.id);
                if(res && res.code === 200){
                    message.success({
                        message: '重置成功',
                        showClose: true
                    })
                    state.dialogVisible = false
                    context.emit('updateTable', false)
                } else {
                    message.error({
                        message: res?.message || '重置失败',
                        showClose: true
                    })
                }
            }
        }

        return {
            ...toRefs(state),
            ...methods,
            
        }
    }
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>