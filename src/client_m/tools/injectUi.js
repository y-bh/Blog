/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 按需注入element-plus
 * @Date: 2022-04-26 14:41:46
 * @LastEditTime: 2022-04-26 14:41:47
 */

import {
  ElTable,ElButton,ElLoading,ElTableColumn, ElProgress 
} from "element-plus";


const components = [
  ElTableColumn,
  ElTable,
  ElButton,
  ElProgress 
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