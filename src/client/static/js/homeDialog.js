/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-25 11:45:18
 * @LastEditTime: 2022-05-25 12:38:08
 */

function  showLeftDialog() {
  
}

function closeDialog(e, s = null) {
  if(s){
    $(`.${s}`).show()
  }
  $(`.${e}`).remove()
}