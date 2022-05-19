<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 重置密码
 * @Date: 2022-05-17 11:18:51
 * @LastEditTime: 2022-05-18 13:10:57
-->
<template>
    <el-dialog v-model="dialogVisible" destroy-on-close custom-class="customize_dialog dialog-alone">
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
export default {
    components: {
        DialogTitle,
    },
    setup (props, context) {
        const message = inject('message');
        // 引入全局变量
        const global = inject('_global');
        // console.log(global.methods.randomString(8),'随机字符串');
        const state = reactive({
            dialogVisible: false,
            mergeForm: {
                id: null,
                authSecret: null
            }
        });
        const methods = {
            onOpen(row){
                state.mergeForm.id = row.id
                state.mergeForm.authSecret = randomString(8)
            },
            submitMerge(){

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