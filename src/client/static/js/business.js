/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: 业务场景js
 * @Date: 2022-05-18 09:55:44
 * @LastEditTime: 2022-05-20 12:51:59
 */
//优质的使用体验
$("#kernelBox li").hover(function () {
  $(this).addClass("active")
  $(this).siblings().removeClass("active");
})


//套餐
$('.menu_box').hover(function() {
  $(this).addClass('menu_box_move')
},function() {
  $(this).removeClass('menu_box_move')
})