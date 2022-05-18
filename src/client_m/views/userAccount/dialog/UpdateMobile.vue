<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 17:07:26
 * @LastEditTime: 2022-05-18 15:39:53
-->
<template>
  <div class="updateMobile">
    <el-dialog v-model="dialogVisible">
      <DialogTitle title-content="换绑手机" />
      <div class="formContent">
        <div class="remarks">
          <span
            >更换手机后，所有资金、订单、套餐等信息和权益都会转移到新手机号码下，原手机号需要重新注册才可登录</span
          >
        </div>
        <el-form
          ref="vaildPhoneRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm mt-30"
        >
          <el-form-item label="当前手机号" prop="curPhone">
            <el-input
              v-model="ruleForm.curPhone"
              placeholder="请输入当前手机号"
            />
          </el-form-item>
          <el-form-item label="新手机号" prop="newPhone">
            <el-input
              v-model="ruleForm.newPhone"
              placeholder="请输入新手机号"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="vaildCode">
            <div class="vaildCode">
              <el-input
                class="mr-20"
                v-model="ruleForm.vaildCode"
                placeholder="请输入验证码"
              />
              <el-button
                v-show="show"
                type="warning"
                plain
                @click="getVaildCode"
                >获取验证码</el-button
              >
              <el-button v-show="!show" type="warning" plain
                >{{ count }}s</el-button
              >
            </div>
          </el-form-item>
          <div class="common-btnGroup pt-30 pb-40">
            <el-button type="primary" plain>取消</el-button>
            <el-button type="warning" @click="onSubmit">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DialogTitle from "components/DialogTitle";
import { ref, reactive, computed, toRefs, onMounted, inject } from "vue";
export default {
  name: "",
  components: {
    DialogTitle,
  },
  props: {},
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const vaildPhoneRef = ref(null);
    const message = inject("message");
    const counter = reactive({
      show: true,
      count: "",
      timer: null,
    });
    const form = reactive({
      ruleForm: {
        curPhone: "",
        newPhone: "",
        vaildCode: "",
      },
      rules: {
        curPhone: [
          { required: true, message: "请输入当前手机号", trigger: "blur" },
          {
            pattern:
              /^1[34589]\d{9}|17[2-9]\d{8}|16[0-1]\d{8}|16[3-4]\d{8}|166\d{8}|16[8-9]\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        newPhone: [
          { required: true, message: "请输入新手机号", trigger: "blur" },
          {
            pattern:
              /^1[34589]\d{9}|17[2-9]\d{8}|16[0-1]\d{8}|16[3-4]\d{8}|166\d{8}|16[8-9]\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        vaildCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { pattern: /^[0-9]{6}$/, message: "请输入正确的短信验证码" },
        ],
      },
    });
    const getVaildCode = () => {
      const TIME_COUNT = 60;
      if (!counter.timer) {
        counter.count = TIME_COUNT;
        counter.show = false;
        counter.timer = setInterval(() => {
          if (counter.count > 0 && counter.count <= TIME_COUNT) {
            counter.count--;
          } else {
            counter.show = true;
            clearInterval(counter.timer);
            counter.timer = null;
          }
        }, 1000);
      }
    };
    const onSubmit = (formName) => {
      console.log("=======修改密码数据======", form.ruleForm);
      if (counter.timer) {
        clearInterval(counter.timer);
      }
      // if (!formEl) return
      vaildPhoneRef.value.validate(async (valid) => {
        if (valid) {
          //TODO
          message({
            message: "手机号换绑成功！",
            type: "success",
          });
          //跳转登录页面
          dialogVisible.value = false;
        } else {
          console.log("error submit!!");
          message.error("手机号换绑失败，请重试！");
          dialogVisible.value = false;
        }
      });
    };

    return {
      ...toRefs(counter),
      ...toRefs(form),
      onSubmit,
      vaildPhoneRef,
      dialogVisible,
      getVaildCode,
    };
  },
};
</script>


<style lang="scss" scope>
@import "./index.scss";
.updateMobile {
  .formContent {
    padding: 40px;
    .remarks {
      height: 48px;
      font-size: 14px;
      font-weight: 400;
      line-height: 29px;
      color: #fc7019;
    }
    .vaildCode {
      display: flex;
    }
  }
}
</style>