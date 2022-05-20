/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-16 13:12:33
 * @LastEditTime: 2022-05-20 11:36:20
 */
function freeGift() {
  // 记录界面路径，登录完回跳
  let $path = window.location.pathname;
  sessionStorage.setItem('_TQRoutePath', $path)
  window.location.href = '/register'
}

function theCopy(inputId) {
  let textArea = document.getElementById('myTextArea')
  let text = document.getElementById(inputId)
  textArea.innerText = text.innerHTML
  textArea.select()
  document.execCommand('copy');
  Helper.$message.success({ message: '复制成功' })
}
