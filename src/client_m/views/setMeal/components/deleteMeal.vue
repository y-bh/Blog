<!--
 * @Author: 秦琛
 * @LastEditors: liyuntao
 * @description: 批量删除
 * @Date: 2022-05-17 11:18:51
 * @LastEditTime: 2022-05-30 11:36:49
-->
<template>
    <el-dialog v-model="dialogVisible" destroy-on-close custom-class="customize_dialog dialog-alone">
        <DialogTitle title-content="温馨提示" />
        <div class="dialog-body">
            <p class="child-item">确定删除吗？</p>
            <div class="dialog-footer child-item double-item">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitDelete()">确 定</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import DialogTitle from "components/DialogTitle";
import { reactive, ref, toRefs, inject } from 'vue'
import { formatInt} from "tools/utility"
import { deleteMeal } from "model/meal.js";
export default {
    components: {
        DialogTitle,
    },
    emits: ['updateTable'],
    setup (props, context) {
        const message = inject('message');

        const state = reactive({
            dialogVisible: false,
            proxyIds: []
        });
        const methods = {
            onOpen(ids){
                state.proxyIds = ids;
                state.dialogVisible = true;
            },
            async submitDelete(){
                let res = await deleteMeal({proxyIds: state.proxyIds});
                if(res && res.code === 200){
                    message.success({
                        message: '删除成功',
                        showClose: true
                    })
                    state.dialogVisible = false
                    context.emit('updateTable', false)
                } else {
                    message.error({
                        message: '删除失败',
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