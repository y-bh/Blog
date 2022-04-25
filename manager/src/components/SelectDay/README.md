<!--
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 日期选中器使用简介
 * @Date: 2021-07-26 13:14:28
 * @LastEditTime: 2021-07-27 14:18:23
-->

## 对外暴露 getDay 接口,用于用户获取选中的值
## 例如:
<SelectDay @getDay="getDay" />

 ## 对外暴露 config 对象；用于对组件简单配置；【可选】
 config 对象属性有: 
{
          addSize: '12px', // 右侧新增图标大小
          addIconColor: '#000', // 右侧新增图标颜色
          closeSize: '14px', // 删除图标大小
          activeColor: '#6153ff', // 选中后字体样式
          activeBorderColor: '#6153ff', // 选中底部横线颜色
          tabsClass: '' // tabs自定义类名
 }

 

