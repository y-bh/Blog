<!--
 * @Author: 李云涛
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-12 10:19:45
 * @LastEditTime: 2022-05-16 14:14:12
-->
<template>
  <el-dialog
    v-model="dialogVisible"
    width="28%"
    top="21vh"
    custom-class="desc-dialog"
    @closed="closeCallback"
    :show-close="false"
  >
    <DialogTitle title-content="IP白名单" />
    <div class="desc-form-wrap">
      <el-form ref="formRef" :model="formData" :rules="rules">
        <el-form-item label="IP地址" label-width="80px" prop="ip">
          <el-input
            v-model="formData.ip"
            placeholder="请输入ip"
            :readonly="ipReadonly"
          />
        </el-form-item>
        <el-form-item label="备注信息" label-width="80px">
          <el-input
            v-model="formData.desc"
            :rows="4"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="footer-btn">
        <el-button class="cancel-button" @click="closeDialog">取消</el-button>
        <el-button class="confirm-button ml-30" @click="submitForm">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { IP } from "config/re.config";

//component
import DialogTitle from "components/DialogTitle";

//func
import { addWhiteIpFunc, updateWhiteIpDescFunc } from "model/whiteList"

import { inject, reactive, ref, toRefs } from "vue";
export default {
  props:{
    ok: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  components: {
    DialogTitle,
  },
  setup(props) {
    const $message = inject('message')

    const formRef = ref(null);

    const state = reactive({
      dialogVisible: false, //dialog control
      ipReadonly: null, //ip diable

      formData: {
        ip: null, //data-ip
        desc: null, //data-desc
      },
    });

    const rules = reactive({
      ip: [
        {
          required: true,
          pattern: IP,
          message: "请输入ip地址",
          trigger: "blur",
        },
      ],
    });

    //open dialog control
    function openDialogControl() {
      state.dialogVisible = true;
    }

    //close dialog control
    function closeDialogControl() {
      state.dialogVisible = false;
    }

    //open dialog
    function openDialog(type, { clientIP = null }) {
      /**this is func */
      if (type === "edit") {
        state.formData.ip = clientIP;
        state.ipReadonly = "readonly";
      }

      openDialogControl();
    }

    //close dialog
    function closeDialog() {
      closeDialogControl();
    }

    //close Callback , reset valiable
    function closeCallback() {
      state.ipReadonly = null;

      //reset params
      state.formData = {
        ip: null, //data-ip
        desc: null, //data-desc
      }
      //reset valiable
      formRef.value.resetFields();
    }

    //readonly control ? update desc & add white ip
    async function uaFuncControl(readonly, params) {
      try {

        let res = null;

        res = (readonly&&await updateWhiteIpDescFunc(params)) || await addWhiteIpFunc(params)

        /**条件判断返回值 */
        if(+res.code === 0){
          $message.success('操作成功')
          props.ok()
        } else {
          $message.error(res.msg)
        }

        return 
        
      } catch (error) {
        console.error('Update Desc Error: ', error);
      }
    }

    //submit form data & close dialog
    function submitForm() {
      //close dialog & destroy data
      formRef.value
        .validate()
        .then((e, a) => {
          console.log("Submit: ", state.formData);

          /**控制方法 */
          uaFuncControl(state.ipReadonly, {...state.formData})

          closeDialog();
        })
        .catch((err) => {
          console.error("Form Validate Error: ", err);
        });
    }

    return {
      formRef, //form Ref
      ...toRefs(state),
      rules, //校验规则
      openDialog, //打开函数
      closeDialog, //关闭函数
      submitForm, //保存函数
      closeCallback, //重置参数
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
