<!--
 * @Author: 李云涛
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-05-12 15:00:41
 * @LastEditTime: 2022-05-19 15:31:50
-->
<template>
  <el-dialog
    v-model="dialogVisible"
    custom-class="remove-dialog"
    top="21vh"
    width="26%"
    :center="true"
    @closed="closeCallback"
    :show-close="false"
  >
    <DialogTitle title-content="移除白名单" />
    <div class="dialog-text">确认移除白名单IP吗?</div>
    <template #footer>
      <div class="footer-btn">
        <el-button class="cancel-button" @click="closeDialogControl">取消</el-button>
        <el-button class="confirm-button ml-30" @click="confirmRemove">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
//title
import DialogTitle from "components/DialogTitle"

//func
import { removeWhiteIpFunc } from "model/whiteList"

import { inject, reactive, toRefs } from "vue";
export default {
  props:{
    ok:{
      type: Function,
      required: true,
      default: () => {},
    }
  },
  components:{
    DialogTitle,
  },
  setup(props) {
    const $message = inject('message')

    const state = reactive({
      dialogVisible: false,

      id: null,
    });

    //open dialog control
    function openDialogControl() {
      state.dialogVisible = true;
    }
    //close dialog control
    function closeDialogControl() {
      state.dialogVisible = false;
    }

    //open dialog
    function openDialog(id) {
      state.id = id;

      openDialogControl();
    }

    //submit result
    async function confirmRemove() {
      try {
        /**remove func */
        let params = {
          ids : [state.id]
        }
        const res = await removeWhiteIpFunc(params)

        if(+res.code === 200){
          $message.success('删除成功')
          props.ok()
        } else {
          $message.error('删除失败')
        }

        /**条件判断 */

        closeDialogControl();
      } catch (error) {
        console.error("Remove Ip Error: ", error);
      }
    }

    //close Callback , reset valiable
    function closeCallback() {
      state.id = null;
    }

    return {
      ...toRefs(state),
      openDialog, //打开弹窗
      closeDialogControl, //关闭弹窗

      confirmRemove, //提交
      closeCallback, //关闭后回调
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>