/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: 登录/注册/重置页功能
 * @Date: 2022-05-17 15:29:16
 * @LastEditTime: 2022-05-21 15:18:13
 */


/**************
 * 
 * 
 * 暴露字段:
 * from: 注册来源
 * back: 登录后返回页面，没有则返回个人中心
 * did: 注册短链
 * 
 *
 */



//校验相关参数
const rules = {
  phone: /^1\d{10}$/,
  pwd: /[a-zA-Z0-9@#$%^&*_]{6,20}$/,
  userName: /[0-9a-zA-Z_@]{6,16}/,
  code: /\d{6}/
}

//获取 query 相关参数
const query = getParams()

//登录后返回的地址
let back = null

if (query && query.back) {
  back = query.back
}

//注册页 生成浏览器指纹
function fingerprint2() {

  Fingerprint2.get(function (components) {
    const values = components.map(function (component, index) {
      if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
        return component.value.replace(/\bNetType\/\w+\b/, '')
      }
      return component.value
    });
    // 生成最终id murmur
    const murmur = Fingerprint2.x64hash128(values.join(''), 31);
    localStorage.setItem('fingerPrint', murmur)
  });

}

if (location.pathname.includes("register")) {
  fingerprint2()
}







// 获取相关参数
let agreeMent = false
function getFuncParams(type = 'login') {
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
      agreeMent
    })

    //关于注册短链
    let did = getCookie('did') || localStorage.getItem('did') || null
    let from = getCookie('from') || localStorage.getItem('from') || null
    let keyword = getCookie('keyword') || localStorage.getItem('keyword') || null

    if (did) {
      obj.did = did
    }

    if (from) {
      obj.from = from
    }

    if (keyword) {
      obj.keyword = keyword
    }

    let fingerPrint = localStorage.getItem("fingerPrint") || null
    if (fingerPrint) {
      obj.fingerPrint = fingerPrint
    }
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

//是否同意注册协议
function agreeOn() {
  agreeMent = !agreeMent

}


function checkForm(params = null, type = 'login') {
  if (!params) {
    return
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
      res.key = 'phone'
      return res
    }



    if (!params.pwd) {
      res.isPass = false
      res.msg = '请输入密码!'
      res.key = 'pwd'
      return res
    }

  } else {
    if (!params.phone) {
      res.isPass = false
      res.msg = '请输入手机号'
      res.key = 'phone'
      return res
    }

    if (!rules.phone.test(params.phone)) {
      res.isPass = false
      res.msg = '请输入正确的手机号码!'
      res.key = 'phone'
      return res
    }

    if (!params.code) {
      res.isPass = false
      res.msg = '请输入短信验证码!'
      res.key = 'code'
      return res
    }

    if (!rules.code.test(params.code)) {
      res.isPass = false
      res.msg = '请输入正确的短信验证码!'
      res.key = 'code'
      return res
    }
  }
  if (type === 'reset') {
    if (!params.pwd) {
      res.isPass = false
      res.msg = '请设置登录密码!'
      res.key = 'pwd'
      return res
    }

    if (!rules.pwd.test(params.pwd)) {
      res.isPass = false
      res.msg = '密码长度在6到20个字符密码只能由字母，数字，特殊符号组成'
      res.key = 'pwd'
      return res
    }

    if (!params.cpwd) {
      res.isPass = false
      res.msg = '请确认登录密码!'
      res.key = 'cpwd'
      return res
    }
    if (params.pwd !== params.cpwd) {
      res.isPass = false
      res.msg = '登录密码与确认密码不一致!'
      res.key = 'cpwd'
      return res
    }

  }
  if (type === 'register') {
    if (!params.userName) {
      res.isPass = false
      res.msg = '账号不能为空!'
      res.key = 'userName'
      return res
    }

    if (!rules.userName.test(params.userName)) {
      res.isPass = false
      res.msg = '帐号只能由字母，数字，_@组成帐号长度在6到16个字符'
      res.key = 'userName'
      return res
    }


    if (!params.pwd) {
      res.isPass = false
      res.msg = '请输入登录密码!'
      res.key = 'pwd'
      return res
    }

    if (!rules.pwd.test(params.pwd)) {
      res.isPass = false
      res.msg = '密码长度在6到20个字符密码只能由字母，数字，特殊符号组成'
      res.key = 'pwd'
      return res
    }

    if (!params.agreeMent) {
      res.isPass = false
      res.msg = '请先勾选用户协议，点击用户协议打开新窗口到协议内容'
      res.key = 'agreeMent'
      return res
    }

  }
  return res
}

//登录/注册/重置密码
async function loginSubmit(type) {
  //获取参数
  const params = getFuncParams(type)

  //校验参数
  const res = checkForm(params, type)
  if (!res.isPass) {
    console.log("结构:", res)
    $(".login-danger").hide()
    $("#" + res.key).html(res.msg).show()
    return
  }

  let text = '登录'
  switch (type) {
    case 'reset':
      text = '重置'
      break;
    case 'register':
      text = '注册'
      break
    default:
      text = '登录'
  }

  params.type = type

  $.ajax({
    type: 'POST',
    url: "/api/login",
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json',
    success: (res) => {

      if (res && res.code !== 200) {
        return Helper.$message({
          message: res.message || `${text}失败请联系客服`,
          type: 'warning'
        })

      }
      if (type !== 'login') {
        location.href = "/login"
      } else {
        //back
        if (back) {
          let urls = `${back}`
          if (urls & urls.charAt(0) != '/') {
            urls = "/" + urls
          }
          location.href = `${back}`
          return
        }
        location.href = "/manager/user"
      }
    },
    error: (err) => {

    }
  });
}

//发送注册验证码
let timer = null //验证码定时器
let count = 60 //定时时间
async function sendCode(type = 'register') {

  //1. 获取表单
  const form = document.forms['login']

  //2.参数
  const params = {
    phone: form.phone.value.trim() || '', //电话号码
  }


  //3.校验
  if (!params.phone) {
    return Helper.$message({
      message: "请输入手机号码",
      type: 'warning'
    }
    )
  }

  if (!rules.phone.test(params.phone)) {
    return Helper.$message({
      message: "请输入正确格式的手机号码",
      type: 'warning'
    }
    )
  }

  //4. 获取结果
  // let url = '/auth/registerCode'

  // if (type === 'reset') {
  //   url = '/user/forget/password/getCode'
  // }

  //注册验证码 【验证码 需要加密 在node 端接口转发】
  let url = 'registerCode'

  if (type === 'reset') {
    url = 'resetCode'
  }
  const res = await ajax({
    url,
    query: JSON.stringify({
      phone: params.phone
    })
  }, '/api')



  if (res) {
    //开启倒计时 obn-code
    clearInterval(timer)
    timer = setInterval(() => {
      if (count > 0) {
        // 
        $("#obn-code").val(count--)
        $("#obn-code").attr("disabled", true)
      } else {
        clearInterval(timer)
        count = 60
        $("#obn-code").val('发送验证码')
        $("#obn-code").attr("disabled", false)
      }
    }, 1000)


    return Helper.$message.success({
      message: '请在手机端查看验证码',
      showClose: true
    })
  }
}
//防抖函数
function debounce(fn, delay, once = false) {

  var timeout = null;
  var count = 0;
  return function (e) {
    if (once && count === 0) {

      fn.apply(this, arguments);
      count++
      return
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      once && count++
    }, delay);
  };
}
window.sendCode = debounce(sendCode, 300, true)
window.loginSubmit = debounce(loginSubmit, 300, true)

// 便捷登录
var docu = document.getElementsByTagName('document');
document.onkeydown = function (e) {
  const e1 = e || window.event;
  if (e1.keyCode === 13) {
    const path = window.location.pathname
    window.loginSubmit(path.slice(1));
  }
};





