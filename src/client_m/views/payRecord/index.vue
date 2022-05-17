<!--
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 购买记录
 * @Date: 2022-05-13 15:09:26
 * @LastEditTime: 2022-05-17 14:36:45
-->
<template>
  <div class="container grid">
    <div class="top">
      <el-form class="form flex flex-wrap">
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
        <el-button class="blue-btn" @click="onReset">重置</el-button>
        <el-button class="blue-btn" @click="onSearch">查询</el-button>
        <el-button class="blue-btn" @click="batchDelete">批量删除</el-button>
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
        <el-table-column type="selection" />
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
            <div class="flex-center flex-column">
              <span :class="{
                'order_red': row.state === 1 || row.state === 6,
                'order_green': row.state === 5,
                'order_yellow': row.state === 4
              }">
                {{ row.state ? stateMap.get(row.state) : '--' }}
              </span>
              <span v-show="row.state === 1" class="order_red">{{ countDown }}</span>
            </div>
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
          sortable
        >
          <template #default="{ row }">
            <div class="box flex-center flex-column">
              <span>{{ row.createTime ? dateFormat(new Date(row.createTime)) : '--' }}</span>
              <span>{{ row.payTime ? dateFormat(new Date(row.payTime)) : '--' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作" 
          align="center"
        >
          <template #default="{ row }">
            <el-button v-show="row.state === 1" @click="onPay" size="small" class="pay-btn">支付</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs ,onMounted,inject } from 'vue'
import { PAY_TYPE_MAP,ORDER_TYPE_MAP,STATE_MAP } from './data.js'
import { dateFormat } from 'tools/dateFormat.js'
import { getOrderList,batchDelOrder } from 'model/payRecord.js'
export default {
  setup() {
    const payTypeMap = ref(PAY_TYPE_MAP)
    const orderTypeMap = ref(ORDER_TYPE_MAP)
    const stateMap = ref(STATE_MAP)
    const message = inject('message')
    
    const state = reactive({
      searchForm: {
        mealName: '', //套餐名称
        orderNo: '',  //订单编号
        pageNum: 0,  //分页页码
        pageSize: 0, //分页大小
        payEnd: 0, //支付结束时间
        payStart: 0  //支付开始时间
      },
      timeList: [],
      tableData: [],
      countDown: null,
      totalPage: 0,
      totalSize: 0,
      orderNoSet: [], //批量删除订单编号
    })

    onMounted(async() => {
      // await getQueryList()
      countTime()
    })

    //获取列表数据
    const getQueryList = async () => {
      const res = await getOrderList(state.searchForm)
      if (+res.code === 200) {
        console.log('res:',res);
        state.tableData = res.data.data || []
        state.searchForm.pageNum = res.data.pageNum || 0
        state.searchForm.pageSize = res.data.pageSize || 0
        state.totalSize = res.data.totalSize || 0
        state.totalPage = res.data.totalPage || 0
      }
    }

    //重置
    const onReset = () => {
      state.searchForm = {
        mealName: '', //套餐名称
        orderNo: '',  //订单编号
        pageNum: 0,  //分页页码
        pageSize: 0, //分页大小
        payEnd: 0, //支付结束时间
        payStart: 0  //支付开始时间
      }
      totalPage = 0
      totalSize = 0
      state.timeList = []
    }

    //查询
    const onSearch = async () => {
      await getQueryList()
    }

    //批量删除
    const batchDelete = async () => {
      const params = {
        orderNoSet
      }
      const res = await batchDelOrder(params)
      if (+res.code === 200) {
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
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
      if (val) {
        state.orderNoSet = val
      }
    }

    //支付
    const onPay = () => {
      console.log('支付');
    }

    //每秒执行一次
    const countTime = (createTime,id) => {
      let countTime;
      createTime = 1652509642040; //测试倒计时用的时间，获取接口数据后请删除
      let deadline = createTime + 1000*60*60*24  //倒计时测试
      let timer = setInterval(() => {
        let now = Date.parse(new Date()) //当前时间时间戳
        countTime = deadline - now >= 0 ? deadline - now : 0  //判断是否到期
        let tem = {
          timer,
          countTime,
          id
        }
        getCountTime(tem)
      },1000)
    }

    //倒计时
    const getCountTime = (tem) => {
      if (countTime <= 0) {
        clearInterval(tem.timer)
        /**超时接口处理 */
      } else {
        tem.countTime--
        let hour,min,second;
        hour = Math.floor(tem.countTime / 1000 / 3600 % 24)
        min = Math.floor(tem.countTime / 1000 / 60 % 60)
        second = Math.floor(tem.countTime / 1000 % 60)
        state.countDown = hour+':'+min+':'+second
      }
    }

    return {
      ...toRefs(state),
      onReset,
      onSearch,
      batchDelete,
      changeTime,
      handleSelectionChange,
      onPay,
      countTime,
      getCountTime,
      getQueryList,
      payTypeMap,
      orderTypeMap,
      stateMap,
      dateFormat,
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    grid-template-rows: auto 1fr;
    grid-row-gap: 40px;
    .top {
      box-shadow: 0px 0px 20px rgba(208, 224, 255, 0.4);
      border-radius: 4px;
      padding: 40px;
    }
    .form > .el-form-item {
      margin-right: 50px;
    }
  }
  .order_red {
    color: #F8486F;
  }
  .order_green {
    color: #27ADC2;
  }
  .order_yellow {
    color: #FC7019;
  }
</style>