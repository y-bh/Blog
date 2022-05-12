<!--
 * @Author: 李云涛
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-05-12 15:00:41
 * @LastEditTime: 2022-05-12 17:31:18
-->
<template>
  <el-dialog
    v-model="dialogVisible"
    custom-class="remove-dialog"
    top="18vh"
    width="26%"
    :center="true"
    @closed="closeCallback"
    :show-close="false"
  >
    <template #title>
      <div class="dialog-title">
        <div class="bg"></div>
        <div class="bg"></div>
        <div class="bg"></div>
        <div class="bg"></div>
        <div class="bg"></div>
        <div class="title-text">移除白名单</div>
      </div>
    </template>
    <div class="dialog-text">确认移除白名单IP吗?</div>
    <template #footer>
      <div class="footer-btn">
        <el-button @click="closeDialogControl">取消</el-button>
        <el-button @click="confirmRemove">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      dialogVisible: true,

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
    function confirmRemove() {
      try {
        /**remove func */

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
@import "./index.css";
.remove-dialog {
  .dialog-title {
    position: relative;
    width: 100%;
    height: 80px;
    border-radius: inherit;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      &:nth-child(1) {
        background-color: rgba(25, 104, 252, 0.37);
      }
      &:nth-child(2) {
        clip-path: polygon(0 0, 50px 0, 0 100%);
        background: linear-gradient(300deg, #e3ecff, #cfe0ff);
      }
      &:nth-child(3) {
        clip-path: polygon(50px 0, 100px 0, 50px 100%, 0 100%);
        
        background: linear-gradient(300deg, #edf3ff, #B9D1FE);
      }
      &:nth-child(4) {
        clip-path: polygon(
          calc(100% - 100px) 0,
          calc(100% - 50px) 0,
          100% 100%,
          calc(100% - 50px) 100%
        );
        
        background: linear-gradient(60deg, #edf3ff, #B9D1FE);
      }
      &:nth-child(5) {
        clip-path: polygon(calc(100% - 50px) 0, 100% 0, 100% 100%);

        background: linear-gradient(60deg, #e3ecff, #cfe0ff);
      }
    }
    .title-text{
      line-height: 80px;
      font-size: 24px;
      color: #1968FC;
      font-weight: 700;
    }
  }
  .footer-btn{
    padding-bottom: 40px;
  }
}
</style>