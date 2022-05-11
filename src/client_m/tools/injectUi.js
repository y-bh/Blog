/*
 * @Author: 朱占伟
 * @LastEditors: 李云涛
 * @description: 按需注入element-plus
 * @Date: 2022-04-26 14:41:46
 * @LastEditTime: 2022-05-11 18:36:46
 */

import {
  ElTable,ElButton,ElLoading,ElTableColumn, ElProgress, ElMenu,ElSubmenu,ElMenuItem,ElMenuItemGroup,ElRow,ElCol, ElSwitch
} from "element-plus";


const components = [
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
  ElSwitch
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