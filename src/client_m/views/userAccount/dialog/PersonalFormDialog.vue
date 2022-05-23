<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 15:33:37
 * @LastEditTime: 2022-05-23 13:43:54
-->
<template>
  <div class="personalFormDialog">
    <el-dialog v-model="dialogVisibleFlag">
      <DialogTitle title-content="个人资料" />
      <div class="personal-info ml-40 mr-40 mt-40">
        <div class="title mb-30"><span>基本信息</span></div>
        <ul>
          <li class="mb-20">
            <span class="name">用户名</span
            ><span class="val">{{ userInfo.username }}</span>
          </li>
          <li class="mb-20">
            <span class="name">注册手机号</span
            ><span class="val">{{ userInfo.phone }}</span>
          </li>
          <li class="mb-20">
            <span class="name">身份证姓名</span
            ><span class="val">{{ userInfo.identityName }}</span>
          </li>
          <li class="mb-20">
            <span class="name">身份证号码</span
            ><span class="val">{{ userInfo.identityNum }}</span>
          </li>
        </ul>
      </div>
      <div class="personal-other ml-40 mr-40 mt-20 mb-20">
        <div class="title mb-20"><span>其他信息</span></div>
        <el-form
          :inline="true"
          :label-width="55"
          label-position="left"
          :model="personForm"
          class="personForm"
        >
          <el-form-item label="微信" class="ml-40">
            <el-input v-model="personForm.wxNo" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="QQ" :label-width="84" class="ml-40">
            <el-input v-model="personForm.QQNO" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="邮箱" class="ml-40">
            <el-input v-model="personForm.emailNo" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="业务方向" :label-width="84" class="ml-40">
            <el-select v-model="personForm.business" placeholder="请选择">
              <el-option
                v-for="item in personForm.businessArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="职业" class="ml-40">
            <el-input v-model="personForm.job" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <div class="common-btnGroup pt-30 pb-40">
          <el-button type="primary" plain @click="onCancel">取消</el-button>
          <el-button type="warning" @click="onSubmit">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DialogTitle from "components/DialogTitle";
import { updateUserInfo } from "model/user.js";
import {
  ref,
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  onMounted,
  inject,
  watch,
} from "vue";
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
    const $message = inject("message");
    let userInfoSon = inject("userInfoSon");
    console.log(1111111, userInfoSon);
    let personForm = reactive({
      wxNo: userInfoSon.userInfo.wxNo,
      QQNO: userInfoSon.userInfo.QQNo,
      emailNo: userInfoSon.userInfo.enmail,
      business: userInfoSon.userInfo.business,
      job: userInfoSon.userInfo.profession,
      businessArr: [
        {
          value: "采集数据",
          label: "采集数据",
        },
        {
          value: "网站流量",
          label: "网站流量",
        },
        {
          value: "养号",
          label: "养号",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
    });
    onBeforeMount(async () => {});
    const onSubmit = async () => {
      console.log("=======个人资料数据======", personForm);
      let params = {
        business: personForm.business,
        email: personForm.emailNo,
        profession: personForm.job,
        qq: personForm.QQNO,
        wechat: personForm.wxNo,
      };
      let res = await updateUserInfo(params);
      console.log(333333, res);
      if (res.code == 200 && res.data) {
        $message.success("资料修改成功！");
      } else {
        $message.success("资料修改失败，请重试！");
      }
      emit("updateDialog", false);
    };
    const onCancel = async () => {
      emit("updateDialog", false);
    };
    const dialogVisibleFlag = computed({
      get() {
        return props.dialogVisible;
      },
      set(value) {
        emit("updateDialog", false);
      },
    });
    watch(userInfoSon, () => {
      personForm.wxNo = userInfoSon.userInfo.wxNo;
      personForm.QQNO = userInfoSon.userInfo.QQNo;
      personForm.emailNo = userInfoSon.userInfo.enmail;
      personForm.business = userInfoSon.userInfo.business;
      personForm.job = userInfoSon.userInfo.profession;
    });
    return {
      ...toRefs(userInfoSon),
      personForm,
      onSubmit,
      onCancel,
      dialogVisibleFlag,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
.personalFormDialog {
  .title {
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    color: #4c5664;
  }
  .personal-info {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        .name {
          display: inline-block;
          width: 80px;
          margin-right: 20px;
        }
        .val {
          display: inline-block;
          width: 155px;
        }
      }
    }
  }
  .personForm {
    margin-left: -40px;
  }
}
</style>