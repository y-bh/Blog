/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 正则管理文件
 * @Date: 2021-08-12 17:00:14
 * @LastEditTime: 2021-08-13 14:37:47
 */

// 手机号码，包含排除号段
export const minPHONE = /^1[3456789]\d{9}$/
// 手机号码，排除170、171、162、165、167号段
export const PHONE =
  /^1[34589]\d{9}$|^17[2-9]\d{8}$|^16[0-1]\d{8}$|^16[3-4]\d{8}$|^166\d{8}$|^16[8-9]\d{8}$/

// 邮箱
export const EMAIL =
  /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g

// QQ号码
export const QQ = /[1-9][0-9]{4,10}/

// 微信号码
export const WX = /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/

// 公司名称
export const COMPANY = /^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$/

// 身份证账号
export const IDCARD =
  /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 身份证账号，包含外国身份证
export const ID_CARD_PLUS =
  /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/

// 登录密码校验规则
export const PWD = /^.{6,20}$/

// 登录用户名校验规则
export const USERNAME = /^[\w@]{4,16}$/

// 验证码
export const CODE = /^[A-Za-z0-9]{6}$/

// vpn账号
export const VPNACCOUNT = /^[a-zA-Z0-9_!@#$%^&*.]{4,20}$/

// 整数
export const INT = /^[1-9][0-9]*$/
