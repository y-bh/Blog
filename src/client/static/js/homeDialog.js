/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-25 11:45:18
 * @LastEditTime: 2022-05-25 13:56:30
 */

let event = null

function disableScroll() {
  document.documentElement.style.overflowY = 'hidden'
}
disableScroll()

function openScroll() {
  document.documentElement.style.overflowY = 'scroll'
}

function closeDialog(e, s = null) {
  if(s){
    $(`.${s}`).show(0, openScroll)
  }
  $(`.${e}`).remove()
}