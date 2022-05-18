/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: 业务场景js
 * @Date: 2022-05-18 09:55:44
 * @LastEditTime: 2022-05-18 09:55:44
 */
//优质的使用体验
$("#kernelBox li").hover(function () {
  $(this).addClass("active")
  $(this).find('.icon-img').addClass('li_hover')
},function() {
  $(this).removeClass("active")
  $(this).find('.icon-img').removeClass('li_hover')
})

//套餐
$('.menu_box').hover(function() {
  $(this).addClass('menu_box_move')
},function() {
  $(this).removeClass('menu_box_move')
})