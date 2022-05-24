/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: 企业服务js
 * @Date: 2022-05-17 14:48:37
 * @LastEditTime: 2022-05-24 18:19:14
 */


let minPHONE = /^1[3456789]\d{9}$/;


$(function () {

  //校验不通过
  function validateNo(e) {
    e.addClass('red-border').siblings('.error-wrap').children().show()
  }
  //通过
  function validateYes(e){
    e.removeClass('red-border').siblings('.error-wrap').children().hide()
  }

  let btn = document.querySelector('.submit')
  console.log(btn);


  function validateFunc(params) {
    let { company, name, contact, useLevel, desc } = params
    let e = true

    for(let i in params){
      if(i === 'desc'){
        continue
      }
      if(!params[i].trim()){

        validateNo($(`#${i}`))
        e = false
      }else{
        validateYes($(`#${i}`))
      }
    }

    if(!e){
      return {
        content: 'k'
      }
    }

    if(!minPHONE.test(contact)){
      return {
        res: false,
        content: '手机号码格式不正确'
      }
    }
    return null
  }

  
  // Loop over them and prevent submission
  btn.addEventListener('click', function(event) {


    let params = $('#company_form').toJson()
    let res = validateFunc(params);
      
    if(res){
      if(res.content === 'k') return
      Helper.$message.warning({
        message: res.content,
        showClose: true
      })
      return
    }

    onSubmit()
  
  }, false)



  
  $('.form_input').on('input', function (e) {
    let event = $(this)
    if(e.target.name === 'desc'){
      return 
    }
    if(!e.target.value.trim()){
      validateNo(event)
    }else{
      validateYes(event)
    }
  })
})

//ajax提交form表单转JSON格式
$(function() {
  $.fn.toJson = function() {
    var newObj={};  
    var array=this.serializeArray();  
    var str=this.serialize();  
    $(array).each(function(){  
        if(newObj[this.name]){  
            if($.isArray(newObj[this.name])){  
                newObj[this.name].push(this.value);  
            }else{  
                newObj[this.name]=[newObj[this.name],this.value];  
            }  
        }else{  
            newObj[this.name]=this.value;   
        }  
    });  
    return newObj;  
  }
})

//提交
async function onSubmit () {
  let query = $('#company_form').toJson()
  for(let i in query){
    query[i] = query[i].trim()
  }
  let params = {
    url: '/company/new',
    type: 'post',
    query: JSON.stringify(query)
  }
  let res = await ajax(params);
  console.log(res);
  if (res) {
    Helper.$message.success({ message: '提交成功' })
  }
}