<!--
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 变更记录
 * @Date: 2022-05-17 11:19:40
 * @LastEditTime: 2022-05-21 16:31:09
-->
<template>
  <el-dialog
    v-model="dialogVisible"
    destroy-on-close
    custom-class="customize_dialog dialog-alone dialog-table"
  >
    <DialogTitle title-content="变更记录" />
    <div class="dialog-body table-wrap">
      <el-table :data="tableData">
        <template v-slot:empty>
          <div>{{ emptyText }}</div>
        </template>
        <el-table-column
          align="center"
          label="套餐ID"
          prop="id"
          width="80"
          fixed
        >
          <template #default="{ row }">
            <div>
              <span>{{ row.id }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变更记录" prop="type">
          <template #default="{ row }">
            {{ row.type ? mealChangeType[row.type] : '--' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="原套餐" prop="old"></el-table-column>
        <el-table-column align="center" label="新套餐" prop="newProxy"></el-table-column>
        <el-table-column align="center" label="变更内容" prop="content"></el-table-column>
        <el-table-column align="center" label="操作人" prop="username"></el-table-column>
        <el-table-column align="center" label="操作时间" prop="createTime">
            <template #default="{row}">
                {{ row.createTime ? dateFormat(row.createTime * 1000) : '— —' }}
            </template>
            
        </el-table-column>
      </el-table>

      
    </div>
    <!-- 分页 -->
    <el-pagination
        v-model:currentPage="searchForm.page"
        class="text-right"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[20, 50, 100, 500]"
        :page-size="searchForm.size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </el-dialog>
</template>
<script>
import DialogTitle from "components/DialogTitle"
import { reactive, ref, toRefs, inject } from "vue"
import { formatInt } from "tools/utility"
import { dateFormat } from "tools/dateFormat"
import { getLogList } from "model/meal.js"
export default {
    components: { 
        DialogTitle
    },
    setup (){
        const global = inject('_global');
        const message = inject('message');
        const mealChangeType = Object.freeze(global.$mealChangeType);
        
        const state = reactive({
            dialogVisible: false,
            tableData: [],
            searchForm: {
               sequence: null,
               page: 1,
               size: 20 
            },
            total: 0,
            emptyText: '暂无数据'
        })
        const methods = {
            onOpen(row){
                if(row){
                    state.searchForm.sequence = row.sequence;
                    state.searchForm.page = 1;
                    state.searchForm.size = 20;
                    methods.getTableList = [];
                    state.dialogVisible = true
                }
            },
            async getTableList(){
                let res = await getLogList(state.searchForm);
                if(res && res.code === 200){
                    state.tableData = res.data && res.data.data || [];
                    state.total = res.data && res.data.totalSize || 0;
                }
            },
            // 表格显示条数改变事件
            handleSizeChange(pageSize){
                state.searchForm.size = pageSize;
                methods.handleCurrentChange(1)
            },
            // 页数改变事件
            async handleCurrentChange(page){
                state.searchForm.page = page;
                methods.getTableList();
            },
        }
        return {
            mealChangeType,
            ...toRefs(state),
            ...methods
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
