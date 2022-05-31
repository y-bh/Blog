<!--
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-30 15:34:53
 * @LastEditTime: 2022-05-31 20:39:21
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
          <div
            class="snd-btn pesonal-btn"
            v-if="
              !(userInfo.identityAuth || userInfo.intermediate || userInfo.companyAuth || userInfo.res === 'wait' || userInfo.res === 'cut')
            "
            @click="personAuth"
          >
            个人认证
          </div>
          <div
            class="snd-btn company-btn"
            v-if="
              !userInfo.companyAuth && !(userInfo.res === 'cut' || userInfo.res === 'wait')
            "
            @click="companyAuth"
          >
            企业认证(赠3000IP)
          </div>
        </div>
        <div class="dialog-close dialog-close-snd">
          <i class="iconfont icon-guanbi close-i" @click="close('s')"></i>
        </div>
      </div>
    </div>

    <div
      class="small-dia-bg"
      v-if="(!userInfo.gotWxWelfare || !userInfo.newUser) && e && l"
    >
      <div
        class="small-dia-img-n"
        @click="openTDialog"
        v-if="userInfo.newUser"
      ></div>
      <div
        class="small-dia-img-w"
        @click="openTDialog"
        v-if="!userInfo.gotWxWelfare && !userInfo.newUser"
      ></div>
      <div class="dialog-close-thd">
        <i class="iconfont icon-guanbi close-i" @click="close('l')"></i>
      </div>
    </div>

    <PersonalAuth ref="perAuthRef" @updateUserInfo="reload"></PersonalAuth>
    <!-- 企业认证 -->
    <companyAuth ref="companyAuthRef" @updateUserInfo="reload"></companyAuth>
  </div>
</template>

<script>
import { getMineInfo } from "model/user.js";
import { getDiaOneThousand } from "model/dia.js";

import { inject, onMounted, reactive, ref, toRefs, provide, } from "vue";
import { useStore } from "vuex";

import PersonalAuth from "../../views/userAccount/dialog/PersonalAuth";
import companyAuth from "../../views/userAccount/dialog/companyAuth";

export default {
  components: {
    PersonalAuth,
    companyAuth,
  },
  setup() {
    const $message = inject("message");
    const state = reactive({
      e: false,
      l: true,
      one: false,
      userInfo: {},
      companyStatus: "none",
    });

    
    provide("userInfoSon", state);

    const perAuthRef = ref(null);
    const companyAuthRef = ref(null);

    function openTDialog() {
      getMineInfoFunc(true);
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
      const res = await getDiaOneThousand();
      if (res && res.code === 200) {
        if (res.data === true) {
          state.userInfo.newUser = false;
          state.one = true;
          $message.success("领取成功");
        }
      } else {
        $message.error("领取失败");
        state.e = true;
      }
    }

    const getMineInfoFunc = async (e) => {
      const res = await getMineInfo();
      if (res && res.code === 200) {
        state.userInfo = res.data;
        if (!res.data.newUser) {
          state.e = true;
        }
      }else{
        state.e = true
      }

      if (e) {
        state.e = false;
        state.one = true;
      }
    };

    const personAuth = () => {
      //perAuthRef.value.title = "个人认证"
      state.e = true
      perAuthRef.value.authPersonStep = 1;
      perAuthRef.value.dialogVisible = true;
    };
    const companyAuth = () => {
      state.e = true
      companyAuthRef.value.title = "企业认证";
      if(state.userInfo.identityAuth || state.userInfo.intermediate){
        companyAuthRef.value.authCompanyStep = 3;
      }else{
        companyAuthRef.value.authCompanyStep = 1;
      }
      companyAuthRef.value.dialogVisible = true;
    };

    function reload() {
      location.reload();
    }

    onMounted(() => {
      getMineInfoFunc();
    });

    return {
      ...toRefs(state),
      close,
      openTDialog,
      jumpRegisteIp,
      perAuthRef,
      companyAuthRef,
      personAuth,
      companyAuth,
      reload,
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
      cursor: pointer;
    }

    .dialog-img-snd {
      width: 35%;
      height: 30vw;
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
        transform: translate(4%, 22vw);
        cursor: pointer;
      }
      .company-btn {
        transform: translate(4%, 23vw);
        cursor: pointer;
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
  cursor: pointer;

  .small-dia-img-n {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/newUserFuli.png");
    background-size: cover;
    transform: translate(15%, 65vh);

    animation: 0.5s cubic-bezier(0.5, 2, 0.4, 0.6) 0s 1 leftshow;
  }

  .small-dia-img-w {
    width: 100%;
    height: 84%;
    background-image: url("../../assets/images/wechatSmall.png");
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
      transform: translate(-110%, 65vh);
    }

    to {
      transform: translate(15%, 65vh);
    }
  }
}
</style>