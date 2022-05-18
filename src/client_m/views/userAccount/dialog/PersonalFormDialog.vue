<!--
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-17 15:33:37
 * @LastEditTime: 2022-05-17 18:46:33
-->
<template>
  <div class="personalFormDialog">
    <el-dialog v-model="dialogVisibleFlag">
      <DialogTitle title-content="个人资料" />
      <div class="personal-info ml-40 mr-40 mt-40">
        <div class="title mb-30"><span>基本信息</span></div>
        <ul>
          <li class="mb-20">
            <span class="name">用户名</span><span class="val">zhangxixi</span>
          </li>
          <li class="mb-20">
            <span class="name">注册手机号</span
            ><span class="val">18809098787</span>
          </li>
          <li class="mb-20">
            <span class="name">身份证姓名</span><span class="val">*西西</span>
          </li>
          <li class="mb-20">
            <span class="name">身份证号码</span
            ><span class="val">340122********6789</span>
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
          <el-button type="primary" plain>取消</el-button>
          <el-button type="warning" @click="onSubmit">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DialogTitle from "components/DialogTitle";
import { ref, reactive, computed, toRefs, onBeforeMount, onMounted } from "vue";
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
    console.log(1111111, props.dialogVisible);
    //const { dialogVisible } = toRefs(props);
    //console.log(1111111, dialogVisible);
    const personForm = reactive({
      wxNo: "",
      QQNO: "",
      emailNo: "",
      business: "",
      job: "",
      businessArr: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
      ],
    });
    const onSubmit = () => {
      console.log("=======个人资料数据======", personForm);
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
    return {
      personForm,
      onSubmit,
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