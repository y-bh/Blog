<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 15:33:37
 * @LastEditTime: 2022-05-27 10:56:59
-->
<template>
  <div class="personalFormDialog">
    <el-dialog
      @close="closeDialog"
      v-model="dialogVisibleFlag"
      custom-class="customClass customize_dialog dialog-double"
    >
      <DialogTitle title-content="个人资料" />
      <div class="dialog-body">
        <div class="person-introduce">
          <p class="title"><span>基本信息</span></p>

          <ul class="person-cont">
            <li class="person-item">
              <span>用户名</span>
              <span>{{ userInfo.username }}</span>
            </li>
            <li class="person-item">
              <span>注册手机号</span>
              <span>{{ userInfo.phone }}</span>
            </li>
            <li class="person-item">
              <span>身份证姓名</span>
              <span>{{ userInfo.identityName }}</span>
            </li>
            <li class="person-item">
              <span>身份证号码</span>
              <span>{{ userInfo.identityNum }}</span>
            </li>
          </ul>
        </div>

        <div class="title"><span>其他信息</span></div>
        <el-form
          :inline="true"
          label-width="85px"
          label-position="left"
          :model="personForm"
          :rules="rules"
          ref="perFormRefs"
        >
          <el-form-item label="微信">
            <el-input v-model="personForm.wxNo" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="QQ" prop="QQNO">
            <el-input v-model="personForm.QQNO" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="邮箱" prop="emailNo">
            <el-input v-model="personForm.emailNo" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="业务方向">
            <el-select v-model="personForm.business" placeholder="请选择">
              <el-option
                v-for="item in personForm.businessArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="personForm.job" placeholder="请输入" />
          </el-form-item>

          <div class="dialog-footer child-item footer-double">
            <el-button type="primary" plain @click="onCancel">取消</el-button>
            <el-button type="warning" @click="onSubmit">保存</el-button>
          </div>
        </el-form>
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
    let perFormRefs = ref(null);
    console.log(1111111, userInfoSon);
    let rules = reactive({
      wxNo: [
        {
          pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
          message: "微信必须是以字母开头的6-20个子母、数字、下划线和减号组成,不能设置中文",
          trigger: "blur",
        },
      ],
      QQNO: [
        {
          pattern: /^[1-9][0-9]{4,11}$/,
          message: "QQ只能是5到12位数字组成",
          trigger: "blur",
        },
      ],
      emailNo: [
        {
          pattern:
            /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
          message: "请输入正确的邮箱格式",
          trigger: "blur",
        },
      ],
    });
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
      perFormRefs.value.validate(async (valid) => {
        if (valid) {
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
            emit("updateDialog", false);
          } else {
            $message.error(
              res.message ? res.message : "资料修改失败，请重试！"
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    const closeDialog = function () {
      // console.log("----------测试关闭-------------");
    };
    return {
      closeDialog,
      perFormRefs,
      rules,
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

.dialog-body {
  .title {
    font-size: 20px;
    font-weight: 400;
    color: #4c5664;
    margin-bottom: 20px;
  }
}

.person-introduce {
  padding: 0 0 20px 0;
  box-sizing: border-box;

  .person-title {
    margin: 0;
    padding: 0 0 10px 0;
    font-size: 16px;
    font-weight: bold;
    box-sizing: border-box;
  }

  .person-cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    .person-item {
      flex: 0 0 50%;
      padding: 10px 0;
      // margin-right: 25px;
      box-sizing: border-box;
      list-style: none;

      span:first-child {
        display: inline-block;
        min-width: 80px;
        margin-right: 6px;
      }
    }
  }
}
</style>
<style>
</style>