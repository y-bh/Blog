<!--
 * @Author: dengxiujie
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-04-27 17:46:10
 * @LastEditTime: 2022-05-16 11:08:18
-->
<template>
  <div class="white-list-wrap">
    <div class="white-list-text">
      <div class="white-list-count">
        已设/总IP白名单数：<span>{{ whiteIpData.used }}/{{ whiteIpData.total }}</span>
      </div>
      <i ref="tooltipIconRef" class="tooltip tooltip-icon icon-xianxing-wenhao">
      </i>
      <div class="tooltip tooltip-text">
        <p>IP的使用和提取地址须同时在白名单内，该白名单功能仅针对长效IP</p>
      </div>
    </div>
    <div class="white-list-btn">
      <el-button class="cancel-button">查看教程</el-button>
      <el-button class="cancel-button" @click="openWhiteListDialog('add')"
        >添加IP白名单</el-button
      >
    </div>
    <div class="auto-replace">
      <span>提取IP自动替换</span>
      <el-switch
        v-model="switchVal"
        class="auto-replace-switch"
        @change="switchChange"
      ></el-switch>
    </div>
    <div class="api-text">
      <span>Api接口</span>
      <div class="api-link" @click="goGetIp">点击获取白名单添加接口</div>
      <div class="api-link" @click="goGetIp">点击获取白名单删除接口</div>
      <div class="api-link" @click="goGetIp">点击获取白名单查询接口</div>
    </div>
    <div class="table-wrap">
      <el-table
        :data="whiteIpData.data"
        style="width: 100%"
        :header-cell-style="tableHeaderColor"
      >
        <el-table-column prop="clientIP" label="IP" align="center"></el-table-column>
        <el-table-column prop="desc" label="备注" align="center">
          <template #default="{ row }">
            {{ row.desc }}
            <button @click="openWhiteListDialog('edit', row)">edit</button>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="设置时间"
          align="center"
        >
          <template #default="{ row }">
            <div>
              {{dateFormat(row.createTime*1000)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作" align="center">
          <template #default="{ row }">
            <el-button class="table-delete-btn" @click="openRemoveDialog(row)"
              >移除</el-button
            >
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
import editDialog from "./components/editDialog";
import removeDialog from "./components/removeDialog";

/**func */
import { getWhiteListFunc } from "model/whiteList";
import { updateUserInfo } from "model/user"

//tools
import { dateFormat } from "tools/dateFormat" 

export default {
  name: "",
  props: {},
  components: {
    editDialog,
    removeDialog,
  },
  setup() {
    const editDialogRef = ref(null);
    const removeDialogRef = ref(null);

    const state = reactive({
      whiteIpData: {}, //白名单所有数据
      switchVal: false,
    });

    //打开弹窗
    function openWhiteListDialog(type = "add", val = {}) {
      editDialogRef.value.openDialog(type, val);
    }
    function openRemoveDialog({ id }) {
      removeDialogRef.value.openDialog(id);
    }

    //switch change control
    async function switchChangeControl(val) {
      let params = {
        replace: val
      }
      updateUserInfo(params)
    }

    //switch Change
    function switchChange(val) {
      try {
        /**change auto replace func */
        // const res = await switchChangeControl(val)

        /**条件更改 */
        state.switchVal = val;
      } catch (error) {
        console.error("Change Auto Replace: ", error);
      }
    }

    // go getip
    function goGetIp() {
      window.location.href = window.location.origin + '/getIp' + `?wl`
    }

    //get white list
    async function getWhiteList() {
      let params = {
        pageNum: 1,
        pageSize: 9999
      }
      const res = await getWhiteListFunc(params);
      if(+res.code === 0){
        console.log(dateFormat(res.data));
        state.whiteIpData = res.data
      }
    }

    onMounted(() => {
      state.switchVal = false;

      getWhiteList()
    });

    /**表格头样式 */
    function tableHeaderColor() {
      return "background-color: #F2F7FE; font-size: 19px; height: 66px; color: #4C5664;";
    }

    return {
      //   ...refData,
      ...toRefs(state),
      editDialogRef, //edit&add dialog Ref
      removeDialogRef, //remove dialog Ref

      switchChange, //switch Change
      goGetIp, //go getip
      openWhiteListDialog, //remove WhiteList Ip
      openRemoveDialog, //open Remove Dialog

      tableHeaderColor, //table-header style func
      dateFormat, //date format
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
