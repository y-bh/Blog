<!--
 * @Author: dengxiujie
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-04-27 17:37:35
 * @LastEditTime: 2022-05-16 18:19:27
-->
<template>
  <div class="container">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" label-position="top" label-width="70px">
        <el-form-item label="套餐ID">
          <el-input v-model="searchForm.sequence" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input v-model="searchForm.mealName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-select v-model="searchForm.mealType" clearable placeholder="请选择" class="filter-item">
            <el-option label="全部" value=null></el-option>
            <el-option v-for="(v, k) in mealType" :key="k" :label="v" :value="parseInt(k)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐状态">
          <el-select v-model="searchForm.status" clearable placeholder="请选择" class="filter-item">
            <el-option v-for="(v, k) in mealState" :key="k" :label="v" :value="parseInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="剩余天数">
          <el-input v-model="searchForm.ipDay" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="使用时间">
          <el-date-picker v-model="searchForm.mealUseTime" type="daterange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="reset-form-item">
          <el-button class="filter-btn" type="default">
            重置
          </el-button>
          <el-button class="filter-btn" type="default">
            查询
          </el-button>
          <el-button class="filter-btn" type="default">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-wrap">
      <el-table :data="tableList" v-loading="loading" @selection-change="handleSelectionChange">
        <template v-slot:empty>
          <div>{{ emptyText }}</div>
        </template>

        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column align='center' label="套餐ID" prop="sequence" width="80" fixed>
          <template #default="scope">
            <div>
              <!--定制套餐显示 标签-->
              <el-button round type="primary" plain size="mini" v-if="scope.row.discountPrice">定制</el-button>
              <br v-if="scope.row.discountPrice">
              <span>{{ scope.row.sequence }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align='center' label="套餐类型" prop="proxyType" width="85">
          <template #default="scope">
            {{ mealType[scope.row.proxyType] ? mealType[scope.row.proxyType] : null }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="提取密钥" prop="key" width="85"></el-table-column>
        <el-table-column align='center' label="账号" prop="authKey" v-if="userInfo && userInfo.isProxyAuthKey" width="70">
        </el-table-column>
        <el-table-column align='center' label="密码" prop="authSecret" v-if="userInfo && userInfo.isProxyAuthKey" width="70">
          <template #default="scope">
            <div class="repeat-wrap">
              <span class="repeat">{{ scope.row.authSecret ? scope.row.authSecret : '--' }}</span>
              <span class="repeat repeat_pwd" @click="repeat(scope.row)">
                <i class="el-icon-refresh-left"></i>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align='center' label="IP时效(s)" prop="proxyTime">
          <template #default="scope">
            {{ scope.row.proxyTime ? scope.row.proxyTime : (scope.row.proxyType == '10' ? '不定' : 0) }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="提取上限" prop="total">
          <template #default="scope">
            {{ scope.row.proxyType == 10 ? '--' : (
                (scope.row.proxyType == 70 && scope.row.countLimit == false) ?
                  '--' : (scope.row.total ? scope.row.total : '--')
              )
            }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="已提取" prop="used">
          <template #default="scope">
            {{ scope.row.used ? scope.row.used : (scope.row.proxyType == '10' ? '--' : 0) }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="起止时间" prop="createTime" show-overflow-tooltip sortable width="120px">
          <template #default="scope">
            <div>
              {{ scope.row.createTime ? $formatTime(scope.row.createTime) : '— —' }}
              <br>
              {{ scope.row.endTime ? $formatTime(scope.row.endTime) : '— —' }}
            </div>

            <span
              v-if="((scope.row.endTime - new Date().getTime() / 1000) / 86400) > 0 && ((scope.row.endTime - new Date().getTime() / 1000) / 86400) < 1 && scope.row.isRefund !== true">
              即将到期
            </span>
            <span
              v-if="((scope.row.endTime - new Date().getTime() / 1000) / 86400) < 4 && ((scope.row.endTime - new Date().getTime() / 1000) / 86400) >= 1 && scope.row.isRefund !== true">
              剩余{{ Math.floor((scope.row.endTime - new Date().getTime() / 1000) / 86400) }}天
            </span>
            <span
              v-if="((scope.row.endTime - new Date().getTime() / 1000) / 86400) >= 4 && ((scope.row.endTime - new Date().getTime() / 1000) / 86400) <= 30 && scope.row.isRefund !== true">
              剩余{{ Math.floor((scope.row.endTime - new Date().getTime() / 1000) / 86400) }}天
            </span>
          </template>
        </el-table-column>
        <el-table-column align='center' label="状态" prop="status">
          <template #default="scope">
            <span v-if="scope.row.status" :style="{color: stateColor[scope.row.status]}">{{ mealState[scope.row.status] }}</span>
            <span v-else style="color:#fff">--</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label="操作" fixed="right">
          <!-- mealPayType  1付费   3：测试 -->
          <!-- proxyType   0: '包量'     1: '包时'       10: '计次'   20: '福利'  70: '不限量'-->
          <!-- iptype     10: '普通IP'   20: '优质IP'    30: '长效固定',  40: '长效静态'-->
          <template #default="scope">
            <el-dropdown v-if="scope.row">
              <span class="el-dropdown-link">
                管理
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>续费</el-dropdown-item>
                  <el-dropdown-item>api提取</el-dropdown-item>
                  <el-dropdown-item>补量</el-dropdown-item>
                  <el-dropdown-item>修改时效</el-dropdown-item>
                  <el-dropdown-item divided>合并套餐</el-dropdown-item>
                  <el-dropdown-item divided>变更记录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $formatTime } from "tools/dateFormat"
import { reactive, ref, toRefs, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "",
  setup () {
    // 引入全局变量
    const global = inject('_global');
    const enumerateData = {
      mealType: Object.freeze(global.$mealType),
      mealState: Object.freeze(global.$mealState)
    }
    const stateColor = {
      1: '#333',
      2: '#f00',
      3: '#f00',
      4: '#999'
    }

    console.log($formatTime,'$formatTime');
    let state = reactive({
      userInfo: null,
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
      },
      tableList: [],  // 表格数据
      loading: false,
      emptyText: '暂无数据'
    })
      state.tableList.push({
        sequence: 123,
        proxyType: 1,
        key: '11',
        authKey: '55',
        authSecret: 'qq',
        proxyTime: 1111111,
        total: 100,
        used: 20,
        createTime: 12000,
        endTime: 360000,
        status: 1
      })
    onMounted(() => { 
    });
    const methods = {
      handleSelectionChange () { }
    };

    console.log(state.tableList,'state.tableList');
    return {
      ...methods,
      ...toRefs(state),
      ...enumerateData,
      stateColor,
      $formatTime
    };
  },
};
</script>
<style lang="scss" scoped>
.search-form {
  margin-bottom: 40px;
  ::v-deep(.el-form) {
    color: red;
    box-shadow: 0px 0px 20px rgba(208, 224, 255, 0.4);
    padding: 20px 12px;
    box-sizing: border-box;

    .el-form-item {
      display: inline-flex;
      margin: 0 10px;

      .el-form-item__label {
        width: 70px;
        padding-right: 12px;
      }

      .el-input {
        width: 180px;
      }

      .filter-item {
        // width: 120px;
      }
    }

    .reset-form-item {
      display: inline-flex;

      .el-form-item__label {
        width: 0;
        padding: 0;
      }
    }
  }
}


.el-table {
  ::v-deep(th) {
    background: rgba(242, 247, 254, 0.39);
    color: #333;
  }
}
</style>