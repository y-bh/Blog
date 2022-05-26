<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 17:07:26
 * @LastEditTime: 2022-05-26 16:50:40
-->
<template>
  <div class="personalAuth">
    <el-dialog v-model="dialogVisible"  @close ="closeDialog">
      <DialogTitle title-content="个人认证" />
      <!-- 姓名身份证 -->
      <div class="formContent" v-show="authPersonStep == 1">
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
            <el-button type="primary" plain @click="cancel(vaildIDCardRef)"
              >取消</el-button
            >
            <el-button type="warning" @click="onZFBSubmit">确定</el-button>
          </div>
        </el-form>
      </div>
      <!-- 姓名身份证 end-->
      <!-- 扫码 -->
      <div class="authContent" v-show="authPersonStep == 2">
        <div class="explain pt-40">
          <span>请打开支付宝扫描下方二维码</span>
        </div>
        <div class="scan mt-30 mb-20">
          <div ref="qrcodeRef"></div>
        </div>
        <div class="explain">
          <span>您的信息由支付宝审核，本平台无法保留您的识别信息</span>
        </div>
        <div class="common-btnGroup center pt-30 pb-40">
          <el-button type="primary" @click="authPersonStep = 1"
            >返回上一步</el-button
          >
          <el-button type="warning" @click="getAuthResultDom"
            >查询结果</el-button
          >
        </div>
      </div>

      <!-- 认证成功 -->
      <div class="authContent" v-show="authPersonStep == 3">
        <div class="title mt-40"><span>恭喜您，实名认证成功！</span></div>
        <div class="common-btnGroup center pt-20 pb-40">
          <router-link class="mr-40" to="setMeal">
            <el-button type="primary">查看套餐</el-button>
          </router-link>
          <a href="/getIp">
            <el-button type="warning">提取IP</el-button>
          </a>
        </div>
      </div>

      <!-- 认证失败 -->
      <div class="authContent" v-show="authPersonStep == 4">
        <div class="title mt-40 erro"><span>认证失败，请重新认证</span></div>
        <div class="mt-30 tip">
          <div><span>提示：</span></div>
          <div>
            <span>
              认证结果由支付宝提供，请您仔细核对身份证信息，确认无误后重新填写，并进行支付宝认证。
            </span>
          </div>
        </div>
        <div class="mt-30 pb-40">
          <el-button type="primary" @click="authPersonStep = 1"
            >重新认证</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DialogTitle from "components/DialogTitle";
import { ref, reactive, computed, toRefs, onMounted, inject } from "vue";
import { zfbAuth, getAuthResult } from "model/user.js";
import QRCode from "qrcodejs2";
export default {
  name: "",
  components: {
    DialogTitle,
  },
  props: {},
  setup(props, { emit }) {
    //const
    let certifyId = ref("");
    const qrcodeRef = ref(null);
    const dialogVisible = ref(false);
    const vaildIDCardRef = ref(null);
    const message = inject("message");
    const authPersonStep = ref(1); //认证步骤1:姓名身份证验证 2:支付宝二维码 3：认证成功 4：认证失败
    let isSubmitIdCard = ref(false); //是否已经提交用户信息
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

    const onZFBSubmit = async (formName) => {
      console.log("=======修改密码数据======", form.ruleForm);
      // if (!formEl) return
      vaildIDCardRef.value.validate(async (valid) => {
        if (valid) {
          //TODO 后期需要加密
          let params = {
            name: form.ruleForm.name,
            idCard: form.ruleForm.idCardNo,
          };
          let res = await zfbAuth({ data: JSON.stringify(params) });
          console.log(2222222222222, res);
          if (res.code == 200) {
            let url = res.data && res.data.url;
            if (url) {
              qrcodeRef.value.innerHTML = "";
              certifyId.value = res.data.certifyId;
              new QRCode(qrcodeRef.value, {
                text: url, //扫描二维码
                width: 240,
                height: 240,
              });
              isSubmitIdCard.value = true;
            }
            authPersonStep.value = 2;
          } else {
            message.error(res.message ? res.message : "获取二维码失败!");
          }
        } else {
          console.log("error submit!!");
        }
      });
    };
    //扫码认证结果
    const getAuthResultDom = async () => {
      console.log("获取认证结果--------", certifyId.value);
      let res = await getAuthResult(certifyId.value);
      if (res && res.code == 200) {
        if (res.data === null) {
          return message.error("暂未获取到认证结果请稍后再试");
        } else if (res.data) {
          authPersonStep.value = 3;
        } else {
          //认证失败
          // message.error("身份验证失败！");
          authPersonStep.value = 4;
        }
      } else {
        message.error(res.message || "系统异常");
      }
    };
    //取消
    const cancel = (formEl) => {
      dialogVisible.value = false;
      if (!formEl) return;
      formEl.resetFields();
    };
    const closeDialog = function(){
      //console.log("----------测试关闭-------------");
      if(isSubmitIdCard.value){
        emit("updateUserInfo");
      }
    }
    return {
      closeDialog,
      cancel,
      qrcodeRef,
      ...toRefs(form),
      onZFBSubmit,
      vaildIDCardRef,
      dialogVisible,
      authPersonStep,
      getAuthResultDom,
    };
  },
};
</script>


<style lang="scss" scope>
@import "./index.scss";
.personalAuth {
}
</style>