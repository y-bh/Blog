/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 登录页功能
 * @Date: 2022-05-17 15:29:16
 * @LastEditTime: 2022-05-17 16:05:35
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


function loginSubmit(type) {

  //获取参数
  const params = getParams(type)




  console.log("登录相关参数", params)

}

$(function () {
  console.log("登录页js")
  getParams()
})