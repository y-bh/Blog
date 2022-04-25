/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2021-07-20 09:43:58
 * @LastEditTime: 2021-07-28 14:04:21
 */
module.exports = {
  processors: [],
  plugins: ["stylelint-scss","stylelint-order"],
  extends: "stylelint-config-standard",
  rules: {
      "string-quotes":"single",//指定字符串使用单引号
      "number-no-trailing-zeros":true,//禁止数字中的拖尾 0
      "number-leading-zero":"always", //0前导
      "font-family-name-quotes":"always-where-recommended",
      "indentation":2,
      "at-rule-no-unknown": null,
      "scss/at-rule-no-unknown": true,
      "no-descending-specificity":null
  }
};

