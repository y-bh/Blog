<!--
 * @Author: dengxiujie
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-04-27 17:46:10
 * @LastEditTime: 2022-05-11 15:53:35
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
      <button>查看教程</button>
      <button>添加IP白名单</button>
    </div>
    <div class="auto-replace">
      <span>提取IP自动替换</span>
      <el-switch v-model="switchVal" />
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
            <button>edit</button>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="设置时间"></el-table-column>
        <el-table-column prop="operator" label="操作">
          <template>
            <button>移除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
export default {
  name: "",
  props: {},
  setup() {
    const tooltipIconRef = ref(null)

    const state = reactive({
      tableData: [{
        ip: 1,
        desc: 1,
        time: 1
      }],
      switchVal: true
    })

    //移入

    onMounted(() => {});
    //const refData = toRefs(null);
    return {
      //   ...refData,
      ...toRefs(state),
      tooltipIconRef, //图标Ref
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
