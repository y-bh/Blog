<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 重置密码
 * @Date: 2022-05-17 11:18:51
 * @LastEditTime: 2022-05-17 18:20:11
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
export default {
    components: {
        DialogTitle,
    },
    setup (props, context) {
        const message = inject('message');
        const state = reactive({
            dialogVisible: true,
            mergeForm: {
                mergeId: null,
            }
        });
        const methods = {
            submitMerge(){}
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