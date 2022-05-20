<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 17:07:26
 * @LastEditTime: 2022-05-19 17:32:40
-->
<template>
  <div class="companyAuth">
    <el-dialog v-model="dialogVisible">
      <DialogTitle title-content="企业认证" />
      <!-- 姓名身份证 -->
      <div class="formContent" v-show="authCompanyStep == 1">
        <div class="tip">
          <span>
            天启HTTP采用支付宝实名认证服务，仅能获取支付宝返回的实名认证结果信息。您的实名信息仍将保留在支付宝，受支付宝数据安全保护。
          </span>
          <span class="mt-10"
            >企业认证需要提交营业执照相关资料并审核通过，非企业用户请勿选择此通道</span
          >
        </div>
        <el-form
          ref="vaildIDCardRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm mt-30"
        >
          <el-form-item label="真实姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入联系人/法人身份证姓名"
            />
          </el-form-item>
          <el-form-item label="身份证号码" prop="idCardNo">
            <el-input
              v-model="ruleForm.idCardNo"
              placeholder="请输入联系人/法人身份证号"
            />
          </el-form-item>
          <div class="common-btnGroup pt-30 pb-40">
            <el-button type="primary" plain>取消</el-button>
            <el-button type="warning" @click="onSubmit">确定</el-button>
          </div>
        </el-form>
      </div>
      <!-- 姓名身份证 end-->
      <!-- 扫码 -->
      <div class="authContent" v-show="authCompanyStep == 2">
        <div class="explain mt-40">
          <span>请打开支付宝扫描下方二维码</span>
        </div>
        <div class="scan mt-30 mb-20">
          <div id="qcCode"></div>
        </div>
        <div class="explain">
          <span>您的信息由支付宝审核，本平台无法保留您的识别信息</span>
        </div>
        <div class="common-btnGroup center pt-30 pb-40">
          <el-button type="primary" @click="authCompanyStep == 1"
            >返回上一步</el-button
          >
          <el-button type="warning" @click="getAuthResult">查询结果</el-button>
        </div>
      </div>
      <!-- 提交文件 -->
      <div class="authContent" v-show="authCompanyStep == 3">
        <div class="tip mt-40">
          <span>
            支付宝认证成功，可正常提取使用IP，请继续企业认证，请上传企业营业执照照片
          </span>
        </div>
        <div class="mb-30 mt-30">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <div class="common-btnGroup center">
              <el-button type="primary" plain>选择文件</el-button>
              <el-button type="warning" @click="authCompanyStep == 4"
                >提交</el-button
              >
            </div>

            <template #tip>
              <div class="el-upload__tip">
                仅支持jpg、jpeg、png、gif格式文件，文件大小限5M
              </div>
            </template>
          </el-upload>
        </div>
        <div class="bootomTip pb-40">
          <span
            >还没有营业执照？<span class="blue">点击返回</span>个人认证</span
          >
        </div>
      </div>

      <!-- 资料审核中 -->
      <div class="authContent" v-show="authCompanyStep == 4">
        <div class="title mt-40 ft-20 smallGrey">
          <span>资料审核中，您可自由购买套餐或提取IP</span>
        </div>
        <div class="common-btnGroup center pt-20 pb-40">
          <el-button type="primary" @click="authCompanyStep == 1"
            >购买套餐</el-button
          >
          <el-button type="warning" @click="getAuthResult">提取IP</el-button>
        </div>
      </div>

      <!-- 审核中 -->
      <div class="authContent" v-show="authCompanyStep == 5">
        <div class="smallGrey mt-40 mb-30">
          <span>授权支付宝安全认证，平台不会泄露您的认证信息</span>
        </div>
        <div class="bigOrange pb-40"><span>企业营业执照审核中</span></div>
      </div>
      <!-- 认证成功 -->
      <div class="authContent" v-show="authCompanyStep == 6">
        <div class="smallGrey mt-40 mb-30">
          <span>授权支付宝安全认证，平台不会泄露您的认证信息</span>
        </div>
        <div class="bigGrey pb-40">
          <span>*珊珊 | 341102********6427</span>
        </div>
      </div>

      <!-- 认证失败 -->
      <div class="authContent" v-show="authCompanyStep == 7">
        <div class="smallGrey mt-40 mb-30">
          <span>授权支付宝安全认证，平台不会泄露您的认证信息</span>
        </div>
        <div class="title erro"><span>企业认证失败</span></div>
        <div class="mt-15">
          <div class="reason smallGrey">
            <span>失败原因：</span
            ><span>
              认证结果由支付宝提供，请您仔细核对身份证信息，确认，并进行支付宝认证。
            </span>
          </div>
        </div>
        <div class="mt-30 pb-40">
          <el-button type="primary" plain @click="authCompanyStep == 5"
            >重新认证</el-button
          >
        </div>
      </div>

      <!-- 个人认证 -->
      <div class="authContent" v-show="authCompanyStep == 8">
        <div class="smallGrey mt-40 mb-30">
          <span>授权支付宝安全认证，平台不会泄露您的认证信息</span>
        </div>
        <div class="bigGrey">
          <span>*珊珊 | 341102********6427</span>
        </div>
        <div class="common-btnGroup center upgradeBox pt-20 pb-40">
          <el-button type="primary" plain>升级企业认证</el-button>
          <div class="upgrade">
            <img src="@/assets/images/bubble.png" alt="泡泡" />
          </div>
        </div>
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
    //const
    const dialogVisible = ref(false);
    const vaildIDCardRef = ref(null);
    const message = inject("message");
    const authCompanyStep = ref(8); //认证步骤
    const fileList = reactive([
      {
        name: "food.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      },
      {
        name: "food2.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      },
    ]);
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
          // {
          //   pattern:
          //     /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0,18]$)/,
          //   message: "身份证号码输入格式不正确",
          //   trigger: "blur",
          // },
        ],
      },
    });

    const onSubmit = (formName) => {
      console.log("=======修改密码数据======", form.ruleForm);
      // if (!formEl) return
      vaildIDCardRef.value.validate(async (valid) => {
        if (valid) {
          //TODO
          authCompanyStep.value = 2;
          //跳转登录页面
          dialogVisible.value = false;
        } else {
          authCompanyStep.value = 2;
          console.log("error submit!!");
        }
      });
    };
    //扫码认证结果
    const getAuthResult = () => {
      //
      let result = true;
      if (result) {
        authCompanyStep.value = 3;
      } else {
        authCompanyStep.value = 4;
      }
    };

    const handleExceed = (files, uploadFiles) => {
      message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${
          files.length + uploadFiles.length
        } totally`
      );
    };
    const beforeRemove = (files, uploadFiles) => {
      console.log(files);
    };
    const handlePreview = (uploadFile) => {
      console.log(uploadFile);
    };
    const handleRemove = (files, uploadFiles) => {
      console.log(files);
    };

    return {
      ...toRefs(form),
      onSubmit,
      vaildIDCardRef,
      dialogVisible,
      authCompanyStep,
      getAuthResult,
      fileList,
      handleExceed,
      beforeRemove,
      handlePreview,
      handleRemove,
    };
  },
};
</script>


<style lang="scss" scope>
@import "./index.scss";
.companyAuth {
  .bootomTip {
    font-size: 14px;
    line-height: 32px;
    color: #677294;
    text-align: right;
    .blue {
      color: #1968fc;
    }
  }
  .reason {
    text-align: left;
  }
  .smallGrey {
    font-size: 14px;
    color: #b2bccb;
  }
  .bigOrange {
    font-size: 20px;
    color: #fc7019;
  }
  .bigGrey {
    font-size: 20px;
    color: #4c5664;
  }
  .upgradeBox {
    display: flex;
    align-items: center;
    justify-content: center;
    .upgrade {
      position: relative;
      &:after {
        content: "3000IP";
        color: #ffffff;
        font-size: 14px;
        line-height: 35px;
        width: 81px;
        height: 35px;
        border-radius: 15px 15px 15px 0;
        display: block;
        position: absolute;
        top: -3px;
        left: 7px;
      }
    }
  }
}
</style>