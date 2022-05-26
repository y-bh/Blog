<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 15:04:59
 * @LastEditTime: 2022-05-26 13:41:53
-->
<template>
  <div class="userAccount">
    <div class="account pt-40">
      <div class="left mb-10">
        <div class="user-info">
          <span class="user-name mr-20">用户名</span
          ><span>{{ userInfo.username }}</span>
          <div class="user-edit ml-30 pointer" @click="editPersonInfo">
            <img src="@/assets/images/edit.png" alt="" />
          </div>
        </div>
        <div class="group-btn ml-60">
          <el-button
            type="primary"
            @click="openKey"
            v-if="userInfo.proxyApiOpend"
            >密钥</el-button
          >
          <a
            href="https://wpa1.qq.com/Lkz12X21?_type=wpa&qidian=true"
            target="_blank"
          >
            <el-button
              type="warning"
              v-if="!userInfo.isHasSeller"
              class="ml-20"
            >
              联系销售</el-button
            >
          </a>
        </div>
      </div>
      <div class="account-vipInfo">
        第<span class="orange ml-15 mr-15">{{ vipNum }}</span
        >位会员
      </div>
    </div>
    <!--  -->
    <div class="operation">
      <div class="operate-box ml-20 mr-20 mt-20 mb-20">
        <div class="name"><span>手机号码</span></div>
        <div class="content mt-20">
          <div class="number">
            <span>{{ userInfo.phone }}</span>
          </div>
          <div class="group-btn">
            <el-button type="default" plain @click="updateMobile"
              >换绑手机</el-button
            >
            <el-button type="warning" plain @click="dialogPwdVisible = true"
              >修改密码</el-button
            >
          </div>
        </div>
      </div>
      <div class="operate-box ml-20 mr-20 mt-20 mb-20 balance">
        <div class="balance-name">
          <span>账户余额（天启币）</span>
          <span class="ml-10">
            <el-tooltip
              effect="customized"
              content="1元=1000天启币，账户余额不支持提现"
              placement="right"
              class="common-tooltip"
            >
              <i class="iconfont icon-xianxing-wenhao"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="bottom mt-20">
          <div class="amount">
            <span>{{ userInfo.balance }}</span>
          </div>
          <div>
            <el-button type="warning" @click="jumpToPackage">
              <span class="pl-20 pr-20">充值</span>
            </el-button>
          </div>
        </div>
      </div>
      <div class="operate-box operate-box-big ml-20 mr-20 mt-20 mb-20">
        <div class="name"><span>实名认证</span></div>
        <div class="explain mt-20">
          <span
            >根据您的身份选择认证类型，实名信息为非公开信息，我司不会向他人透露您的认证信息</span
          >
        </div>
        <!-- 未认证 -->
        <div
          class="group-btn mt-20 alginRight"
          v-if="
            !userInfo.identityAuth &&
            !userInfo.companyAuth &&
            userInfo.verifyState == 'none'
          "
        >
          <el-button type="primary" plain @click="personAuth"
            >个人认证</el-button
          >
          <el-button class="customTip" type="primary" plain @click="companyAuth"
            >企业认证</el-button
          >
        </div>
        <!--个人认证通过后如下显示  -->
        <div
          class="group-btn mt-20 alginRight"
          v-if="
            !userInfo.companyAuth &&
            userInfo.identityAuth &&
            userInfo.verifyState == 'none'
          "
        >
          <el-button class="" type="primary" plain @click="queryPersonAuth"
            >个人认证&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!--企业认证通过后如下显示  -->
        <div class="group-btn mt-20 alginRight" v-if="userInfo.companyAuth">
          <el-button class="" type="primary" plain @click="queryCompayStatus"
            >企业认证&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!--企业认证审核中  -->
        <div
          class="group-btn mt-20 alginRight"
          v-if="
            !userInfo.companyAuth &&
            userInfo.verifyState &&
            userInfo.verifyState == 'wait'
          "
        >
          <el-button class="" type="warning" plain @click="queryCompayStatus"
            >企业认证审核中&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!--企业认证失败  -->
        <div
          class="group-btn mt-20 alginRight"
          v-if="
            !userInfo.companyAuth &&
            userInfo.verifyState &&
            userInfo.verifyState == 'fail'
          "
        >
          <el-button class="" type="danger" plain @click="queryCompayStatus"
            >企业认证失败&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!-- 企业已支付宝认证 且未上传图片 -->
        <div
          class="group-btn mt-20 alginRight"
          v-if="
            !userInfo.companyAuth &&
            userInfo.verifyState &&
            userInfo.verifyState == 'cut'
          "
        >
          <el-button class="" type="primary" plain @click="queryCompayStatus"
            >企业认证未完成&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
      </div>
      <!-- 有销售 -->
      <div
        v-if="userInfo.isHasSeller"
        class="operate-box operate-box-big ml-20 mr-20 mt-20 mb-20 saleBox"
      >
        <div class="saleInfo">
          <div class="name"><span>您的专属销售</span></div>
          <div class="sale-name mt-20">
            <span>{{ userInfo.sale.sellerName }}</span
            ><span class="ml-15">{{ userInfo.sale.profession }}</span>
          </div>
          <div class="telep mt-20">
            <span>{{ userInfo.sale.sellerPhone }}</span>
            <span class="copyBtn ml-20" @click="copy(userInfo.sale.sellerPhone)"
              >复制</span
            >
          </div>
        </div>
        <div class="saleWX">
          <img src="@/assets/images/managerWX.png" alt="销售微信" />
        </div>
      </div>
    </div>

    <!-- 个人资料弹框 -->
    <PersonalFormDialog
      :dialogVisible="dialogPersonVisible"
      @updateDialog="updatePersonDialog"
    ></PersonalFormDialog>

    <!--修改密码  -->
    <updatePwdDialog
      :dialogVisible="dialogPwdVisible"
      @updateDialog="updatePwdDialog"
    ></updatePwdDialog>

    <!-- 换绑手机 -->
    <UpdateMobile ref="updateMobileRef" @updateUserInfo="getUserInfo"></UpdateMobile>
    <!-- 密匙 -->
    <KeyDialog ref="keyRef"></KeyDialog>
    <!-- 个人认证 -->
    <PersonalAuth ref="perAuthRef" @updateUserInfo="getUserInfo"></PersonalAuth>
    <!-- 企业认证 -->
    <companyAuth ref="companyAuthRef" @updateUserInfo="getUserInfo"></companyAuth>
  </div>
</template>

<script>
import PersonalFormDialog from "./dialog/PersonalFormDialog";
import updatePwdDialog from "./dialog/updatePwdDialog";
import UpdateMobile from "./dialog/UpdateMobile";
import KeyDialog from "./dialog/KeyDialog";
import PersonalAuth from "./dialog/PersonalAuth";
import companyAuth from "./dialog/companyAuth";

import { getMineInfo } from "model/user.js";

import useClipboard from "vue-clipboard3";

import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  inject,
  provide,
} from "vue";
export default {
  name: "",
  components: {
    PersonalFormDialog,
    updatePwdDialog,
    UpdateMobile,
    KeyDialog,
    PersonalAuth,
    companyAuth,
  },
  props: {},
  setup() {
    const vipNum = ref(0);
    const $message = inject("message");
    const { toClipboard } = useClipboard();
    let dialogPersonVisible = ref(false);
    let dialogPwdVisible = ref(false);
    const updateMobileRef = ref(null);
    const keyRef = ref(null);
    const perAuthRef = ref(null);
    const companyAuthRef = ref(null);
    let authStates = ref(5);
    let state = reactive({
      //authStates: 5, //1:未认证 2：个人认证通过  3：企业认证通过 4：企业认证审核中 5：企业认证审核未通过
      userInfo: {
        isIntermediate: null, //企业实名认证结果
        id: "", //用户的id
        reason: "", //失败原因
        username: "", //用户名
        phone: "", //手机
        balance: 0, //余额
        companyAuth: false, //公司认证
        verifyState: "none", //none:"未认证" wait“审核中” “fail”：失败
        identityAuth: false, //个人认证
        phoneNumAuth: false,
        proxyApiOpend: false, //是否打开密匙
        identityName: "",
        identityNum: "",
        keyInfo: {
          //密匙
          key: "",
          value: "",
        },
        isHasSeller: false, //有无销售
        sale: {
          //销售信息
          sellerName: "",
          profession: "",
          sellerPhone: "",
          link: "", //二维码
        },
        wxNo: "",
        QQNo: "",
        enmail: "",
        business: "",
        profession: "",
      },
    });
    provide("userInfoSon", state);
    const editPersonInfo = () => {
      //编辑个人信息
      //console.log(3333, dialogPersonVisible);
      dialogPersonVisible.value = true;
    };
    const updatePersonDialog = (falg) => {
      //console.log(333333, falg);
      dialogPersonVisible.value = falg;
    };
    const updatePwdDialog = (falg) => {
      //密码
      dialogPwdVisible.value = falg;
      //更新
    };
    const updateMobile = () => {
      //console.log(updateMobileRef.value.dialogVisible);
      updateMobileRef.value.dialogVisible = true;
    };
    const openKey = () => {
      keyRef.value.dialogVisible = true;
    };
    onBeforeMount(async () => {
      await getUserInfo();
      //console.log(22222222, state.userInfo.id);
      if (state.userInfo.id) {
        let bigId = state.userInfo.id * 3 + 130000;
        vipNum.value =
          parseInt((bigId % 1000000) / 100000) +
          "" +
          parseInt((bigId % 100000) / 10000) +
          "" +
          parseInt((bigId % 10000) / 1000) +
          "" +
          parseInt((bigId % 1000) / 100) +
          "" +
          parseInt((bigId % 100) / 10) +
          "" +
          (bigId % 10);
      }
    });
    onMounted(() => {});
    const queryCompayStatus = () => {
      let auth = state.userInfo.companyAuth;
      let status = state.userInfo.verifyState;
      // console.log("==========当前企业的状态====", status);
      if (auth) {
        companyAuthRef.value.title = "企业认证";
        companyAuthRef.value.authCompanyStep = 6;
        companyAuthRef.value.dialogVisible = true;
        return;
      }
      if (!auth && status == "wait") {
        companyAuthRef.value.title = "企业认证";
        companyAuthRef.value.authCompanyStep = 5;
        companyAuthRef.value.dialogVisible = true;
        return;
      }
      if (!auth && status == "fail") {
        companyAuthRef.value.title = "企业认证";
        companyAuthRef.value.authCompanyStep = 7;
        companyAuthRef.value.dialogVisible = true;
         return;
      }
      if (!auth && status == "cut") {
        companyAuthRef.value.title = "企业认证";
        companyAuthRef.value.authCompanyStep = 3;
        companyAuthRef.value.dialogVisible = true;
         return;
      }
    };
    const getUserInfo = async () => {
      //TODO 通过cookie获取用户信息
      let res = await getMineInfo();
      //console.log(333333333333, res);
      if (res && res.code == 200) {
        let data = res.data ? res.data : {};
        state.userInfo = {
          isIntermediate: data.intermediate ? data.intermediate : false, //默认为false
          id: data.id ? Number(data.id) : 0,
          reason: data.reason ? data.reason : "", //失败原因
          username: data.username ? data.username : "", //用户名
          phone: phoneFormat(data.phone), //手机
          balance: data.balance ? Number(data.balance).toLocaleString() : 0, //余额
          companyAuth: data.companyAuth ? data.companyAuth : false, //公司认证
          verifyState: data.res ? data.res : "none", //cut:"未认证" wait“审核中” “fail”：失败
          identityAuth: data.identityAuth ? data.identityAuth : false, //个人认证
          proxyApiOpend: data.proxyApiOpend ? data.proxyApiOpend : false, //
          identityName: data.identityName ? data.identityName : "",
          identityNum: data.identityNum ? data.identityNum : "",
          keyInfo: {
            //密匙
            key: data.proxyApiKey,
            value: data.proxyApiIv,
          },
          isHasSeller:
            data.sellerInfo &&
            data.sellerInfo.vest &&
            data.sellerInfo.vest.nickname
              ? true
              : false, //有无销售
          sale: {
            //销售信息
            sellerName:
              data.sellerInfo &&
              data.sellerInfo.vest &&
              data.sellerInfo.vest.nickname
                ? data.sellerInfo.vest.nickname
                : "--",
            profession:
              data.sellerInfo && data.sellerInfo.sellerLevel
                ? data.sellerInfo.sellerLevel
                : "--",
            sellerPhone:
              data.sellerInfo &&
              data.sellerInfo.vest &&
              data.sellerInfo.vest.phone
                ? data.sellerInfo.vest.phone
                : "--",
            link:
              data.sellerInfo &&
              data.sellerInfo.vest &&
              data.sellerInfo.vest.link
                ? data.sellerInfo.vest.link
                : null,
          },
          wxNo: data.wechat ? data.wechat : "",
          QQNo: data.qq ? data.qq : "",
          enmail: data.email ? data.email : "",
          business: data.business ? data.business : "",
          profession: data.profession ? data.profession : "",
        };
      }
    };
    const phoneFormat = (value) => {
      if (!value) return "";
      const phoneFormat =
        value.toString().substring(0, 3) +
        "****" +
        value.toString().substring(7, 11);
      return phoneFormat;
    };
    const jumpToPackage = () => {
      window.location.href = "/package";
    };

    const copy = async (val) => {
      try {
        await toClipboard(val);
        $message.success("复制成功");
      } catch (e) {
        $message.error("复制成功");
      }
    };
    const queryPersonAuth = () => {
      companyAuthRef.value.title = "个人认证";
      companyAuthRef.value.authCompanyStep = 8;
      companyAuthRef.value.dialogVisible = true;
    };
    const personAuth = () => {
      //perAuthRef.value.title = "个人认证"
      perAuthRef.value.authPersonStep = 1;
      perAuthRef.value.dialogVisible = true;
    };
    const companyAuth = () => {
      companyAuthRef.value.title = "企业认证";
      companyAuthRef.value.authCompanyStep = 1;
      companyAuthRef.value.dialogVisible = true;
    };
    return {
      getUserInfo,
      vipNum,
      queryCompayStatus,
      personAuth,
      queryPersonAuth,
      companyAuth,
      authStates,
      editPersonInfo,
      dialogPersonVisible,
      updatePersonDialog,
      dialogPwdVisible,
      updatePwdDialog,
      updateMobile,
      updateMobileRef,
      keyRef,
      openKey,
      perAuthRef,
      companyAuthRef,
      jumpToPackage,
      ...toRefs(state),
      copy,
    };
  },
};
</script>
 
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style  lang="scss">
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: #e8f0ff;
  color: #4c5664;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: #e8f0ff;
  right: 0;
}
</style>