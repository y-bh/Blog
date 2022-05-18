/*
 * @Author: 陈昊天
 * @LastEditors: 朱占伟
 * @description: 企业服务js
 * @Date: 2022-05-17 14:48:37
 * @LastEditTime: 2022-05-18 15:29:28
 */
$(function() {
  //表单校验
  window.addEventListener('load', function() {
    // 获取表单验证样式
    var forms = document.getElementsByClassName('needs-validation');
    let btn = document.querySelector('.submit')
    // 循环并禁止提交
    var validation = Array.prototype.filter.call(forms, function(form) {
      btn.addEventListener('click', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
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