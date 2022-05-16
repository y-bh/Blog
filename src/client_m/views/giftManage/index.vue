<!--
 * @Author: dengxiujie
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-04-27 17:47:07
 * @LastEditTime: 2022-05-16 10:45:29
-->
<template>
  <div class="gift-wrap">
    <div class="gift">
      <div class="gift-header">
        <div>
          <span>￥</span>1000
        </div>
        <div>
          满20000元可用
        </div>
      </div>
      <div class="gift-text">
        <div>
          天启HTTP元旦红包
        </div>
        <div>
          有效期: 2021/09/23-2021/12/22
        </div>
      </div>
      <div class="gift-use">
        立即使用
      </div>
    </div>

    <div class="show-gift" @click="changeShowGift">
      隐藏过期/已用礼券
    </div>

    <div class="gift gift-used" v-show="showGift">
      <div class="gift-header">
        <div>
          <span>￥</span>1000
        </div>
        <div>
          满20000元可用
        </div>
      </div>
      <div class="gift-text">
        <div>
          天启HTTP元旦红包
        </div>
        <div>
          有效期: 2021/09/23-2021/12/22
        </div>
      </div>
      <div class="gift-use">
        立即使用
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs,onMounted} from 'vue'

//func
import { getGiftFunc } from "model/gift.js"

export default {
  name: '',
  props:{
  },
  setup() {
    const state = reactive({
      showGift: true
    })

    /** change gift used show */
    function changeShowGift() {
      state.showGift = !state.showGift
    }

    /**获取礼券 */
    async function getGift() {
      const res = await getGiftFunc()

      /**条件判断 */
    }

    onMounted(()=>{

      /**调用方法 */
      getGift()
    })
    
    return {
     //   ...refData,
     ...toRefs(state),
     changeShowGift, //隐藏显示礼券
    }
  }
  };
</script>
<style lang="scss" scoped>
@import "./index.scss"
</style>