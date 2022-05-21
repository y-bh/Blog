<!--
 * @Author: dengxiujie
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-04-27 17:47:07
 * @LastEditTime: 2022-05-20 17:38:15
-->
<template>
  <div
    class="gift-wrap"
    v-if=" giftList && (giftList.valid.length > 0 || giftList.invalid.length > 0)"
  >
    <div class="gift" v-for="item in giftList.valid" :key="item.id">
      <div class="gift-header">
        <div><span>￥</span>{{ item.money }}</div>
        <div>满{{ item.doorsill }}元可用</div>
      </div>
      <div class="gift-text">
        <div>{{ item.redPackageName }}</div>
        <div>
          有效期: {{ dateFormatGift(item.createTime * 1000) }}-{{
            dateFormatGift(item.endTime * 1000)
          }}
        </div>
      </div>
      <div class="gift-use" @click="useGift"><span>立即使用</span></div>
    </div>

    <div class="show-gift" @click="changeShowGift">隐藏过期/已用礼券</div>

    <div
      class="gift gift-used"
      v-show="showGift"
      v-for="item in giftList.invalid"
      :key="item.id"
    >
      <div class="gift-header">
        <div><span>￥</span>{{ item.money }}</div>
        <div>{{ item.doorsill }}</div>
      </div>
      <div class="gift-text">
        <div>{{ item.redPackageName }}</div>
        <div>
          有效期: {{ dateFormatGift(item.createTime * 1000) }}-{{
            dateFormatGift(item.endTime * 1000)
          }}
        </div>
      </div>
      <div class="gift-use">
        <span v-if="item.state === '1'">已禁用</span>
        <span v-else-if="item.state === '2'">已使用</span>
        <span v-else-if="item.state === '4'">已过期</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="mt-100">
      <div class="flex justify-content-center empty-box"></div>
      <p class="flex justify-content-center text-desc">暂无可用优惠券</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, inject } from "vue";

//func
import { getGiftFunc } from "model/gift.js";

//tools
import { dateFormatGift } from "tools/dateFormat";

export default {
  name: "",
  props: {},
  setup() {
    const $message = inject("message");

    const state = reactive({
      giftList: null,
      showGift: false,
    });

    /** change gift used show */
    function changeShowGift() {
      state.showGift = !state.showGift;
    }

    /**获取礼券 */
    async function getGift() {
      const res = await getGiftFunc();

      /**条件判断 */
      if (+res.code === 200) {
        state.giftList = res.data
      } else {
        $message.error(res.msg);
      }
    }

    /**use gift */
    function useGift() {
      window.location.pathname = "/package";
    }

    onMounted(() => {
      /**调用方法 */
      getGift();
    });

    return {
      //   ...refData,
      ...toRefs(state),
      changeShowGift, //隐藏显示礼券
      useGift, //use gift
      dateFormatGift, //date
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>