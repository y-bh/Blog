/*
 * @Author: 朱占伟
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-04-24 14:17:48
 * @LastEditTime: 2022-05-18 10:21:23
 */

let test = {
  name:'朱占伟22'
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
  window.isMobile = (width<=575)
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


//初始化效果
$(function () {

  //1.自适应布局计算
  change()

  $(window).resize(debounce(() => {
    change()
  }, 500))

})