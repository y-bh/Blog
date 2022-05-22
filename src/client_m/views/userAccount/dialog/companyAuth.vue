<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 17:07:26
 * @LastEditTime: 2022-05-22 16:55:57
-->
<template>
  <div class="companyAuth">
    <el-dialog v-model="dialogVisible">
      <DialogTitle :title-content="title" />
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
          ref="vaildCompanyCardRef"
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
            <el-button
              type="primary"
              plain
              @click="companyCancel(vaildCompanyCardRef)"
              >取消</el-button
            >
            <el-button type="warning" @click="onCompanySubmit">确定</el-button>
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
          <div ref="companyQrcodeRef"></div>
        </div>
        <div class="explain">
          <span>您的信息由支付宝审核，本平台无法保留您的识别信息</span>
        </div>
        <div class="common-btnGroup center pt-30 pb-40">
          <el-button type="primary" @click="authCompanyStep = 1"
            >返回上一步</el-button
          >
          <el-button type="warning" @click="getAuthResultDom"
            >查询结果</el-button
          >
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
            ref="uploadRef"
            action=""
            :auto-upload="false"
            :multiple="false"
            :on-change="handleChange"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :limit="1"
            accept="image/*"
          >
            <template #trigger>
              <el-button type="primary" plain>选择文件</el-button>
            </template>
            <el-button class="ml-50" type="warning" @click="submitUpload">
              提交
            </el-button>

            <template #tip>
              <div class="el-upload__tip tip-Grey">
                仅支持jpg、jpeg、png、gif格式文件，文件大小限5M
              </div>
            </template>
          </el-upload>
        </div>
        <div class="bootomTip pb-40">
          <span
            >还没有营业执照？<span class="blue" @click="goPersonAuth"
              >点击返回</span
            >个人认证</span
          >
        </div>
      </div>

      <!-- 提交后资料审核中 -->
      <div class="authContent" v-show="authCompanyStep == 4">
        <div class="title mt-40 ft-20 title">
          <span>资料审核中，您可自由购买套餐或提取IP</span>
        </div>
        <div class="common-btnGroup center pt-20 pb-40">
          <a href="/package" class="mr-40">
            <el-button type="primary">购买套餐</el-button>
          </a>
          <a href="/getIp">
            <el-button type="warning">提取IP</el-button>
          </a>
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
          <span>{{userInfo.identityName}}</span>|<span>{{userInfo.identityNum}}</span>
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
          <el-button type="primary" plain @click="authCompanyStep = 1"
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
          <span>{{ userInfo.identityName }} | {{ userInfo.identityNum }}</span>
        </div>
        <div class="common-btnGroup center upgradeBox pt-20 pb-40">
          <el-button type="primary" plain @click="upgradeCompany"
            >升级企业认证</el-button
          >
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
import { companyImg, zfbAuthCompany, getAuthResult } from "model/user.js";
import QRCode from "qrcodejs2";
export default {
  name: "",
  components: {
    DialogTitle,
  },
  props: {},
  setup(props, { emit }) {
    let certifyId = ref("");
    const companyQrcodeRef = ref(null);
    let userInfoSon = inject("userInfoSon");
    console.log("-userInfoSon-2-2222--", userInfoSon);
    const dialogVisible = ref(false);
    const vaildCompanyCardRef = ref(null);
    const message = inject("message");
    const authCompanyStep = ref(1); //认证步骤 1 1：姓名身份认证 2.扫支付宝 3：上传文件 4:提交后资料审核中 5：审核中 6：认证成功 7:认证失败 8：个人认证
    const title = ref("企业认证");
    // const userInfo = reactive({
    //   userName:"",
    //   idCardNo=""
    // });
    const uploadRef = ref(null);
    let fileList = reactive([]);
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
    const companyCancel = (formEl) => {
      dialogVisible.value = false;
      if (!formEl) return;
      formEl.resetFields();
    };

    const onCompanySubmit = (formName) => {
      console.log("=======修改密码数据======", form.ruleForm);
      // if (!formEl) return
      vaildCompanyCardRef.value.validate(async (valid) => {
        if (valid) {
          //TODO 后期需要加密
          let params = {
            name: form.ruleForm.name,
            idCard: form.ruleForm.idCardNo,
          };
          let res = await zfbAuthCompany({ data: JSON.stringify(params) });
          console.log(2222222222222, res);
          if (res.code == 200) {
            let url = res.data && res.data.url;
            if (url) {
              companyQrcodeRef.value.innerHTML = "";
              certifyId = res.data.certifyId;
              new QRCode(companyQrcodeRef.value, {
                text: url, //扫描二维码
                width: 240,
                height: 240,
              });
            }
            authCompanyStep.value = 2;
          } else {
            message.error("获取二维码失败：" + res.msg);
          }
        } else {
          console.log("error submit!!");
        }
      });
    };
    //扫码认证结果
    const getAuthResultDom = async () => {
      console.log("获取认证结果--------", certifyId);
      let res = await getAuthResult(certifyId);
      if (res && res.code == 200) {
        if (res.data) {
          authCompanyStep.value = 3;
        } else {
          //认证失败
          authCompanyStep.value = 7;
        }
      }
    };

    const handleChange = (uploadFile, uploadFiles) => {
      console.log(222222222, uploadFile);
      fileList = [];
      fileList.push(uploadFile);
    };
    const submitUpload = async () => {
      // console.log(444444444, fileList);
      if (fileList.length <= 0) {
        message.error("请先上传文件！");
        return;
      }
      let file = fileList[0];
      let type = file.raw.type;
      let isLt5m = file.raw.size / 1024 / 1024 < 5;
      let pngArr = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

      if (!pngArr.includes(type)) {
        message.error("上传图片只能是 jpg/jpeg/png/gif 格式!");
        return;
      }
      if (!isLt5m) {
        message.error("上传图片大小不能超过5m");
        return;
      }
      console.log(555555555555, fileList);
      //转换成64位数
      let imgFileData = "";
      imgFileData = await getBase64(fileList[0].raw);
      let res = await companyImg({data:imgFileData});
      console.log(444444444444, res);
      if (res.code != 200) {
        message.error(res.msg);
        dialogVisible.value = false;
      } else {
        authCompanyStep.value = 4;
      }
    };
    const getBase64 = async (file) => {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    };

    const handleExceed = (files) => {
      console.log(555555555555, files);

      uploadRef.value.clearFiles();
      const uploadFile = files[0];
      uploadRef.value.handleStart(uploadFile);
    };
    const goPersonAuth = () => {
      title.value = "个人认证";
      authCompanyStep.value = 8;
    };
    const upgradeCompany = () => {
      title.value = "企业认证";
      authCompanyStep.value = 3;
    };
    return {
      companyCancel,
      companyQrcodeRef,
      title,
      ...toRefs(userInfoSon),
      ...toRefs(form),
      onCompanySubmit,
      vaildCompanyCardRef,
      dialogVisible,
      authCompanyStep,
      getAuthResultDom,
      fileList,
      handleChange,
      submitUpload,
      handleExceed,
      uploadRef,
      upgradeCompany,
      goPersonAuth,
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
  .tip-Grey {
    font-size: 12px;
    line-height: 21px;
    color: #b2bccb;
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