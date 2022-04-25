/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: babel配置
 * @Date: 2022-03-14 15:25:13
 * @LastEditTime: 2022-03-14 16:19:22
 */
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/packages/theme-chalk/lib/${name}.css`;
        },
      },
    ],
  ],
};