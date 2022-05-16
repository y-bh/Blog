<!--
 * @Author: dengxiujie
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-04-27 17:37:35
 * @LastEditTime: 2022-05-16 15:07:44
-->
<template>
  <div class="container">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" label-position="top">
        <el-form-item label="套餐ID">
          <el-input v-model="searchForm.sequence" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input v-model="searchForm.mealName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-select v-model="searchForm.mealType" clearable class="filter-item">
            <el-option label="全部" value=null></el-option>
            <el-option v-for="(v,k) in mealType" :key="k" :label="v" :value="parseInt(k)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐状态">
          <el-select v-model="searchForm.status" clearable class="filter-item">
            <el-option
              v-for="(v,k) in mealState"
              :key="k" 
              :label="v" 
              :value="parseInt(k)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="使用时间">
          <el-date-picker
            v-model="searchForm.mealUseTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="剩余天数">
          <el-input v-model="searchForm.ipDay" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "",
  setup() {
    // 引入全局变量
    const global = inject('_global');
    const enumerateData = {
      mealType: Object.freeze(global.$mealType),
      mealState: Object.freeze(global.$mealState)
    }
    let state = reactive({
      // 查询表单
      searchForm: {
        sequence: null, // 套餐id
        mealName: '', // 套餐名称
        mealType: null, // 套餐类型
        status: null,
        mealUseTime: null,
        ipDay: null,  // 剩余天数
        page: 1,
        pageSize: 10
      }
    })

    onMounted(() => {});
    const methods = {};
    return {
      ...methods,
      ...toRefs(state),
      ...enumerateData
    };
  },
};
</script>
<style lang="scss" scoped>
</style>