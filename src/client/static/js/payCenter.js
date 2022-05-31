/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 支付宝支付中间数据处理
 * @Date: 2022-05-20 17:50:04
 * @LastEditTime: 2022-05-31 15:17:49
 */

/*
 路由携带参数说明（required）:
    params  url:  接口地址   type: 接口类型  query（object）： 支付接口所需参数  传参前通过JSON.stringify()转一下
*/


$(async function () {
  const params = JSON.parse(localStorage.getItem('TQParams'));
  console.log(localStorage.getItem('TQParams'), '======');
  console.log(params, 'params=====');
  // let params = JSON.parse(getParams().params) // 获取付款参数
  // 个人中心/我的套餐/续费
  if (ajax) {
    try {
      let res = await ajax(params)
      if (res) {
        let html = res.payUrl;
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
        document.write(dom.innerHTML);
        localStorage.removeItem('TQParams')
      }
    } catch (error) {
      console.log(error);
    }
  }

})
