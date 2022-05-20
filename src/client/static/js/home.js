/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-14 13:51:32
 * @LastEditTime: 2022-05-20 13:26:02
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
function queryAll(){
  window.location.href = "/help-center";
}

function contactUs() {
  window.open("https://wpa1.qq.com/Lkz12X21?_type=wpa&qidian=true", "_blank");
}

function jumpPackage(type) {
  sessionStorage.setItem("packageTab", type);//1:余额 2：包时
  window.location.href = "/package";
}

$(function () {
  numDynamic("cityNum", 0, 200, 2, 50)
  numDynamic("ipTotalNum", 1800, 31974, 30, 5)
  numDynamic("ipNum", 0, 200, 2, 50)
  numDynamic("canUserNum", 0, 99, 1, 50)
})