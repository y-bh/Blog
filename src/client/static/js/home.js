/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-14 13:51:32
 * @LastEditTime: 2022-05-24 13:20:52
 */

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


//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

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




//首次进入弹出窗
let event = null

function diaJump() {
  if(dia_token){
    window.location.pathname = '/package'
    return 
  }
  window.location.pathname = '/register'
}

$('.center-dialog-jump').on('click', diaJump)

$('.left-dialog-jump').on('click', diaJump)

function removeClick(s = null) {
  if(s){
    $('.center-dialog-jump').off('click')
    return 
  }
  $('.left-dialog-jump').off('click')
}

function disableScroll() {
  document.documentElement.style.overflowY = 'hidden'
}
if(actt !== 'd'){
  disableScroll()
}

function openScroll() {
  document.documentElement.style.overflowY = 'scroll'
}

function closeDialog(e, s = null) {
  if(s){
    $(`.${s}`).show(0, openScroll)
  }
  removeClick(s)
  $(`.${e}`).remove()
}



//初始化
$(function () {
  if (getCookie && !getCookie('ipNumTotal')) {
    let ipNumTotal = randomNum(2000000, 2999999);
    let ipNumUpdate = randomNum(7000000, 1300000);
    setCookie('ipNumTotal', ipNumTotal, 0.5)
    setCookie('ipNumUpdate', ipNumUpdate, 0.5)
  }



  numDynamic("cityNum", 0, 200, 4, 50)
  numDynamic("ipTotalNum", 100000, +getCookie('ipNumTotal'), 50000, 50)
  numDynamic("ipNum", 600000, +getCookie('ipNumUpdate'), 80000, 50)
  numDynamic("canUserNum", 8, 99, 2, 50)


    //动画
    new WOW().init();
})