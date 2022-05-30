<!--
 * @Author: dengxiujie
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-04-27 17:37:35
 * @LastEditTime: 2022-05-30 17:24:03
-->
<template>
  <div class="container">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" ref="searchFormRef" label-position="top" label-width="70px">
        <el-form-item label="套餐ID">
          <el-input v-model="searchForm.sequence" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input v-model="searchForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-select v-model="searchForm.mealType" clearable placeholder="请选择" class="filter-item">
            <el-option label="全部" value=null></el-option>
            <el-option v-for="(v, k) in mealType" :key="k" :label="v" :value="formatInt(k)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐状态">
          <el-select v-model="searchForm.proxyState" clearable placeholder="请选择" class="filter-item">
            <el-option label="全部" value=null></el-option>
            <el-option v-for="(v, k) in mealState" :key="k" :label="v" :value="formatInt(k)" />
          </el-select>
        </el-form-item>
        <el-form-item label="剩余天数">
          <el-input v-model="searchForm.remainDays" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="使用时间">
          <el-date-picker v-model="searchForm.useTime" type="datetimerange" value-format="X" range-separator="至"
            start-placeholder="开始时间" end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="reset-form-item">
          <el-button class="filter-btn" type="default" @click="onReset">
            重置
          </el-button>
          <el-button class="filter-btn" type="default" @click="onSearch">
            查询
          </el-button>
          <el-button class="filter-btn" type="default" @click="batchDelete">
            批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table-wrap">
      <el-table :data="tableList" :row-style="rowClass" v-loading="loading" @selection-change="handleSelectionChange">
        <template #empty>
          <div>
            <div class="flex justify-content-center empty-box"></div>
            <p class="flex justify-content-center text-desc">暂无内容</p>
          </div>
        </template>

        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column align='center' label="套餐ID" prop="sequence" width="130" fixed>
          <template #default="{ row }">
            <div class="sequence">
              <!--定制套餐显示 标签-->
              <span class="discount_btn" v-if="!row.discount"></span>
              <el-button round type="primary" class="discount_btn" plain size="mini" v-if="row.discount">定制</el-button>
              <span>{{ row.sequence }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align='center' label="套餐名称" prop="name" width="85">
          <template #default="{ row }">
            {{ row.name || '--' }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="套餐类型" prop="proxyType" width="85">
          <template #default="{ row }">
            {{ mealType[row.proxyType] ? (row.proxyType === 70 ? '不限量' : mealType[row.proxyType]) : null }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="提取密钥" prop="key" width="85">

        </el-table-column>
        <el-table-column align='center' label="账号" prop="authKey" v-if="userInfo && userInfo.proxyApiOpend" width="70">
        </el-table-column>
        <el-table-column align='center' label="密码" prop="authSecret" v-if="userInfo && userInfo.proxyApiOpend"
          width="70">
          <template #default="{ row }">
            <div class="repeat-wrap">
              <span class="repeat">{{ row.authSecret ? row.authSecret : '--' }}</span>
              <span class="repeat repeat_pwd" @click="repeatPwd(row)">
                <i class="table-icon el-icon-refresh-left"></i>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align='center' label="IP时效" prop="proxyTime">
          <template #default="{ row }">
            <!-- 计次显示不定 -->
            {{ row.proxyTime ? row.proxyTime : (row.proxyType == '10' ? '不定' : 0) }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="提取上限" prop="total">
          <template #default="{ row }">
            {{ row.proxyType == 10 ? '--' : (
                (row.proxyType == 70 && row.countLimit == false) ?
                  '--' : (row.total ? row.total : '--')
              )
            }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="已提取" prop="used">
          <template #default="{ row }">
            {{ row.used ? row.used : (row.proxyType == '10' ? '--' : 0) }}
          </template>
        </el-table-column>
        <el-table-column align='center' label="起止时间" prop="createTime" show-overflow-tooltip sortable width="180px">
          <template #default="{ row }">
            <div>
              {{ row.createTime ? dateFormat(row.createTime * 1000) : '— —' }}
              <br>
              {{ row.endTime ? dateFormat(row.endTime * 1000) : '— —' }}
            </div>
            <!-- 套餐没有退款 显示-->
            <div v-show="!row.isRefund">
              <span
                v-show="((row.endTime - new Date().getTime() / 1000) / 86400) > 0 && ((row.endTime - new Date().getTime() / 1000) / 86400) < 1">
                即将到期
              </span>
              <span style="color: #f10215"
                v-show="((row.endTime - new Date().getTime() / 1000) / 86400) < 4 && ((row.endTime - new Date().getTime() / 1000) / 86400) >= 1">
                剩余{{ Math.floor((row.endTime - new Date().getTime() / 1000) / 86400) }}天
              </span>
              <span style="color: #67C23A"
                v-show="((row.endTime - new Date().getTime() / 1000) / 86400) >= 4 && ((row.endTime - new Date().getTime() / 1000) / 86400) <= 30">
                剩余{{ Math.floor((row.endTime - new Date().getTime() / 1000) / 86400) }}天
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align='center' label="状态" prop="state">
          <template #default="{ row }">
            <span v-if="row.state" :style="{ color: stateColor[row.state] }">
              {{ mealState[row.state] }}
            </span>
            <span v-else style="color:#fff">--</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label="操作" fixed="right">
          <!-- mealPayType  1付费   3：测试 -->
          <!-- proxyType 套餐类型   0: '包量'     1: '包时'       10: '计次'   60: '福利'  70: '不限量'-->
          <!-- iptype     10: '普通IP'   20: '优质IP'    30: '长效固定',  40: '长效静态'-->
          <template #default="{ row }">
            <el-dropdown trigger="click" @command="handleCommand($event, row)">
              <span class="el-dropdown-link">
                管理
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <!--判断付费类型   付费 第一步-->
                  <template v-if="row.mealPayType === 1">
                    <!--判断套餐类型    计次  福利 第二步-->
                    <template v-if="row.proxyType === 10 || row.proxyType === 60">
                      <el-dropdown-item command="renewal">续费</el-dropdown-item>
                      <el-dropdown-item command="extract" v-if="row.proxyType === 10">api提取</el-dropdown-item>
                    </template>
                    <!-- 包时 包量   第二步-->
                    <template v-else>
                      <!-- 判断套餐状态  正常 1  用完 3   第三步-->
                      <template v-if="row.state === 1 || row.state === 3">
                        <!-- api购买  第四步-->
                        <template v-if="row.preOrderPaid">
                          <el-dropdown-item command="extract" v-if="row.state !== 4">api提取</el-dropdown-item>
                          <el-dropdown-item command="changeLog">变更记录</el-dropdown-item>
                        </template>
                        <!-- 第四步 -->
                        <template v-else>
                          <el-dropdown-item command="renewal">续费</el-dropdown-item>
                          <el-dropdown-item command="supplement" v-if="row.proxyType !== 0">补量</el-dropdown-item>
                          <el-dropdown-item command="modify" v-if="row.state !== 3">修改时效</el-dropdown-item>
                          <el-dropdown-item command="merge" v-if="row.proxyType !== 1">合并套餐</el-dropdown-item>
                          <el-dropdown-item command="extract" v-if="row.state !== 3">api提取</el-dropdown-item>
                          <el-dropdown-item command="changeLog">变更记录</el-dropdown-item>
                        </template>
                      </template>
                      <!--  2 禁用  4到期/过期   第三步-->
                      <template v-else>
                        <el-dropdown-item command="renewal" v-if="row.state === 4 && !row.preOrderPaid">续费
                        </el-dropdown-item>
                        <el-dropdown-item command="changeLog">变更记录</el-dropdown-item>
                      </template>
                    </template>
                  </template>
                  <!-- 测试   第一步-->
                  <template v-else>
                    <el-dropdown-item command="extract">api提取</el-dropdown-item>
                  </template>

                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination v-model:currentPage="searchForm.pageNum" class="text-right mt-30"
      layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[20, 50, 100, 500]"
      :page-size="searchForm.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <reset-password ref="passwordRef" @updateTable="updateTable($event)"></reset-password>
    <renewal ref="renewalRef" @createCode="createCode($event)"></renewal>
    <supplement ref="supplementRef" @createCode="createCode($event)"></supplement>
    <modify ref="modifyRef" @createCode="createCode($event)"></modify>
    <merge ref="mergeRef" @updateTable="updateTable($event)"></merge>
    <pay-code ref="codeRef" @updateMeal="updateMeal($event)"></pay-code>
    <change-log ref="logRef"></change-log>
    <delete-meal ref="deleteRef" @updateTable="updateTable($event)"></delete-meal>
  </div>
</template>

<script>
import { dateFormat } from "tools/dateFormat"
import { formatInt, deepCopy } from "tools/utility"
import { reactive, ref, toRefs, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import resetPassword from './components/resetPassword'
import renewal from './components/renewal';
import supplement from './components/supplement';
import modify from './components/modify';
import merge from './components/merge';
import changeLog from './components/changeLog'
import payCode from "./components/payCode.vue";
import deleteMeal from "./components/deleteMeal.vue";
import { getTableList } from "model/meal.js";
import { getMineInfo } from "model/user.js";
export default {
  name: "",
  components: {
    resetPassword,
    renewal,  // 续费
    supplement,  // 补量
    modify, // 修改时效
    merge,  // 合并套餐
    changeLog,  // 变更记录
    payCode,  // 扫码支付
    deleteMeal  //批量删除
  },
  setup () {
    // 引入全局变量
    const global = inject('_global');
    const message = inject('message');
    const $router = useRouter();
    const $route = useRoute()
    const enumerateData = {
      mealType: Object.freeze(global.$mealType),
      mealState: Object.freeze(global.$mealState)
    }
    const stateColor = {
      1: '#27ADC2',
      2: '#F8486F',
      3: '#f00',
      4: '#999'
    }
    const searchFormRef = ref(null);
    const renewalRef = ref(null);
    const supplementRef = ref(null);
    const modifyRef = ref(null);
    const mergeRef = ref(null);
    const passwordRef = ref(null);
    const codeRef = ref(null);
    const logRef = ref(null);
    const deleteRef = ref(null);
    let state = reactive({
      userInfo: null,
      // 查询表单
      searchForm: {
        sequence: null, // 套餐id
        name: '', // 套餐名称
        mealType: null, // 套餐类型
        proxyState: null,
        useTime: null,
        remainDays: null,  // 剩余天数
        pageNum: 1,
        pageSize: 10
      },
      multipleSelection: null,
      total: 0,
      tableList: [],  // 表格数据
      loading: false,
      emptyText: '暂无数据'
    })

    onMounted(async () => {
      await methods.getUserData();
      await methods.getList();
      
    });
    const methods = {
      async getUserData(){
        let res = await getMineInfo();
        if(res && res.code === 200){
          state.userInfo = res.data || null;
        }
        console.log(state.userInfo,'state.userInfo');
        
      },
      // 处理查询参数
      initQuery () {
        let query = $route.query;
        state.searchForm.sequence = query.sequence || null;
        state.searchForm.name = query.name || null;
        state.searchForm.mealType = (query.mealType === 0 || query.mealType) ? formatInt(query.mealType) : null;
        state.searchForm.proxyState = formatInt(query.proxyState) || null;
        state.searchForm.remainDays = formatInt(query.remainDays) || null;
        state.searchForm.pageNum = formatInt(query.pageNum) || 1;
        state.searchForm.pageSize = formatInt(query.pageSize) || 50;

      },
      async getList () {
        state.loading = true;
        state.tableList = [];
        methods.initQuery();
        const params = deepCopy(state.searchForm);
        params.createTimeStart = $route.query.useTime && formatInt($route.query.useTime[0]) ||
          (state.searchForm.useTime && formatInt(state.searchForm.useTime[0]))
        params.createTimeEnd = $route.query.useTime && formatInt($route.query.useTime[1]) ||
          (state.searchForm.useTime && formatInt(state.searchForm.useTime[1]))
        let res = await getTableList(params);
        if (res && res.code === 200) {
          state.tableList = res.data && res.data.data;
          state.total = res.data && res.data.totalSize;
          // console.log(state.tableList);
        } else {
          message.error({
            message: res && res.message || '接口异常',
            showClose: true
          })
          state.loading = false;
          return
        }
        state.loading = false;
      },
      async onSearch () {
        await $router.push({
          path: $route.path,
          query: state.searchForm
        })
        methods.getList();
      },
      async onReset () {
        // 重置表单查询参数
        searchFormRef.value.resetFields();
        state.searchForm.useTime = null;
        await $router.push({
          path: $route.path
        })
        methods.getList();
      },
      // 表格显示条数改变事件
      handleSizeChange (pageSize) {
        state.searchForm.pageSize = pageSize;
        methods.handleCurrentChange(1)
      },
      // 页数改变事件
      async handleCurrentChange (page) {
        state.searchForm.pageNum = page;
        await $router.push({
          path: $route.path,
          query: state.searchForm
        })
        methods.getList();
      },
      handleSelectionChange (val) {
        state.multipleSelection = val;
      },
      batchDelete () {
        let deleteArr = [];
        let now = new Date().getTime() / 1000;
        if (state.multipleSelection.length === 0) {
          message.warning("请选择套餐！");
          return;
        }

        let msg = "";
        state.multipleSelection.forEach(item => {
          deleteArr.push(item.id);
          if (item.ipType === 40) {
            msg = "长效套餐不能删除";
          } else if (item.proxyType === 0) {
            if (item.mealPayType === 3 && item.total > item.used && item.endTime > now) msg = "未用完套餐不能删除";
            else if (item.mealPayType !== 3 && item.total > item.used) msg = "未用完套餐不能删除";
          } else if (item.proxyType === 1 || item.proxyType === 60) {
            if (item.endTime > now) msg = "未到期套餐不能删除";
          } else if (item.proxyType === 10) {
            msg = "按次提取套餐不能删除";
          } else if (item.proxyType === 70) {
            if (item.endTime > now) msg = "未到期套餐不能删除"
          }
        });

        if (msg) {
          message.warning(msg + ", 请重新选择！");
          return;
        } else {
          deleteRef.value.onOpen(deleteArr)
        }
      },

      rowClass (val) {
        if (val.row.state === 4 || val.row.state === 3) {
          return { "color": "#B2BCCB !important" };
        } else {
          return { "color": "#4C5664" }
        }
      },
      // 操作
      handleCommand (command, row) {
        console.log(row,'row===');
        if (command === 'renewal') {
          if (row.proxyType === 10) {
            // console.log('去套餐购买页');
            location.href = '/package'
          } else {
            renewalRef.value.onOpen(row)
          }
        } else if (command === 'supplement') {
          console.log(row, '补量');
          if (row.discount) {
            message.warning({
              message: '定制套餐请联系您的专属销售修改补量',
              showClose: true
            })
          } else {
            supplementRef.value.onOpen(row)
          }

        } else if (command === 'modify') {
          console.log('修改时效');
          if (row.discount) {
            message.warning({
              message: '定制套餐请联系您的专属销售修改时效',
              showClose: true
            })
          } else {
            modifyRef.value.onOpen(row)
          }

        } else if (command === 'merge') {
          console.log('合并套餐');
          mergeRef.value.onOpen(row)
        } else if (command === 'extract') {
          // console.log('api提取跳转');
          location.href='/getIp'
        } else if (command === 'changeLog') {
          logRef.value.onOpen(row)
        } else {
          message.error({
            message: '操作异常!',
            showClose: true
          })
          return
        }
      },
      createCode (code) {
        console.log('创建二维码', code);
        codeRef.value.onOpen(code)
      },
      updateMeal () {
        // 刷新套餐列表
        methods.getList()
      },
      updateTable () {
        // 刷新套餐列表
        methods.getList()
      },
      repeatPwd (row) {
        passwordRef.value.onOpen(row)
      }
    };

    return {
      ...toRefs(state),
      ...methods,
      ...enumerateData,
      formatInt,
      stateColor,
      dateFormat,
      passwordRef,
      searchFormRef,
      renewalRef,
      supplementRef,
      modifyRef,
      mergeRef,
      codeRef,
      logRef,
      deleteRef
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>