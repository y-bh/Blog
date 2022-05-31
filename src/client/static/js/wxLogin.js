// 复制功能
function copy(data) {
  data = data || location.href
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = data
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(input)
    Helper.$message({
      message: '复制成功!',
      type: 'success'
    })
    return true
  } else {
    return false
  }
}



//获取参数
window.openId = null


//登录
async function loginSubmit() {

  const params = {
    username: $("#username").val(),
    password: $("#password").val(),
    wxOpenId: window.openId || sessionStorage.getItem('openId')
  }

  console.log("loginSubmit 传参:", params)

  if (!params.username) {
    $("#username1").show()
    return
  } else {
    $("#username1").hide()
  }

  if (!params.password) {
    $("#password1").show()
    return
  } else {
    $("#password1").hide()
  }

  if (!params.wxOpenId) {
    return Helper.$message({
      message: 'wxOpenId 获取失败',
      type: 'warning'
    })


  }

  const res = await ajax({
    url: "/wxFollowWelfare",
    query: JSON.stringify(params)
  }, '/api')

  console.log("loginSubmit接口响应结果:", res)
  //注册成功后
  if (res) {
    $("#res").text(res.message || "已获取福利")
    $(".wxlogin-info").eq(0).hide()
      .siblings(".wxLogin-message").show()

  }
}


//获取openId
async function getOpenId(code) {
  if (!code) {
    console.log("请传入code")
    return
  }

  const res = await ajax({
    type: 'get',
    url: `/proxy/getWxOpenId/${code}`,
    query: null
  })

  console.log("getOpenId获取结果:", res)
  if (+res.code !== 200) {
    return Helper.$message({
      message: res.message || 'openId 获取失败',
      type: 'warning'
    })
  }

  return res.data
}



$(async function () {
  //1. 获取路由参数
  var query = getParams()

  console.log("查询参数:", query.code, query && !query.code)

  //2. 如果是微信端
  if (query && !query.code) {
    $("#wx-client").hide().siblings("#browser-client").show()
    return;
  } else {
    //当前是微信端
    $("#wx-client").show().siblings("#browser-client").hide()

    //获取微信openId
    let openId = await getOpenId(query.code)
    console.log("获取的openId:", openId)
    window.openId = openId
    sessionStorage.setItem('openId', openId)
  }
})
