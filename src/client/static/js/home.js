/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-14 13:51:32
 * @LastEditTime: 2022-05-23 18:19:08
 */
$("#kernelBox li").hover(function () {
  $(this).addClass("active")
  $(this).siblings().removeClass("active");
})

function onFreeTry() {
  if (window.isLogin) {
    window.location.href = "/package";
  } else {
    // 记录界面路径，登录完回跳
    let $path = window.location.pathname;
    sessionStorage.setItem('_TQRoutePath', $path)
    window.location.href = "/register";
  }
}
function queryAll() {
  window.location.href = "/help-center";
}




$(function () {
  numDynamic("cityNum", 0, 200, 2, 50)
  numDynamic("ipTotalNum", 1800, 31974, 30, 5)
  numDynamic("ipNum", 0, 200, 2, 50)
  numDynamic("canUserNum", 0, 99, 1, 50)
})

/**
  * 动态数字方法
  * ID    => 对应ID
  * speed => 递增速度 
  * start:开始数字
  * step：每次递增
  */
function numDynamic(id, start, end, step, speed) {
  var span = document.getElementById(id);
  if (start < end) {
    var i = start;
    var t = setInterval(function () {
      i += step; // 设置每次增加的动态数字，可调整

      if (i >= end) {
        span.innerText = Number(end).toLocaleString();
        clearInterval(t);
      } else {
        span.innerText = Number(i).toLocaleString();
      }
    }, speed);
  } else {
    span.innerText = Number(start).toLocaleString();
  }
}