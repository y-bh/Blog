/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: ui组件库
 * @Date: 2021-07-16 18:39:27
 * @LastEditTime: 2022-03-14 16:23:27
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