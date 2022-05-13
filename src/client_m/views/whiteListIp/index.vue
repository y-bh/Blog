<!--
 * @Author: dengxiujie
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-04-27 17:46:10
 * @LastEditTime: 2022-05-13 09:31:33
-->
<template>
  <div class="white-list-wrap">
    <div class="white-list-text">
      <div>已设/总IP白名单数：{{ 4 }}/{{ 5 }}</div>
      <i ref="tooltipIconRef" class="tooltip tooltip-icon"> </i>
      <div class="tooltip tooltip-text">
        <p>IP的使用和提取地址须同时在白名单内</p>
        <p>该白名单功能仅针对长效IP</p>
      </div>
    </div>
    <div class="white-list-btn">
      <el-button class="cancel-button">查看教程</el-button>
      <el-button class="cancel-button" @click="openWhiteListDialog('add')">添加IP白名单</el-button>
    </div>
    <div class="auto-replace">
      <span>提取IP自动替换</span>
      <el-switch v-model="switchVal" class="auto-replace-switch" @change="switchChange"></el-switch>
    </div>
    <div class="api-text">Api接口</div>
    <div class="api-link"><a href="">点击获取白名单添加接口</a></div>
    <div class="api-link"><a href="">点击获取白名单删除接口</a></div>
    <div class="api-link"><a href="">点击获取白名单查询接口</a></div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="desc" label="备注">
          <template #default="{ row }">
            {{row.desc}}
            <button @click="openWhiteListDialog('edit', row)">edit</button>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="设置时间"></el-table-column>
        <el-table-column prop="operator" label="操作">
          <template #default="{ row }">
            <el-button class="table-delete-btn" @click="openRemoveDialog(row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 弹窗 打开&编辑白名单 ~ 确认删除 -->
  <editDialog ref="editDialogRef" />
  <removeDialog ref="removeDialogRef" />
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";

/**components */
import editDialog from "./components/editDialog"
import removeDialog from "./components/removeDialog"

export default {
  name: "",
  props: {},
  components: {
    editDialog,
    removeDialog,
  },
  setup() {
    const editDialogRef = ref(null)
    const removeDialogRef = ref(null)

    const state = reactive({
      tableData: [{
        id: 1,
        ip: 1,
        desc: 1,
        time: 1
      }],
      switchVal: true,
    })

    //打开弹窗
    function openWhiteListDialog(type = 'add', val = {}) {
      editDialogRef.value.openDialog(type, val);
    }
    function openRemoveDialog({ id }) {
      removeDialogRef.value.openDialog(id)
    }

    //switch Change
    function switchChange(val) {
      try {
        /**change auto replace func */

        state.switchVal = val
      } catch (error) {
        console.error('Change Auto Replace: ', error)
      }
    }

    onMounted(() => {
      state.switchVal = false
    });
    //const refData = toRefs(null);
    return {
      //   ...refData,
      ...toRefs(state),
      editDialogRef, //edit&add dialog Ref
      removeDialogRef, //remove dialog Ref

      switchChange, //switch Change
      openWhiteListDialog, //remove WhiteList Ip
      openRemoveDialog, //open Remove Dialog
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
