/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-16 21:29:43
 * @LastEditTime: 2022-05-23 10:12:46
 */
const { getProxyCityDao,getProxyMenuDao,getWhiteListApiDao } = require("dao/getIp")

let codeDemo = [
  {
    title: 'Python语言'
  },
  {
    title: 'GO语言'
  },
  {
    title: 'C#语言'
  },
  {
    title: 'JavaScript语言'
  },
  {
    title: 'Java语言'
  },
  {
    title: 'Kotlin语言'
  },
  {
    title: 'Php语言'
  },
  {
    title: '易语言'
  },
  {
    title: 'C语言'
  },
  {
    title: 'Phantomjs语言'
  },
  {
    title: 'Selenium语言'
  },
  {
    title: 'Node语言'
  },
]

let paidList = []

let mealBox = [
  {
    desc: '3分钟的IP',
    num: '40,000',
  },
  {
    desc: '5分钟的IP',
    num: '20,000',
  },
  {
    desc: '10分钟的IP',
    num: '11,111',
  },
  {
    desc: '15分钟的IP',
    num: '6,666',
  },
  {
    desc: '1~5分钟的IP',
    num: '40,000',
  },
  {
  desc: '5~25分钟的IP',
    num: '20,000',
  },
  {
    desc: '25分钟~3小时的IP',
    num: '20,000',
  },
  {
    desc: '3~6小时的IP',
    num: '11,111',
  },
  {
    desc: '6~12小时的IP',
    num: '6,666',
  },
  {
    desc: '12~24小时的IP',
    num: '40,000',
  },
]

let ipUse = [
  {
    id: 1,
    time: '3分钟',
    deal: '5天启币/IP',
    val: 3
  },
  {
    id: 2,
    time: '5分钟',
    deal: '10天启币/IP',
    val: 5
  },
  {
    id: 3,
    time: '10分钟',
    deal: '18天启币/IP',
    val: 10
  },
  {
    id: 4,
    time: '15分钟',
    deal: '30天启币/IP',
    val: 15
  },
]

let chooseType = [
  {
    status: false,
    label: '城市'
  },
  {
    status: false,
    label: '运营商'
  },
  {
    status: false,
    label: '到期时间'
  }
]

let separator = [
  {
    label: '回车换行(\\r\\n)'
  },
  {
    label: '回车(\\r)'
  },
  {
    label: '换行(\\n)'
  },
]

let province = []

let paramsDesc = [
  {
    label: 'secret:提取秘钥'
  },
  {
    label: 'num(可选):提取IP数量,不能超过200,默认值10'
  },
  {
    label: 'yys(可选):提取IP运营商,电信、移动、联通'
  },
  {
    label: 'type(可选):返回类型,txt,json'
  },
  {
    label: 'lb(可选):txt格式返回的分隔符'
  },
  {
    label: 'region(可选):区域编号,多个用英文逗号分隔'
  },
  {
    label: 'port:IP协议  1:HTTP 2:SOCKS5  3:HTTPS'
  },
  {
    label: 'time(按次提取必选):IP使用时长只支持(3,5,10,15)'
  },
  {
    label: 'ts(可选):是否显示IP过期时间, 1:显示   默认不显示'
  },
  {
    label: 'ys(可选):是否显示IP运营商,1:显示  默认不显示'
  },
  {
    label: 'cs(可选):是否显示位置,1:显示  默认不显示'
  },
]

let extractDesc = [
  {
    label: 'URL'
  },
  {
    label: '方法'
  },
  {
    label: '编码方式'
  },
  {
    label: '参数说明'
  },
  {
    label: '异常'
  },
  {
    label: '成功'
  },
  {
    label: '状态码'
  }
]

let whiteDesc = [
{
    label: '添加白名单接口'
  },
  {
    label: '删除白名单接口'
  },
  {
    label: '查询白名单接口'
  },
  {
    label: '方法'
  },
  {
    label: '编码方式'
  },
  {
    label: '参数说明'
  },
  {
    label: '异常'
  },
  {
    label: '成功'
  },
  {
    label: '状态码'
  }
]

let whiteParamsDesc = [
  {
    label: 'Key: 用户账号'
  },
  {
    label: 'Sign: 密钥签名'
  },
  {
    label: "需要添加或删除的ip地址,多个使用','分割"
  },
  {
    label: '固定参数,固定取值2'
  }
]

let errorCodeContent = {
  left_desc: [
    {
      label: '提取接口错误码'
    },
    {
      label: '白名单接口错误码'
    },
    {
      label: '代理使用错误码'
    }
  ],
  extractError: [
    {
      label: '1001: 请求格式不正确'
    },
    {
      label: '1002: 单次请求数量超出最大值'
    },
    {
      label: '1003: 请求KEY异常'
    },
    {
      label: '1004: 套餐已过期'
    },
    {
      label: '1005: 套餐提取数量上限'
    },
    {
      label: '1006: 暂无可用IP'
    },
    {
      label: '1007: 提取地区超出服务范围'
    }
  ],
  whiteError: [
  {
      label: '1001: 参数有误'
    },
    {
      label: '1002: ip地址格式无效'
    },
    {
      label: '1003: key无效'
    },
    {
      label: '1004: 参数sign错误'
    },
    {
      label: '1005: 不是代理用户'
    },
    {
      label: '1006: 添加的新ip数量超过最大数量限制'
    },
    {
      label: '1007: ip已存在'
    },
    {
      label: '1008: ip地址不在服务范围'
    },
    {
      label: '1009: 白名单中不存在指定的ip可以删除'
    },
    {
      label: '1101: 服务器内部错误'
    }
  ],
  proxyError: [
    {
      label: '407: 白名单IP校验失败'
    },
    {
      label: '430: 客户端IP非国内'
    },
    {
      label: '431: 代理认证口令为空'
    },
    {
      label: '432: 账号密码错误'
    },
    {
      label: '434: 代理节点异常'
    },
    {
      label: '435: 代理IP状态异常'
    },
    {
      label: '436: 代理IP未经授权或已超出使用时长'
    },
    {
      label: '451: IP未提取或已过期'
    },
    {
      label: '452: 套餐信息异常'
    },
    {
      label: '453: IP提取记录不存在'
    },
    {
      label: '454: 套餐不存在'
    },
    {
      label: '455: 用户信息异常'
    },
    {
      label: '456: 未实名'
    },
  ]
}

//获取提取套餐城市列表
const getProxyCityService = async () => {
  try {
    const res = await getProxyCityDao()
    if (+res.code === 200) {
      province = res.data
    }else{
      return []
    }
    return province
  } catch (error) {
    console.error("getProxyCity_service:",error);
  }
}

//获取提取套餐下拉列表
const getProxyMenuService = async () => {
  try {
    const res = await getProxyMenuDao()
    if (res && res.code === 200) {
      paidList = res.data
    }else{
      return []
    }
    return paidList
  } catch (error) {
    console.error('getProxyMenu_service:',error);
  }
}


/**
 * @Date: 2022-05-23 09:48:01
 * @LastEditTime: LiYuntao
 * @description: 白名单接口
 * @return {*}
 */
const getWhiteListApiService = async (params = null) => {
  try {
    const res = await getWhiteListApiDao(params)
    console.log(res);
    if (res && res.code === 200) {
      let { whiteAdd = null, whiteDelete = null, whiteFetch = null } = res.data
      return {
        whiteAdd, whiteDelete, whiteFetch
      }
    }else{
      return {
        whiteAdd: '--',
        whiteDelete: '--',
        whiteFetch: '--',
      }
    }
  } catch (error) {
    console.error('getProxyMenu_service:',error);
  }
}

//静态数据
const data = () => {
  try {
    const staticData = {
      codeDemo,
      mealBox,
      ipUse,
      chooseType,
      separator,
      paramsDesc,
      extractDesc,
      whiteDesc,
      whiteParamsDesc,
      errorCodeContent,
    }
    return staticData
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  data,
  getProxyCityService,
  getProxyMenuService,
  getWhiteListApiService
}