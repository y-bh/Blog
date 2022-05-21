<!--
 * @Author: 李云涛
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-05-13 12:56:11
 * @LastEditTime: 2022-05-19 15:31:31
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
      <el-button @click="submitTicket">提交</el-button>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, reactive, toRefs } from 'vue'

//func
import { submitTicketFunc } from "model/submitTicket"
export default {
  name:'',
  components:{},
  setup(){
    const $message = inject('message')

    const state = reactive({
      content: null
    })


    /* submit ticket */
    async function submitTicket() {
      let params = {
        brand: 2,
        content: state.content,
        platform: 30,
      }
      if(!params.content){
        $message.error('请输入内容')
        return 
      }
      /**暂未完成 */
      const res = await submitTicketFunc(params)

      if(+res.code === 200){
        $message.success('提交成功')
      } else {
        $message.error(res.message)
      }
    } 


    return {
      ...toRefs(state),
      submitTicket, //提交工单
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss"
</style>