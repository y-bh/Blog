/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: page description
 * @Date: 2022-05-17 10:32:22
 * @LastEditTime: 2022-05-17 10:58:05
 */

//默认显示第一个tab
$('.nav .nav-item .nav-link').get(0).click();
$('.tab-content .tab-pane').eq(0).addClass('active')

//查看详情
$('.go_detail').on('click',function() {
  window.location.href='http://localhost:8080/helpDetails'
})

//点击页码
$('.pageList .page-item').on('click',function() {
  $(this).toggleClass('active').siblings().removeClass('active')
})

//点击tab
async function clickTab (data,dom) {
  console.log('data:',data);
}
//默认展示第一页
// $('.pageList .page-item').get(0).click();