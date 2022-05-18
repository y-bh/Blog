<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 17:07:26
 * @LastEditTime: 2022-05-18 16:15:05
-->
<template>
  <div class="personalAuth">
    <!-- 姓名身份证 -->
    <el-dialog v-model="dialogVisible1">
      <DialogTitle title-content="个人认证" />
      <div class="formContent">
        <div class="remarks">
          <span>
            天启HTTP采用支付宝实名认证服务，仅能获取支付宝返回的实名认证结果信息。您的实名信息仍将保留在支付宝，受支付宝数据安全保护。
          </span>
        </div>
        <el-form
          ref="vaildIDCardRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm mt-30"
        >
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入身份证姓名" />
          </el-form-item>
          <el-form-item label="身份证号码" prop="idCardNo">
            <el-input
              v-model="ruleForm.idCardNo"
              placeholder="请输入身份证号码"
            />
          </el-form-item>
          <div class="common-btnGroup pt-30 pb-40">
            <el-button type="primary" plain>取消</el-button>
            <el-button type="warning" @click="onSubmit">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 姓名身份证 end-->
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
    //const 
    const dialogVisible1 = ref(true);
    const vaildIDCardRef = ref(null);
    const message = inject("message");
    const form = reactive({
      ruleForm: {
        name: "",
        idCardNo: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
            message: "请输入名称,字符不包含特殊字符",
            trigger: "blur",
          },
        ],
        idCardNo: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern:
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0,18]$)/,
            message: "身份证号码输入格式不正确",
            trigger: "blur",
          },
        ],
      },
    });

    const onSubmit = (formName) => {
      console.log("=======修改密码数据======", form.ruleForm);
      // if (!formEl) return
      vaildIDCardRef.value.validate(async (valid) => {
        if (valid) {
          //TODO

          //跳转登录页面
          dialogVisible.value = false;
        } else {
          console.log("error submit!!");
        }
      });
    };

    return {
      ...toRefs(form),
      onSubmit,
      vaildIDCardRef,
      dialogVisible1,
    };
  },
};
</script>


<style lang="scss" scope>
@import "./index.scss";
.personalAuth {
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