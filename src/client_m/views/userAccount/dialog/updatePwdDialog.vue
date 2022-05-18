<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 17:07:26
 * @LastEditTime: 2022-05-18 14:38:18
-->
<template>
  <div class="updatePwdDialog">
    <el-dialog v-model="dialogVisibleFlag">
      <DialogTitle title-content="修改密码" />
      <div class="formContent">
        <el-form
          ref="vaildPwdRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="originPassword">
            <el-input
              v-model="ruleForm.originPassword"
              placeholder="请输入原密码"
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="ruleForm.newPassword"
              placeholder="请输入新密码"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="ruleForm.confirmPassword"
              placeholder="请输入确认密码"
            />
          </el-form-item>
          <div class="common-btnGroup pt-30 pb-40">
            <el-button type="primary" plain>取消</el-button>
            <el-button type="warning" @click="onSubmit">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DialogTitle from "components/DialogTitle";
import { ref, reactive, computed, toRefs, onMounted,inject } from "vue";
export default {
  name: "",
  components: {
    DialogTitle,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    const vaildPwdRef = ref(null);
    const message=inject('message');
    const validatePwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== form.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
      console.log(333333333333, form.ruleForm.newPassword);
      callback();
    };
    const validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (form.ruleForm.confirmPassword !== "") {
          if (!vaildPwdRef.value) return;
          vaildPwdRef.value.validateField("confirmPassword", (valid) => {
            console.log(`${valid}***************************`);
          });
        }
        callback();
      }
    };
    const form = reactive({
      ruleForm: {
        originPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        originPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          // { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_!@#$%^&*.]{4,16}$/,
            message: "密码只能由4~16字母，数字，特殊符号组成",
          },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          // { min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_!@#$%^&*.]{4,16}$/,
            message: "密码只能由4~16字母，数字，特殊符号组成",
          },
          { validator: validatePwd, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePwd2, trigger: "blur" },
        ],
      },
    });
    onMounted(() => {});

    const onSubmit = (formName) => {
      console.log("=======修改密码数据======", form.ruleForm);
      // if (!formEl) return
      vaildPwdRef.value.validate(async (valid) => {
        if (valid) {
          //TODO
          message({
            message: "登录密码修改成功",
            type: "success",
          });
          emit("updateDialog", false);
        } else {
          console.log("error submit!!");
          message.error("登录密码修改失败，请重试！");
          emit("updateDialog", false);
          return false;
        }
      });
    };

    const dialogVisibleFlag = computed({
      get() {
        return props.dialogVisible;
      },
      set(value) {
        dialogVisibleFlag, emit("updateDialog", false);
      },
    });
    return {
      ...toRefs(form),
      onSubmit,
      vaildPwdRef,
      dialogVisibleFlag,
    };
  },
};
</script>


<style lang="scss" scope>
@import "./index.scss";
.updatePwdDialog {
  .formContent {
    padding: 40px;
  }
}
</style>