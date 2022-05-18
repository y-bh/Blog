/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 常用工具函数封装
 * @Date: 2022-05-18 13:18:06
 * @LastEditTime: 2022-05-18 14:38:17
 */
export function isEmpty (v) {
    return v === undefined || v === null || v === "" || v === 'undefined' || v === 'null'
}

export function isInt (val) {
    let reg = /^-?\d+/;
    return reg.test(val);
}

export function isFloat (val) {
    let reg = /^(-?\d+)(\.\d+)?/; //非负浮点数
    return reg.test(val);
}
// 数据转为整型
export function formatInt (v, def = null) {
    if (isEmpty(v)) {
        return def;
    } else if (isInt(v)) {
        return parseInt(v);
    } else {
        return null;
    }
}
// 数据转换成浮点型
export function formatFloat (v, def = null) {
    if (isEmpty(v)) {
        return def;
    } else if (isFloat(v)) {
        return parseFloat(v);
    } else {
        return null;
    }
}
// 随机生成字符串函数  默认生成8位随机字符串
export function randomString (num = 8) {
    let number = formatInt(num) || 8;
    let str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
    let length = str.length;
    let randomStr = "";
    for (var i = 0; i < number; i++) randomStr += str.charAt(Math.floor(Math.random() * length));
    return randomStr
}

export function deepCopy (obj) {
    let a = '';
    let copy = function (obj) {
      let result = {}.toString.call(obj) === "[object Array]" ? [] : {};
      if (obj && typeof obj === 'object') {
        for (let key in obj) {
          if (obj[key] && typeof obj[key] === 'object') {
            result[key] = copy(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
          } else {
            result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
          }
        }
        return result;
      }
      return obj;
    };
    a = copy(obj)
    return a;
  }