/*
 * @Author: 朱占伟
 * @LastEditors: dengxiujie
 * @description: 按需注入element-plus
 * @Date: 2022-04-26 14:41:46
 * @LastEditTime: 2022-05-06 16:48:32
 */

import {
  ElTable,ElButton,ElLoading,ElTableColumn, ElProgress, ElMenu,ElSubmenu,ElMenuItem,ElMenuItemGroup,ElRow,ElCol
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
  ElCol
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