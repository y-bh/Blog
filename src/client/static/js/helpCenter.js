/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: page description
 * @Date: 2022-05-17 10:32:22
 * @LastEditTime: 2022-05-17 13:34:28
 */

//默认显示第一个tab
$('.nav .nav-item .nav-link').get(0).click();
$('.tab-content .tab-pane').eq(0).addClass('active')

//点击tab
$('.nav .nav-item .nav-link').on('click',function() {
  let index = $(this).parent().index()
  $('.tab-content .tab-pane').eq(index).addClass('active').siblings().removeClass('active')
})

//查看详情
$('.go_detail').on('click',function() {
  window.location.href='http://localhost:8080/helpDetails'
})

//点击页码
$('.pageList .page-item').on('click',function() {
  $(this).toggleClass('active').siblings().removeClass('active')
})
//默认展示第一页
// $('.pageList .page-item').get(0).click();