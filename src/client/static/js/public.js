function successTips (msg) {
  const tips = document.createElement('div')
  tips.innerHTML = msg
  tips.className = 'success-tips'
  document.getElementsByTagName('body')[0].appendChild(tips)

  setTimeout(()=>{
    document.getElementsByTagName('body')[0].removeChild(tips)
  }, 2000)
}