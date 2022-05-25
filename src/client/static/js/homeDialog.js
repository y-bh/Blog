/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-25 11:45:18
 * @LastEditTime: 2022-05-25 15:32:03
 */

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