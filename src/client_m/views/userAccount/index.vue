<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-04-27 15:04:59
 * @LastEditTime: 2022-05-20 09:53:28
-->
<template>
  <div class="userAccount">
    <div class="account pt-40">
      <div class="left mb-10">
        <div class="user-info">
          <span class="user-name mr-20">用户名</span><span>{{ username }}</span>
          <div class="user-edit ml-30" @click="editPersonInfo">
            <img src="@/assets/images/edit.png" alt="" />
          </div>
        </div>
        <div class="group-btn ml-60">
          <el-button type="primary" @click="openKey">密钥</el-button>
          <el-button type="warning" v-if="!sale.sellerId" class="ml-20"
            >联系销售</el-button
          >
        </div>
      </div>
      <div class="account-vipInfo">
        第<span class="orange ml-15 mr-15">20000</span>位会员
      </div>
    </div>
    <!--  -->
    <div class="operation">
      <div class="operate-box ml-20 mr-20 mt-20 mb-20">
        <div class="name"><span>手机号码</span></div>
        <div class="content mt-20">
          <div class="number">
            <span>{{ phone }}</span>
          </div>
          <div class="group-btn">
            <el-button type="primary" plain @click="updateMobile"
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
          <div class="amount"><span>300，987，222</span></div>
          <div>
            <el-button type="warning">
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
        <div class="group-btn mt-20 alginRight" v-if="authStates == 1">
          <el-button type="primary" plain>个人认证</el-button>
          <el-button class="customTip" type="primary" plain>企业认证</el-button>
        </div>
        <!--个人认证通过后如下显示  -->
        <div class="group-btn mt-20 alginRight" v-if="authStates == 2">
          <el-button class="" type="primary" plain
            >个人认证&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!--企业认证通过后如下显示  -->
        <div class="group-btn mt-20 alginRight" v-if="authStates == 3">
          <el-button class="" type="primary" plain
            >企业认证&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!--企业认证审核中  -->
        <div class="group-btn mt-20 alginRight" v-if="authStates == 4">
          <el-button class="" type="warning" plain
            >企业认证审核中&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
        <!--企业认证失败  -->
        <div class="group-btn mt-20 alginRight" v-if="authStates == 5">
          <el-button class="" type="danger" plain
            >企业认证失败&nbsp;&nbsp;|&nbsp;&nbsp;查看</el-button
          >
        </div>
      </div>
      <!-- 有销售 -->
      <div
        v-if="sale.sellerId"
        class="operate-box operate-box-big ml-20 mr-20 mt-20 mb-20 saleBox"
      >
        <div class="saleInfo">
          <div class="name"><span>您的专属销售</span></div>
          <div class="sale-name mt-20">
            <span>{{ sale.sellerName }}</span
            ><span class="ml-15">{{ sale.profession }}</span>
          </div>
          <div class="telep mt-20">
            <span>{{ sale.sellerPhone }}</span>
            <span class="copyBtn ml-20">复制</span>
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
    <UpdateMobile ref="updateMobileRef"></UpdateMobile>
    <!-- 密匙 -->
    <KeyDialog ref="keyRef"></KeyDialog>
    <!-- 个人认证 -->
    <PersonalAuth ref="perAuthREf"></PersonalAuth>
    <!-- 企业认证 -->
    <companyAuth ref="companyAuthREf"></companyAuth>
  </div>
</template>

<script>
import PersonalFormDialog from "./dialog/PersonalFormDialog";
import updatePwdDialog from "./dialog/updatePwdDialog";
import UpdateMobile from "./dialog/UpdateMobile";
import KeyDialog from "./dialog/KeyDialog";
import PersonalAuth from "./dialog/PersonalAuth";
import companyAuth from "./dialog/companyAuth";
import { ref, reactive, toRefs, onBeforeMount, onMounted } from "vue";
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
    let dialogPersonVisible = ref(false);
    let dialogPwdVisible = ref(false);
    const updateMobileRef = ref(null);
    const keyRef = ref(null);
    const perAuthREf = ref(null);
    const companyAuthREf = ref(null);
    let authStates = ref(5); //1:未认证 2：个人认证通过  3：企业认证通过 4：企业认证审核中 5：企业认证审核未通过
    let userInfo = null;
    onBeforeMount(() => {});
    onMounted(() => {});

    const editPersonInfo = () => {
      //编辑个人信息
      console.log(3333, dialogPersonVisible);
      dialogPersonVisible.value = true;
    };
    const updatePersonDialog = (falg) => {
      console.log(333333, falg);
      dialogPersonVisible.value = falg;
    };
    const updatePwdDialog = (falg) => {
      //密码
      dialogPwdVisible.value = falg;
    };
    const updateMobile = () => {
      console.log(updateMobileRef.value.dialogVisible);
      updateMobileRef.value.dialogVisible = true;
    };
    const openKey = () => {
      keyRef.value.dialogVisible = true;
    };

    const getUserInfo = async () => {
      //TODO 通过cookie获取用户信息
      let userInfoData = {
        username: "rstq",
        phone: "176****4041",
        balance: 225000,

        companyAuth: false,
        identityAuth: false,
        phoneNumAuth: false,
        proxyApiOpend: true,
        keyInfo: {
          key: "7q45dEDYB7e5mSp9",
          value: "isPuE5gU8H7gZDVI",
        },
        sale: {
          sellerId: "10086", //有无销售
          sellerName: "风清扬",
          profession: "销售经理",
          sellerPhone: "18809098787",
          sellerAccount: null,
        },
      };
      // if(){

      // }
      userInfo = reactive(userInfoData);
    };
    getUserInfo();

    return {
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
      perAuthREf,
      companyAuthREf,
      ...toRefs(userInfo),
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