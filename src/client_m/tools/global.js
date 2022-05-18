/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 全局变量方法
 * @Date: 2022-05-16 14:51:42
 * @LastEditTime: 2022-05-18 09:58:13
 */
export default {
    // 套餐类型
    $mealType: {
        0: '包量',
        1: '包时',
        10: '计次',
        20: '福利',
        70: '不限量'
    },
    // 套餐变更类型
    $mealChangeType: {
        1: '合并套餐',
        2: '修改时效',
        3: '补量',
        4: '临时补量',
        5: '补偿',
        6: '续费'
    },
    // 套餐状态
    $mealState: {
        1: '正常',
        2: '禁用',
        3: '用完',
        4: '过期',
    },
    methods: {
        // 随机生成指定长度的字符串
        randomString (num) {
            let number = num || 8;
            let str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
            let length = str.length;
            let randomStr = "";
            for (var i = 0; i < number; i++) randomStr += str.charAt(Math.floor(Math.random() * length));
            return randomStr
        },
        // 校验是否为空
        isEmpty (value) {
            return value === undefined || value === null || value === ""
        },
        // 判断整数
        isInt (value) {
            let reg = /^-?\d+$/;
            return reg.test(value);
        },
        // 判断浮点数
        isFloat (value) {
            let reg = /^(-?\d+)(\.\d+)?$/; //非负浮点数
            return reg.test(value);
        },
        // 转成整数
        formatIntValue (value, def = null) {
            if (this.isEmpty(value)) {
                return def;
            } else if (this.isInt(value)) {
                return parseInt(value);
            } else {
                return null;
            }
        },
        // 转成浮点数
        formatFloatValue (value, def = null) {
            if (this.isEmpty(v)) {
                return def;
            } else if (this.isFloat(v)) {
                return parseFloat(v);
            } else {
                return null;
            }
        }
    }

}

