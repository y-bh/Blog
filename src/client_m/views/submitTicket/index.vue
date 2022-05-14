<!--
 * @Author: 李云涛
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-13 12:56:11
 * @LastEditTime: 2022-05-14 16:41:19
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
      <el-input v-model="content" type="textarea" placeholder="请输入您遇到的问题或者改进意见" rows="18" resize="none" />
    </div>
    <div class="ticket-btn">
      <el-button class>提交</el-button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'

//func
import { submitTicketFunc } from "model/submitTicket"
export default {
  name:'',
  components:{},
  setup(){
    const state = reactive({
      content: null
    })


    /* submit ticket */
    async function submitTicket() {
      /**暂未完成 */
      const res = await submitTicketFunc()
    } 

    onMounted(()=>{
      /* 方法 */
      // submitTicket()
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss"
</style>