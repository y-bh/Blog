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

console.log('test stream1')

const RegSubmitBt = document.querySelector('#reg-submit-bt')
const LoginSubmitBt = document.querySelector('#login-submit-bt')

const DOM_OBJ = {
  regUser: document.querySelector('#reg-user-input'),
  regPassword: document.querySelector('#reg-pw-input'),
  regAgain: document.querySelector('#reg-pw-input-again'),
  loginUser: document.querySelector('#login-user-input'),
  loginPassword: document.querySelector('#login-pw-input'),
}

function success(data){
  if(data && +data.code === 10000){
    successTips(data.message)
  }else{
    alert(data.message)
  }
}

function registerSubmitBt(phone, pass, again) {
  if(pass !== again){
    return 
  }

  ajax.post('/blog/register', JSON.stringify({
    phone,
    pass
  })).then((res)=>{
    success(JSON.parse(res))
    //TODO: 路由跳转
  })
}

function loginSubmitBt(phone, pass) {
  ajax.post('/blog/login', JSON.stringify({
    phone,
    pass
  })).then((res)=>{
    // success(JSON.parse(res))
    console.log(res)
    //TODO: 路由跳转
  })
}

(function () {
  RegSubmitBt.addEventListener('click', function(){
    const phone = DOM_OBJ.regUser.value
    const pass = DOM_OBJ.regPassword.value
    const again = DOM_OBJ.regAgain.value
    registerSubmitBt(phone, pass, again)
  })

  LoginSubmitBt.addEventListener('click', function(){
    const phone = DOM_OBJ.loginUser.value
    const pass = DOM_OBJ.loginPassword.value
    loginSubmitBt(phone, pass)
  })
})()

