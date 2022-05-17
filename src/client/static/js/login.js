/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 登录/注册/重置页功能
 * @Date: 2022-05-17 15:29:16
 * @LastEditTime: 2022-05-17 18:12:53
 */


// 获取相关参数
function getParams(type = 'login') {
  //1. 获取表单
  const form = document.forms['login']

  //2. 公共的参数
  let obj = {
    phone: form.phone.value.trim() || '', //电话号码
    pwd: form.pwd.value.trim() || ''  // 密码
  }
  //3. 独有的参数
  //注册用户参数
  if (type === 'register') {
    obj = Object.assign({}, obj, {
      code: form.code.value.trim(),
      userName: form.userName.value.trim(),
      agreeMent: form.agreeMent.value
    })
  }
  //重置密码参数
  if (type === 'reset') {
    obj = Object.assign({}, obj, {
      code: form.code.value.trim(),
      cpwd: form.cpwd.value.trim()

    })
  }
  return obj
}


//校验相关参数
const rules = {
  phone: /^1[34589]\d{9}$|^17[2-9]\d{8}$|^16[0-1]\d{8}$|^16[3-4]\d{8}$|^166\d{8}$|^16[8-9]\d{8}$/,
  pwd: /[a-zA-Z0-9@#$%^&*_]{6,20}$/,
  userName: /[0-9a-zA-Z_@]{6,16}/,
  code: /\d{6}/
}
function checkForm(params = null, type = 'login') {
  if (!params) {
    return console.error('请传入待校验参数!')
  }

  const res = {
    isPass: true,
    msg: ''
  }

  //校验手机号/账户
  if (type === 'login') {
    if (!params.phone) {
      res.isPass = false
      res.msg = '请输入账号!'
      return res
    }

    if (!rules.phone.test(params.phone) || !rules.userName.test(params.phone)) {
      res.isPass = false
      res.msg = '请输入用户名或手机号!'
      return res
    }

    if (!params.pwd) {
      res.isPass = false
      res.msg = '请输入密码!'
      return res
    }

    if (!rules.pwd.test(params.pwd)) {
      res.isPass = false
      res.msg = '请输入正确的密码格式![至少六位字符串]'
      return res
    }
  } else {
    if (!params.phone) {
      res.isPass = false
      res.msg = '请输入手机号码!'
      return res
    }

    if (!rules.phone.test(params.phone)) {
      res.isPass = false
      res.msg = '请输入正确格式的手机号码!'
      return res
    }

    if (!params.code) {
      res.isPass = false
      res.msg = '请输入验证码!'
      return res
    }

    if (!rules.code.test(params.code)) {
      res.isPass = false
      res.msg = '请输入六位数字的验证码!'
      return res
    }
  }





  if (type === 'reset') {
    if (!params.pwd) {
      res.isPass = false
      res.msg = '请设置登录密码!'
      return res
    }

    if (!rules.pwd.test(params.pwd)) {
      res.isPass = false
      res.msg = '请设置正确格式的登录密码![至少六位字符串]'
      return res
    }

    if (!params.cpwd) {
      res.isPass = false
      res.msg = '请确认登录密码!'
      return res
    }
    if (rules.pwd !== params.cpwd) {
      res.isPass = false
      res.msg = '登录密码与确认密码不一致!'
      return res
    }

  }


  if (type === 'register') {
    if (!params.userName) {
      res.isPass = false
      res.msg = '请设置用户名!'
      return res
    }

    if (!rules.userName.test(params.userName)) {
      res.isPass = false
      res.msg = '请设置用户名![至少6位字符串]'
      return res
    }


    if (!params.pwd) {
      res.isPass = false
      res.msg = '请设置登录密码!'
      return res
    }

    if (!rules.pwd.test(params.pwd)) {
      res.isPass = false
      res.msg = '请设置正确格式的登录密码![至少六位字符串]'
      return res
    }

  }

  return res
}


//登录/注册/重置密码
function loginSubmit(type) {

  //获取参数
  const params = getParams(type)
  console.log("登录相关参数", params)
  //校验参数
  const res = checkForm(params, type)
  console.log("校验参数结果:", res)
  params.type = type

  $.ajax({
    type: 'POST',
    url: "/api/login",
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json',
    success: (res) => {
      console.log("登录/注册结果:", res)
    },
    error: (err) => {
      console.log("接口请求失败:", err)
    }
  });
}





//发送注册验证码
async function sendCode(type = 'register') {
  //1. 获取表单
  const form = document.forms['login']
  //2.参数
  const params = {
    phone: form.phone.value.trim() || '', //电话号码
  }
  //3.校验
  if (!params.phone) {
    return $message({
      message: "请输入手机号码",
      type: 'warning'
    }
    )
  }

  if (!rules.phone.test(params.phone)) {
    return $message({
      message: "请输入正确格式的手机号码",
      type: 'warning'
    }
    )
  }


  //4. 获取结果
   let url = '/proxy/auth/registerCode'
  // console.log("验证码类型:", type)
  // const res = await ajax({
  //   url,
  //   query: params.phone
  // })

  // console.log("res", res)


  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json',
    success: (res) => {
      console.log("发送验证码:", res)
    },
    error: (err) => {
      console.log("接口请求失败:", err)
    }
  });




}


window.sendCode = debounce(sendCode, 300, true)