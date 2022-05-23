/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: 企业服务js
 * @Date: 2022-05-17 14:48:37
 * @LastEditTime: 2022-05-23 17:41:07
 */
// $(function() {
//   //表单校验
//   window.addEventListener('load', function() {
//     // 获取表单验证样式
//     var forms = document.getElementsByClassName('needs-validation');
//     let btn = document.querySelector('.submit')
//     // 循环并禁止提交
//     var validation = Array.prototype.filter.call(forms, function(form) {
//       btn.addEventListener('click', function(event) {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     });
//   }, false);
// })

let minPHONE = /^1[3456789]\d{9}$/;

(function () {
  'use strict'
  
  let forms = document.querySelectorAll('.needs-validation')
  let btn = document.querySelector('.submit')


  function validateFunc(params) {
    let { company, contact, desc, name, useLevel } = params
    if(!minPHONE.test(contact)){
      return {
        res: false,
        content: '手机号码格式不正确'
      }
    }
    return null
  }

  
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    btn.addEventListener('click', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      else {
        let params = $('#company_form').toJson()
        let res = validateFunc(params);

        if(res){
          Helper.$message.warning({
            message: res.content,
            showClose: true
          })
          return
        }

        onSubmit()
      }
  
      form.classList.add('was-validated')
    }, false)
  })
  })()

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
  let params = {
    url: 'company/new',
    type: 'post',
    query: JSON.stringify($('#company_form').toJson())
  }
  let res = await ajax(params);
  if (res) {
    Helper.$message.success({ message: '提交成功' })
  } else {
    Helper.$message.error({ message: '提交失败' })
  }
}