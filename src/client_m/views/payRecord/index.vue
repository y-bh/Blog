<!--
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 购买记录
 * @Date: 2022-05-13 15:09:26
 * @LastEditTime: 2022-05-13 17:11:26
-->
<template>
  <div class="container grid">
    <div class="top">
      <el-form inline>
        <el-form-item label="订单编号">
          <el-input placeholder="请输入订单编号" v-model="searchForm.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="使用时间">
          <el-date-picker
            v-model="timeList"
            type="daterange"
            value-format="YYYY-MM-DD"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="changeTime"
          />
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input placeholder="请输入套餐名称" v-model="searchForm.mealName"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn flex justify-end">
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onSearch">查询</el-button>
        <el-button @click="batchDelete">批量删除</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        :data="tableData"
        :header-cell-style="{
          height: '80px',
          background: '#F2F7FE',
          color: '#333333',
          fontSize: '14px',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column 
          prop="orderNo" 
          label="订单编号" 
          align="center"
        >

        </el-table-column>
        <el-table-column 
          prop="orderType" 
          label="订单类型" 
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.state ? orderTypeMap.get(row.orderType) : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          prop="mealName" 
          label="套餐名称" 
          align="center"
        >

        </el-table-column>
        <el-table-column 
          label="订单状态" 
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.state ? stateMap.get(row.state) : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          prop="payType" 
          label="支付方式" 
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.state ? payTypeMap.get(row.payType) : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column 
          prop="price" 
          label="支付金额" 
          align="center"
        >

        </el-table-column>
        <el-table-column 
          label="交易前后余额(币)" 
          align="center"
        >
          <template #default="{ row }">
            <div class="box flex-center flex-column">
              <span>{{ row?.preAmount??'--' }}</span>
              <span>{{ row?.curAmount??'--' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column 
          label="创建|支付时间" 
          align="center"
        >
          <template #default="{ row }">
            <div class="box flex-center flex-column">
              <span>{{ row?.preAmount??'--' }}</span>
              <span>{{ row?.payTime??'--' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作" 
          align="center"
        >
          <el-button @click="onPay">支付</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { PAY_TYPE_MAP,ORDER_TYPE_MAP,STATE_MAP } from './data.js'
export default {
  setup() {
    const payTypeMap = ref(PAY_TYPE_MAP)
    const orderTypeMap = ref(ORDER_TYPE_MAP)
    const stateMap = ref(STATE_MAP)
    
    const state = reactive({
      searchForm: {
        mealName: '', //套餐名称
        orderNo: '',  //订单编号
        pageNum: null,  //分页页码
        pageSize: null, //分页大小
        payEnd: null, //支付结束时间
        payStart: null  //支付开始时间
      },
      timeList: [],
      tableData: [],
    })

    //重置
    const onReset = () => {
      console.log('重置');
    }

    //查询
    const onSearch = () => {
      console.log('查询');
    }

    //批量删除
    const batchDelete = () => {
      console.log('批量删除');
    }

    //更改时间
    const changeTime = (val) => {
      if (val) {
        state.searchForm.pageNum = 1
        state.searchForm.payStart = val[0]
        state.searchForm.payEnd = val[1]
      }
    }

    //多选
    const handleSelectionChange = (val) => {
      console.log('val:',val);
    }

    //支付
    const onPay = () => {
      console.log('支付');
    }

    return {
      ...toRefs(state),
      onReset,
      onSearch,
      batchDelete,
      changeTime,
      handleSelectionChange,
      onPay,
      payTypeMap,
      orderTypeMap,
      stateMap
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    grid-template-rows: 190px 1fr;
    grid-row-gap: 40px;
  }
  .top {
    box-shadow: 0px 0px 20px rgba(208, 224, 255, 0.4);
    border-radius: 4px;
    padding: 40px;
  }
</style>