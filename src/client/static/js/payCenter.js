/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 支付宝支付中间数据处理
 * @Date: 2022-05-20 17:50:04
 * @LastEditTime: 2022-05-21 09:03:28
 */

/*
 路由携带参数说明（required）:
    payment:     支付的方式(官网/我的套餐续费、补量、修改失效等等)


    params  url:  接口地址   type: 接口类型  query（object）： 支付接口所需参数  传参前通过JSON.stringify()转一下
*/
function getParams() {
  let params = location.search
  let url = decodeURI(params)
  let Request = new Object()
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1) //去掉?号
    strs = str.split("&")
    for (var i = 0; i < strs.length; i++) {
      Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
    }
  }
  return JSON.parse(JSON.stringify(Request))
}

$(async function () {
  let params = JSON.parse(getParams().params) // 获取付款参数
  // 个人中心/我的套餐/续费
  if (payment === "renew" && ajax) {
    console.log(params, "ajax======")
    let res = await ajax(params)
    if (res && res.code === 200) {
      let html = res.data && res.data.payUrl;
      let dom = document.createElement("div")
      dom.innerHTML = html
      let htmlDom = dom.getElementsByTagName("form")[0]
      htmlDom.setAttribute("accept-charset", "UTF-8")
      if (document.attachEvent) {
        htmlDom.attachEvent("οnsubmit", () => {
          document.characterSet = "UTF-8"
        })
      } else {
        htmlDom.addEventListener(
          "οnsubmit",
          () => {
            document.characterSet = "UTF-8"
          },
          false
        )
      }
      document.write(dom.innerHTML)
    }
  }
})
