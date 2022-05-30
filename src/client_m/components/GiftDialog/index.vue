<!--
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-30 15:34:53
 * @LastEditTime: 2022-05-30 18:31:32
-->
<template>
  <div class="dialog-wrap-p">
    <div class="dialog-bg" v-if="userInfo.newUser">
      <div class="dialog-img dialog-img-fst" @click="jumpRegisteIp">
        
      </div>
      <div class="dialog-close dialog-close-fst">
        <i class="iconfont icon-guanbi close-i" @click="closeOne"></i>
      </div>
    </div>

    <div class="dialog-bg" v-if="!userInfo.newUser && !userInfo.gotWxWelfare">
      <div class="dialog-img  dialog-img-snd">
        <div class="snd-btn pesonal-btn">
          个人认证
        </div>
        <div class="snd-btn company-btn">
          企业认证
        </div>
      </div>
      <div class="dialog-close dialog-close-snd">
        <i class="iconfont icon-guanbi close-i" @click="closeOne"></i>
      </div>
    </div>

    <div class="small-dia-bg">
      <div class="small-dia-img">

      </div>
      <div class="dialog-close-thd">
        <i class="iconfont icon-guanbi close-i" @click="closeOne"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(){
    let e = ref(true)
    let $store = useStore()

    let userInfo = $store.state.userInfo

    function closeOne(a){
      console.log(a);
      console.log(e);
    }

    function jumpRegisteIp() {
      
    }

    onMounted(()=>{
      console.log(userInfo);
    })



    return {
      e,
      userInfo,
      closeOne,
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
    background-color: rgba($color: #000000, $alpha: 0.3);

    .dialog-img{
      width: 39%;
      height: 70%;
      background-repeat: no-repeat;
      background-size: cover;
      margin: 0 auto;
      transform: translateY(10%);
    }

    .dialog-img-fst{
      background-image: url("../../assets/images/newUser.png");
    }


    .dialog-img-snd{
      width: 35%;
      height: 61%;
      background-image: url("../../assets/images/wechatBig.png");
      transform: translate(-1%, 19%);

      .snd-btn{
        width: 260px;
        height: 50px;
        margin: 0 auto;
        background-image: url("../../assets/images/wechatBtn.png");
        background-repeat: no-repeat;
        background-size: cover;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        color: #000000;
      }

      .pesonal-btn{
        transform: translate(4%,44vh);
      }
      .company-btn{
        transform: translate(4%,47vh);
      }
    }
  }



  .small-dia-bg{
    width: 150px;
    height: 150px;
    position: fixed;
    
    .small-dia-img{
      width: 100%;
      height: 100%;
      background-image: url("../../assets/images/newUserFuli.png");
      background-size: cover;
      transform: translate(15%, 65vh);
    }

    .dialog-close-thd{
      text-align: center;
      transform: translate(15%, 65vh);
      .close-i{
        margin: 0 auto;
        color: rgba($color: #000000, $alpha: 0.4);
        font-size: 26px;
    
        &:hover{
          font-size: 30px;
        }
      }
    }
  }




  

  .dialog-close{
    text-align: center;
    .close-i{
      color: rgba($color: #ffffff, $alpha: 0.5);
      font-size: 26px;
  
      &:hover{
        font-size: 30px;
      }
    }
  }
  .dialog-close-fst{
    transform: translate(0, 8vh);
  }
  .dialog-close-snd{
    transform: translate(0, 13vh);
  }
}
</style>