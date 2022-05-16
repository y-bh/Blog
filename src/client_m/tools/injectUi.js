/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 按需注入element-plus
 * @Date: 2022-04-26 14:41:46
 * @LastEditTime: 2022-05-16 18:11:32
 */

import {
  ElDialog,ElTable,ElButton,ElLoading,ElTableColumn, ElProgress, ElMenu,ElSubmenu,ElMenuItem,ElMenuItemGroup,ElRow,ElCol, ElSwitch,
  ElForm, ElFormItem,ElInput,ElDatePicker,ElMessage, ElSelect, ElOption, ElDropdown, ElDropdownMenu, ElDropdownItem
} from "element-plus";


const components = [
  ElDialog,
  ElTableColumn,
  ElTable,
  ElButton,
  ElProgress,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRow,
  ElCol,
  ElSwitch,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElSelect, 
  ElOption,
  ElDropdown, 
  ElDropdownMenu, 
  ElDropdownItem
]
const plugins = [
  ElMessage,
  ElLoading,
]
const installElement = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
    
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
  app.provide('message', ElMessage);
}

export default installElement