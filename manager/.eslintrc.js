/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2021-07-16 17:16:43
 * @LastEditTime: 2021-07-30 17:33:12
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/recommended', 'eslint:recommended'],

  rules: {
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/no-multiple-template-root':'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/no-v-model-argument': 'off',
    'indent': [2, 2, {
      'SwitchCase': 1
    }]
  }
};
