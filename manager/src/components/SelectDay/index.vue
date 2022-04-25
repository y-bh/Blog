<!--
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 选择时长
 * @Date: 2021-07-26 19:59:21
 * @LastEditTime: 2021-07-27 14:17:19
-->
<template>
  <div class="flex justify-between tabs" :class="{[config.tabsClass] : config.tabsClass}">
    <ul class="flex tab-list">
      <li
        v-for="item in state.tabList"
        :key="item.name"
        class="tab pb-10"
        :class="{ 'tab-active': +item.value === state.active }"
        :style="{color:+item.value === state.active && config.activeColor || '','border-bottom-color':+item.value === state.active && config.activeBorderColor || ''}"
        @click="selectDay(item.value)"
      >
        <span @click="emitDay(item.value)">
          {{ item.name }}
        </span>

        <van-icon
          v-if="+item.value === state.active"
          :size="config.closeSize"
          name="cross"
          @click.stop="deleteDay(item.value)"
        />
      </li>
    </ul>
    <div class="tab-add" @click="addDay">
      <van-icon name="plus" :color="config.addIconColor" :size="config.addSize" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          addSize: '12px', // 右侧新增图标大小
          addIconColor: '#000', // 右侧新增图标颜色
          closeSize: '14px', // 删除图标大小
          activeColor: '#6153ff', // 选中后字体样式
          activeBorderColor: '#6153ff', // 选中底部横线颜色
          tabsClass: '' // tabs自定义类名
        };
      }
    }
  },
  setup(props, context) {
    const tabList = [
      {
        name: 'Day 1',
        value: 1
      }
    ];
    const active = 1;

    const state = reactive({
      tabList,
      active
    });
    // 增加天数
    const addDay = () => {
      const { length } = state.tabList;
      state.tabList.push({
        name: `Day ${length + 1}`,
        value: length + 1
      });
    };

    // 选中某一天
    const selectDay = (val) => {
      state.active = val;
    };

    // 触发某一天
    const emitDay = (val) => {
      context.emit('getDay', val);
    };

    // 删除某一天
    const deleteDay = (val) => {
      const length = state.tabList.length;
      if (length <= 1) {
        return;
      }

      const tem = [];
      for (var index = 1; index < length; index++) {
        tem.push({
          name: `Day ${index}`,
          value: index
        });
      }
      if (val >= length) {
        console.log('val值大约', val, tem.length);
        val = tem.length;
      }
      if (val <= 1) {
        console.log('val值<约', val, tem.length);
        val = 1;
      }
      selectDay(val);
      state.tabList = tem;
    };

    // 初始化操作
    emitDay(active);

    return {
      emitDay,
      deleteDay,
      selectDay,
      addDay,
      state
    };
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
.tabs {
  padding: 10px 10px 0 10px;
  background: #fff;
  color: #666;
  font-size: 12px;

  .tab:first-of-type {
    margin-left: 0;
  }

  .tab-list {
    width: calc(100% - 12px);
    overflow-y: auto;
  }

  .tab {
    margin-left: 14px;
  }

  .tab-add {
    width: 12px;
    margin-left: 8px;
  }

  .tab-active {
    font-weight: bold;
    border-bottom: 1px solid #6153ff;
  }
}
</style>
