/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: page description
 * @Date: 2022-04-24 14:17:48
 * @LastEditTime: 2022-05-18 12:03:13
 */

let test = {
  name: '朱占伟22'
}

//函数防抖
function debounce(func, delay) {
  var timeout;
  return function (e) {
    clearTimeout(timeout);
    var context = this, args = arguments
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay)
  };
};


//自适应css 
function change() {
  var width = $(window).width();
  //是否是小于425的小屏幕，供移动端导航使用
  window.isMobile = (width <= 575)
  window.viewWidth = width;
  var size = `${(width / 1920) * 16}`
  if (size <= 8) {
    size = 8
  }
  size = Math.round(size)
  // 推广页方案与全局方案冲突,优先采用推广页自己的方案
  if(window.location.pathname !== '/promotion'){
    document.documentElement.style.fontSize = `${size}px`
  }
  
}

//退出登录
function layout() {
  console.log("退出登录!")

  document.cookie = null

  $.ajax({
    type: 'POST',
    url: "/api/layout",
    data: null,
    dataType: 'json',
    contentType: 'application/json',
    success: (res) => {
      console.log("退出登录结果:", res)
      if (+res.code !== 0) {
        return $message({
          message: res.msg || '退出登录失败!',
          type: 'warning'
        })

      }

      $message({ message: '退出登录' })

      return window.open("/login")
    },
    error: (err) => {
      console.log("接口请求失败:", err)
    }
  });


}

window.layout = debounce(layout, 300, true)

//初始化效果
$(function () {

  //1.自适应布局计算
  change()

  $(window).resize(debounce(() => {
    change()
  }, 500))

})