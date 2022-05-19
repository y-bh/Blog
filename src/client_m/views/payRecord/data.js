/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: page description
 * @Date: 2022-05-13 16:38:21
 * @LastEditTime: 2022-05-13 17:05:03
 */
export const PAY_TYPE_MAP = new Map() //支付方式
PAY_TYPE_MAP.set(1, '支付宝')
PAY_TYPE_MAP.set(2, '微信')
PAY_TYPE_MAP.set(4, '余额支付')
PAY_TYPE_MAP.set(5, '线下支付')
PAY_TYPE_MAP.set(6, '线下支付宝')
PAY_TYPE_MAP.set(7, '线下微信')
PAY_TYPE_MAP.set(8, '线下对公')

export const ORDER_TYPE_MAP = new Map() //订单类型
ORDER_TYPE_MAP.set(1, '购买')
ORDER_TYPE_MAP.set(2, '续费')
ORDER_TYPE_MAP.set(3, '退款')
ORDER_TYPE_MAP.set(4, '充值')
ORDER_TYPE_MAP.set(5, '补偿')
ORDER_TYPE_MAP.set(6, '赠送')

export const STATE_MAP = new Map()  //订单状态
STATE_MAP.set(1, '待支付')
STATE_MAP.set(2, '已支付')
STATE_MAP.set(3, '已取消')
STATE_MAP.set(4, '退款中')
STATE_MAP.set(5, '退款成功')
STATE_MAP.set(6, '退款失败')