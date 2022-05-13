/*
 * @Author: 朱占伟
 * @LastEditors: 陈昊天
 * @description: 按需注入element-plus
 * @Date: 2022-04-26 14:41:46
 * @LastEditTime: 2022-05-13 15:41:08
 */

import {
  ElDialog,ElTable,ElButton,ElLoading,ElTableColumn, ElProgress, ElMenu,ElSubmenu,ElMenuItem,ElMenuItemGroup,ElRow,ElCol, ElSwitch,
  ElForm, ElFormItem,ElInput,ElDatePicker,
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
]
const plugins = [
  ElLoading,
]
const installElement = (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
    
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export default installElement