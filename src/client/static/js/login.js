const loginDom = document.getElementById('login-card')
const regDom = document.getElementById('register-card')
const resetDom = document.getElementById('reset-card')

function resetClass() {
  loginDom.classList.remove('is-active', 'is-unactive-1', 'is-unactive-2')
  regDom.classList.remove('is-active', 'is-unactive-1', 'is-unactive-2')
  resetDom.classList.remove('is-active', 'is-unactive-1', 'is-unactive-2')
}

function loginClick() {
  resetClass()
  loginDom.classList.add('is-active')
  regDom.classList.add('is-unactive-1')
  resetDom.classList.add('is-unactive-2')
}

function regClick() {
  resetClass()
  loginDom.classList.add('is-unactive-1')
  regDom.classList.add('is-active')
  resetDom.classList.add('is-unactive-2')
}

function resetClick() {
  resetClass()
  loginDom.classList.add('is-unactive-1')
  regDom.classList.add('is-unactive-2')
  resetDom.classList.add('is-active')
}

function addArrClick(e, fn) {
  Array.from(e).forEach((item => {
    item.addEventListener('click', fn)
  }))
}

(function(){
  addArrClick(document.getElementsByClassName('login-bt'), loginClick)
  addArrClick(document.getElementsByClassName('reg-bt'), regClick)
  addArrClick(document.getElementsByClassName('reset-bt'), resetClick)
})()

console.log('test stream')