<!--
 * @Author: 李云涛
 * @LastEditors: 李云涛
 * @description: page description
 * @Date: 2022-05-13 12:56:11
 * @LastEditTime: 2022-05-13 13:21:12
-->
<template>
  <div class="ticket-wrap">
    <div class="ticket-title">
      意见反馈
    </div>
    <div class="ticket-desc">
      欢迎使用天启HTTP，请详细描述您遇到的问题或者改进意见（如网络异常、验证失败、增添线路等），我们会及时跟进处理，期待您的反馈！
    </div>
    <div class="ticket-input">
      <el-input v-model="textarea" type="textarea" placeholder="请输入您遇到的问题或者改进意见" rows="18" resize="none" />
    </div>
    <div class="ticket-btn">
      <el-button class>提交</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name:'',
  components:{},
  setup(){
    const state = reactive({
      textarea: null
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket-wrap{
  padding: 40px;
  font-size: 16px;

  .ticket-title{
    color: #4C5664;
  }

  .ticket-desc{
    margin-top: 30px;
    margin-bottom: 20px;
    color: #1968FC;
  }

  .ticket-input{
    .el-textarea{
      testarea{
        resize: none;
      }
    }
  }

  .ticket-btn{
    margin-top: 40px;
    text-align: center;

    .el-button{
      width: 200px;
      background-color: #1968FC;
      color: #FFFFFF;
    }
  }
}
</style>