<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-18 15:30:19
 * @LastEditTime: 2022-05-18 15:56:40
-->
<template>
  <div class="keyDialog">
    <el-dialog v-model="dialogVisible">
      <DialogTitle title-content="自助开通代理API密码加密密钥" />
      <div class="content pt-40 pb-40">
        <div class="title"><span>请使用AES加密</span></div>
        <div class="keys mt-30">
          <span><span class="addImpor">key:</span>7q45dEDYB7e5mSp9</span>
          <span><span class="addImpor">iv:</span>isPuE5gU8H7gZDVI</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DialogTitle from "components/DialogTitle";
import { ref, reactive, toRefs, onMounted, inject } from "vue";
export default {
  name: "",
  components: {
    DialogTitle,
  },
  props: {},
  setup() {
    const dialogVisible = ref(false);
    const message = inject("message");

    return {
      dialogVisible,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
.keyDialog {
  .content {
    padding: 0 40px;
    .title {
      font-size: 20px;
      line-height: 26px;
      color: #fc7019;
    }
    .keys {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      line-height: 26px;
      color: #4c5664;
      .addImpor span {
        font-weight: bold;
      }
    }
  }
}
</style>