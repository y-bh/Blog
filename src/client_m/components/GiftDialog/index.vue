<!--
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-30 15:34:53
 * @LastEditTime: 2022-05-30 16:22:24
-->
<template>
  <div class="dialog-wrap-p">
    <div class="dialog-bg">
      <div class="dialog-img">

      </div>
      <div class="dialog-close-fst">

      </div>
    </div>

    <div class="dialog-bg">
      <div class="dialog-img">
        <div class="pesonal-btn">

        </div>
        <div class="company-btn">

        </div>
      </div>
      <div class="dialog-close-snd">

      </div>
    </div>

    <div class="small-dia-bg">
      <div class="small-dia-img">

      </div>
      <div class="dialog-close-thd">

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  setup(){
    let e = ref(false)
    onMounted(()=>{
      e = true
    })
    return {
      e
    }

  }


}
</script>

<style lang="scss" scoped>
.dialog-wrap-p{
  position: absolute;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 100vh;

  .dialog-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba($color: #000000, $alpha: 0.3);;
  }
}
</style>