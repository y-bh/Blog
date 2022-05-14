/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 日期格式化
 * @Date: 2022-05-14 15:22:03
 * @LastEditTime: 2022-05-14 15:29:43
 */
export const dateFormat = (date, fmt = 'YYYY-mm-dd HH:MM:SS') => {
  let ret
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }
    return fmt
}