/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2021-07-20 09:49:39
 * @LastEditTime: 2021-07-20 09:49:49
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 提交类型
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能（feature）
        'fix', // 修复 bug
        'style', // 不影响程序逻辑的代码修改、主要是样式方面的优化、修改
        'test', // 测试相关的开发
        'del', // 删除
        'perf' // 性能优化
      ]
    ],
    // 作用范围
    'scope-empty': [0],

    // commit标题
    'subject-empty': [2, 'never'],
    // 'subject-full-stop': [2,'always',';'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 50],
    'subject-min-length': [2, 'always', 4],

    // 描述
    // "body-empty":[2, 'never'],
    // "body-max-length":[2, 'always',100],
    // "body-min-length":[2, 'always',8],
    // "body-case":[2, 'always', 'lower-case'],
    // "body-full-stop":[2,'always',';'],

    'header-max-length': [0, 'always', 70]

  }
};

/** *****commit提交规则 ****/
// type:commit类型
// 1.提交类型必须填写
// 2.提交类型必须是小写 并且是 feat|fix|style|test|del|perf之一

// scope
// 1.scope 不需要写

// subject:标题
// 1.subject 必须填;如果是英文必须小写
// 2.标题最大20字符 最小4字符
// 3.必须以;结尾

// body: 描述信息
// 1.描述信息必须填
// 2.标题最大100字符 最小8字符
// 3. 必须以;结尾

// 备注: 如果是使用 git工具; 在type 和 subject之间要留个空白

// 示例:

/** **
 *
 *
   feat: 测试标题;
   body: 具体表面修改的内退;
 *
 *
 */
