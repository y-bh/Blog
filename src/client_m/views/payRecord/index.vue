<!--
 * @Author: 陈昊天
 * @LastEditors: 秦琛
 * @description: 购买记录
 * @Date: 2022-05-13 15:09:26
 * @LastEditTime: 2022-05-31 13:33:06
-->
<template>
  <div class="container grid">
    <div class="search-form">
      <el-form label-width="70px" ref="searchFormRef">
        <el-form-item label="订单编号">
          <el-input placeholder="请输入订单编号" v-model="searchForm.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="使用时间">
          <el-date-picker v-model="searchForm.timeList" type="datetimerange" value-format="X" range-separator="至"
            start-placeholder="开始时间" end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input placeholder="请输入套餐名称" v-model="searchForm.mealName"></el-input>
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
    <!-- <div class="bottom"> -->
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <template #empty>
          <div>
            <div class="flex justify-content-center empty-box"></div>
            <p class="flex justify-content-center text-desc">暂无内容</p>
          </div>
        </template>
        <el-table-column type="selection" />
        <el-table-column prop="orderNo" label="订单编号" align="center">
        </el-table-column>
        <el-table-column prop="orderType" label="订单类型" align="center">
          <template #default="{ row }">
            <span>{{
                row.state ? orderTypeMap.get(row.orderType) : "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mealName" label="套餐名称" align="center">
          <template #default="{ row }">
            <span> {{ row.mealName || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template #default="{ row }">
            <div class="flex-center flex-column">
              <span :class="{
                order_red: row.state === 1 || row.state === 6,
                order_green: row.state === 5,
                order_yellow: row.state === 4,
              }">
                {{ row.state ? stateMap.get(row.state) : "--" }}
              </span>
              <span v-show="row.state === 1" class="order_red">
                {{ countDown[row.orderNo] }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="支付方式" align="center">
          <template #default="{ row }">
            <span>{{ row.payType ? payTypeMap.get(row.payType) : "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="支付金额" align="center">
        </el-table-column>
        <el-table-column label="交易前后余额(元)" align="center" width="180px">
          <template #default="{ row }">
            <div class="box flex-center flex-column">
              <span>{{ row.preAmount || row.preAmount === 0 ? (row.preAmount / 1000).toFixed(2) : "--" }}</span>
              <span>{{ row.curAmount || row.curAmount === 0 ? (row.curAmount / 1000).toFixed(2) : "--" }}</span>
               
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建|支付时间" prop="createTime" align="center" sortable width="180px">
          <template #default="{ row }">
             <div>
                {{row.createTime ? dateFormat(new Date(row.createTime * 1000)) : "--"}}
               <br>
                {{row.payTime ? dateFormat(new Date(row.payTime * 1000)) : "--"}}
            </div>
          </template>
        </el-table-column>
        <!-- class="pay-btn" -->
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button v-show="row.state === 1" @click="onPay(row)" size="small">支付</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- </div> -->

    <el-pagination v-model:currentPage="searchForm.pageNum" class="text-right mt-30"
      layout="total, sizes, prev, pager, next, jumper" :total="totalSize" :page-sizes="[20, 50, 100, 500]"
      :page-size="searchForm.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
  <delete-record ref="deleteRef" @updateTable="updateTable($event)"></delete-record>
  <payOrder ref="payRef" @createCode="createCode($event)"></payOrder>
  <pay-code ref="codeRef" @updateMeal="updateMeal($event)"></pay-code>
</template>

<script>
import { reactive, ref, toRefs, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PAY_TYPE_MAP, ORDER_TYPE_MAP, STATE_MAP } from "./data.js";
import { dateFormat } from "tools/dateFormat.js";
import { formatInt, deepCopy, formatBit } from "tools/utility"
import { getOrderList, batchDelOrder } from "model/payRecord.js";
import deleteRecord from "./components/deleteRecord.vue";
import payOrder from "./components/payOrder.vue";
import payCode from "./components/payCode.vue";
// 存放待支付订单剩余时间及其对应的定时器
const awaitPay = new Map();
export default {
  components: {
    deleteRecord,
    payOrder,
    payCode
  },
  setup () {
    const payTypeMap = ref(PAY_TYPE_MAP);
    const orderTypeMap = ref(ORDER_TYPE_MAP);
    const stateMap = ref(STATE_MAP);
    const message = inject("message");
    const $router = useRouter();
    const $route = useRoute();
    const deleteRef = ref(null);
    const searchFormRef = ref(null);
    const codeRef = ref(null);
    const payRef = ref(null);
    const state = reactive({
      searchForm: {
        mealName: null, //套餐名称
        orderNo: null, //订单编号
        timeList: null,  // 时间
        pageNum: 1, //分页页码
        pageSize: 50, //分页大小
        payEnd: null, //支付结束时间
        payStart: null, //支付开始时间
      },

      tableData: [],
      countDown: {},  // 显示倒计时
      totalPage: 0,
      totalSize: 0,
      orderNoSet: [], //批量删除订单编号
    });

    onMounted(async () => {
      await getQueryList()

    });

    const initQuery = () => {
      let query = $route.query;
      state.searchForm.mealName = query.mealName || null;
      state.searchForm.orderNo = query.orderNo || null;
      state.searchForm.pageNum = formatInt(query.pageNum) || 1;
      state.searchForm.pageSize = formatInt(query.pageSize) || 50;
    }

    //获取列表数据
    const getQueryList = async () => {
      initQuery();
      const params = deepCopy(state.searchForm);
      params.payStart = $route.query.timeList && formatInt($route.query.timeList[0]) ||
        (state.searchForm.timeList && formatInt(state.searchForm.timeList[0]))

      params.payEnd = $route.query.timeList && formatInt($route.query.timeList[1]) ||
        (state.searchForm.timeList && formatInt(state.searchForm.timeList[1]))

      const res = await getOrderList(params);
      if (res && res.code === 200) {

        state.tableData = res.data && res.data.data || [];
        state.totalSize = res.data && res.data.totalSize || 0;

        if (state.tableData && state.tableData.length) {
          state.tableData.forEach(elem => {
            if (elem && elem.state === 1) {
              // 待支付订单显示倒计时 创建时间 订单编号
              deadLine(elem.createTime, elem.orderNo);
            }
          });
        }

      }
    };

    // 计算截止剩余时间
    const deadLine = (createTime, id) => {
      // console.log(createTime, id);
      // 创建时间精确到毫秒
      const startTime = createTime && createTime * 1000 || null;
      // 结束时间戳 延后24小时
      const endTime = startTime && (startTime + 86400000) || null;
      // 计时器
      const timer = setInterval(() => {
        const nowTime = Date.parse(new Date()); // 当前时间时间戳 
        // console.log(endTime - nowTime, 'timeDiffer时间差');

        const remainTime =
          endTime - nowTime >= 0 ? (endTime - nowTime) / 1000 : 0; // 距离到期所剩时间(转成秒)

        const waitPay = {
          timer,
          remainTime
        };
        awaitPay.set(id, waitPay);
        countTime(remainTime, id);
      }, 1000);
    };

    // 超时24h的订单改为已取消
    const countTime = async (remainTime, id) => {
      // 获取当前订单
      const currentOrder = awaitPay.get(id);
      if (remainTime <= 0) {
        clearInterval(currentOrder.timer);
        // 到期清除对应的订单时间戳
        state.countDown[id] = null;
        /**超时接口处理 */
        await getQueryList()
      } else {
        currentOrder.remainTime--;
        const min = Math.floor(currentOrder.remainTime % 3600);
        const time =
          formatBit(Math.floor(currentOrder.remainTime / 3600)) +
          ':' +
          formatBit(Math.floor(min / 60)) +
          ':' +
          formatBit(currentOrder.remainTime % 60);
        state.countDown[id] = time;
      }
    };


    //重置
    const onReset = async () => {
      searchFormRef.value.resetFields();
      await $router.push({
        path: $route.path
      })
      state.searchForm = {
        mealName: null, //套餐名称
        orderNo: null, //订单编号
        timeList: null,  // 时间
        pageNum: 1, //分页页码
        pageSize: 50, //分页大小
        payEnd: null, //支付结束时间
        payStart: null, //支付开始时间
      };
      state.totalPage = 0;
      state.totalSize = 0;
      await getQueryList();
    };

    //查询
    const onSearch = async () => {
      await $router.push({
        path: $route.path,
        query: state.searchForm
      })
      await getQueryList();
    };
    // 表格显示条数改变事件
    const handleSizeChange = (pageSize) => {
      state.searchForm.pageSize = pageSize;
      handleCurrentChange(1)
    };
    // 页数改变事件
    const handleCurrentChange = async (page) => {
      state.searchForm.pageNum = page;
      await $router.push({
        path: $route.path,
        query: state.searchForm
      })
      await getQueryList();
    };
    //批量删除
    const batchDelete = async () => {
      if (!state.orderNoSet || !state.orderNoSet.length) {
        message.error("请先选择删除的数据");
      } else {
        deleteRef.value.onOpen(state.orderNoSet)
      }
    };

    const updateTable = async () => {
      await getQueryList();
    }
    //多选
    const handleSelectionChange = (val) => {
      state.orderNoSet = [];
      // console.log(val,'val');
      if (val) {
        val.forEach(elem => {
          state.orderNoSet.push(elem.orderNo)
        })
      }
    };

    //支付
    const onPay = (row) => {
      console.log("支付");
      payRef.value.onOpen(row)
    };
    const createCode = (code) => {
      console.log('创建二维码', code);
      codeRef.value.onOpen(code)
    };


    return {
      ...toRefs(state),
      onReset,
      onSearch,
      batchDelete,
      handleSizeChange,
      handleSelectionChange,
      handleCurrentChange,
      onPay,
      countTime,
      deadLine,
      getQueryList,
      payTypeMap,
      orderTypeMap,
      stateMap,
      dateFormat,
      deleteRef,
      searchFormRef,
      payRef,
      codeRef,
      createCode,
      updateTable
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
