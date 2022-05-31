<!--
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-30 15:34:53
 * @LastEditTime: 2022-05-31 14:27:45
-->
<template>
  <div style="position: absolute; top: 0">
    <div class="dialog-wrap-p" v-if="!e">
      <div
        class="dialog-bg"
        v-if="userInfo.newUser && !e"
        :key="userInfo.newUser"
      >
        <div class="dialog-img dialog-img-fst" @click="jumpRegisteIp"></div>
        <div class="dialog-close dialog-close-fst">
          <i class="iconfont icon-guanbi close-i" @click="close('o')"></i>
        </div>
      </div>

      <div class="dialog-bg" v-if="!e && one">
        <div class="dialog-img dialog-img-snd">
          <div class="snd-btn pesonal-btn" v-if="!userInfo.identityAuth">个人认证</div>
          <div class="snd-btn company-btn" v-if="!userInfo.companyAuth && (userInfo.res === 'cut' || userInfo.res === 'none' || userInfo.res === 'fail' )" >企业认证(赠3000IP)</div>
        </div>
        <div class="dialog-close dialog-close-snd">
          <i class="iconfont icon-guanbi close-i" @click="close('s')"></i>
        </div>
      </div>
    </div>

    <div
      class="small-dia-bg"
      v-if="!userInfo.gotWxWelfare && e && l"
    >
      <div class="small-dia-img" @click="openTDialog"></div>
      <div class="dialog-close-thd">
        <i class="iconfont icon-guanbi close-i" @click="close('l')"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getMineInfo } from "model/user.js";
import { getDiaOneThousand } from "model/dia.js"

import { inject, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const $message = inject('message')
    let $store = useStore();
    const state = reactive({
      e: false,
      l: true,
      one: false,
      userInfo: {},
      companyStatus: 'none',
    });

    function openTDialog() {
      getMineInfoFunc(true)
    }

    function close(a) {
      switch (a) {
        case "o":
          closeOne();
          break;
        case "s":
          closeTwo();
          break;
        case "l":
          closeThr();
          break;
      }
    }

    function closeOne() {
      state.e = true;
    }
    function closeTwo() {
      state.e = true;
    }
    function closeThr() {
      state.l = false;
    }

    async function jumpRegisteIp() {
      const res = await getDiaOneThousand()
      if(res && res.code === 200){
        if(res.data === true){
          state.userInfo.newUser = false
          state.one = true
          $message.success("领取成功");
        }
      }
    }

    const getMineInfoFunc = async (e) => {
      const res = await getMineInfo();
      if (res && res.code === 200) {
        state.userInfo = res.data;
        $store.dispatch("saveUserinfo", res.data);
        if(!res.data.newUser){
          state.e = true
        }
      }
      
      if(e){
        state.userInfo.newUser = false
        state.e = false
        state.one = true
      }
      console.log(state.userInfo, "userInfo");
    };

    onMounted(() => {
      getMineInfoFunc();
    });

    return {
      ...toRefs(state),
      close,
      openTDialog,
      jumpRegisteIp,
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog-wrap-p {
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100vw;
  height: 100vh;

  pointer-events: auto;

  .dialog-bg {
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);

    .dialog-img {
      width: 39%;
      height: 34vw;
      background-repeat: no-repeat;
      background-size: cover;
      margin: 0 auto;
      transform: translateY(10%);
    }

    .dialog-img-fst {
      background-image: url("../../assets/images/newUser.png");
    }

    .dialog-img-snd {
      width: 35%;
      height: 61%;
      background-image: url("../../assets/images/wechatBig.png");
      transform: translate(-1%, 19%);

      .snd-btn {
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

      .pesonal-btn {
        transform: translate(4%, 44vh);
      }
      .company-btn {
        transform: translate(4%, 47vh);
      }
    }
  }

  .dialog-close {
    text-align: center;
    .close-i {
      color: rgba($color: #ffffff, $alpha: 0.5);
      font-size: 26px;

      &:hover {
        font-size: 30px;
      }
    }
  }
  .dialog-close-fst {
    transform: translate(0, 8vh);
  }
  .dialog-close-snd {
    transform: translate(0, 13vh);
  }

}

.small-dia-bg {
  width: 150px;
  height: 150px;
  position: fixed;
  z-index: 1000;

  .small-dia-img {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/newUserFuli.png");
    background-size: cover;
    transform: translate(15%, 65vh);

    animation: 0.5s cubic-bezier(0.5, 2, 0.4, 0.6) 0s 1 leftshow;
  }

  .dialog-close-thd {
    text-align: center;
    transform: translate(15%, 65vh);
    .close-i {
      margin: 0 auto;
      color: rgba($color: #000000, $alpha: 0.4);
      font-size: 26px;

      &:hover {
        font-size: 30px;
      }
    }

    animation: 0.5s cubic-bezier(0.5, 2, 0.4, 0.6) 0s 1 leftshow;
  }


  
  @keyframes leftshow {
    from {
      transform: translate(-110%, 65vh);;
    }

    to {
      transform: translate(15%, 65vh);;
    }
  }
}
</style>