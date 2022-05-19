/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-16 13:12:33
 * @LastEditTime: 2022-05-16 13:14:40
 */
$(".toolbar-gift").click(function () {
  sessionStorage.setItem('TQ_Form_Status','register');
  //注册页面TODo
  window.location.href = '/login/index.html'
})