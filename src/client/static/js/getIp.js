/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: 提取ip js
 * @Date: 2022-05-17 17:10:06
 * @LastEditTime: 2022-05-23 10:25:37
 */

//点击定位
$('.anchor span').on('click', function () {
  let currentAnchor = $('.right .head').eq($(this).index()).offset().top
  $('body,html').stop().animate({
    scrollTop: currentAnchor - 120
  })
})
$('.demo span').on('click', function () {  //代码demo定位
  let currentDemo = $('.right div').last($(this).index()).offset().top
  $('body,html').stop().animate({
    scrollTop: currentDemo
  })
})


//样式切换
$('.narrow_box').on('click', function () {
  $(this).toggleClass('narrow_box_choose').siblings().removeClass('narrow_box_choose')
})




$(function () {
  let t = null

  //动态改变列表高度
  function resize(){
    const getContentHeight = () => {//获取内容列表每一行的高度
      let heightList = []
      $('.note_content .ele').each((index, item) => {
        heightList.push($(item).css('height'))
      })
      return heightList
    }
    let heightList = getContentHeight()
    $('.note_desc .ele').each((i, e) => {
      heightList.map((item, index) => {
        if (i === index) {  //如果高度数组索引等于dom数组索引才进行高度赋值
          $(e).css({
            'height': item
          })
        }
      })
    })
  }

  //简单防抖，防止改变过快
  window.addEventListener('resize', function () {
    if(t) t = null;
    t = setTimeout(()=>{
      resize()
      t = null
    }, 750)
  })


  //初始定时器改变大小
  setTimeout(()=>{
    resize()
  }, 100)

})


//未登录点击"选择提取类型"跳转至登录页
$('.extract_select').on('click', function () {
  if (!isLogin) {
    window.location.pathname = "/login"
  }
})

$('.isJSON').hide()

//判断是否生成
function createUpi() {
  if(!$('.apiUrl_input').val()){
    Helper.$message.warning({
      message: '请先生成API',
      showClose: true
    })
    return true
  }
  return false
}

//复制链接
$('.apiUrl_input_box .copy').on('click', function () {
  let re = createUpi()
  if(re){
    return 
  }
  let text = $('.apiUrl_input')
  text.select()
  document.execCommand('copy')
})

//打开链接
$('.apiUrl_input_box .open').on('click', function () {
  let re = createUpi()
  if(re){
    return 
  }
  let text = $('.apiUrl_input').val()
  window.open(text)
})

//立即下载
$('.download').on('click', function () {
  console.log('下载');
})

//锚点
$(function () {
  function to(id) {
    console.log(id);
    let bridge = $(`#${id}`)[0];
    let body = document.body;
    let height = 0;

    do {
      height += bridge.offsetTop;
      bridge = bridge.offsetParent;
    } while (bridge !== body)

    console.log(height);

    window.scrollTo({
      top: height - 100,
      behavior: "smooth",
    })
  }

  let href = window.location.href.split('?')
  if (href.length > 1) {
    let query = href[1].split('&')
    for (let i of query) {
      if (i.indexOf('a_id') !== -1) {
        setTimeout(()=>{
          to(i.split('=')[1].split('#')[0])
        }, 150)
      }
    }
  }
})

let apiParams = {
  secret: null,  //密钥  后台传递
  num: 10,   //数量  默认10，不超200
  yys: null,   //ip运营商  不限 电信 联通
  type: 'txt',   //返回类型  txt json
  lb: null,  //如果选择txt 分隔符
  region: null,   //区域编号  ,分割
  port: '1',   //IP协议  1 HTTP　2 Socks5  3 HTTPS
  time: null,   //按次提取必选： 使用时长 3 5 10 15
  ts: null,   //是否显示ip过期时间
  ys: null,   //IP运营商
  cs: null,   //是否显示位置
}




//如果不为余额提取，隐藏数量
$(function () {
  let ipUseItem = $('.ip_use_item')
  function changeParams(type, val) {
    apiParams[type] = val
  }
  function ipUseOpenChange() {
    ipUseItem.on('click', function () {
      $(this).addClass('ip_use_item_choose').siblings().removeClass('ip_use_item_choose')
      changeParams($(this).attr('d-type'), $(this).attr('val'))
    });
    ipUseItem[0].click()
  }
  function ipUseCloseChange() {
    ipUseItem.off('click')
  }

  let selectTest = $('#extractType'); //select
  function hideS() {
    $('.meal_box, .ip_use').hide(0, ipUseCloseChange)
    apiParams.time = null
  }
  function showS() {
    $('.meal_box, .ip_use').show(0, ipUseOpenChange)
    apiParams.time = '3'
  }
  function firstRun(e = null) {
    selectTest.find("option:selected").attr('d-val') === '10' ? showS() : hideS()
    apiParams.secret = selectTest.val()
  }
  selectTest.on('change', firstRun);
  firstRun()
})




//动态修改api值
$(function () {
  function changeParams(type = null, val = null) {
    console.log(type, val)
    if (!type) {
      return
    }
    if (['cs', 'ys', 'ts'].includes(type)) {
      apiParams[type] = apiParams[type] === val ? null : val
      return
    }
    if (type === 'region') {
      if (apiParams.region.includes(val)) {
        let index = apiParams.region.indexOf(val)
        apiParams.region.splice(index, 1)
      } else {
        apiParams.region.push(val)
      }
      return
    }
    apiParams[type] = val
  }

  $('.form-check-input, .form-check-label').on('click', function (e) {
    if ($(e.target).is("label"))
      return;
    changeParams($(this).parent().attr('d-type'), $(this).val())
  })

  $('.narrow_box').on('click', function () {
    $(this).addClass('narrow_box_choose').siblings().removeClass('narrow_box_choose')

    changeParams($(this).parent().attr('d-type'), $(this).attr('val'))
  })


  //提取数量
  $(function () {
    let numInput = $('.extract_num_input')

    function changeNum(val) {
      if (!val || val < 0) {
        val = 1
        Helper.$message.warning({
          message: '单次最小提取量为1',
          showClose: true
        })
      }
      if (val && val > 200) {
        val = 200
        Helper.$message.warning({
          message: '单次最大提取量为200',
          showClose: true
        })
      }
      if (!/^\d+(\.\d+)?$/.test(val)) {
        let index = val.match(/^['0','1','2','3','4','5','6','7','8','9']+/g)
        console.log(val, index);
        val = index
        Helper.$message.warning({
          message: '请输入数字！',
          showClose: true
        })
      }
      numInput.val(val)
      apiParams.num = val
    }

    function btnNum(val, type) {
      if (type === 'decrement') {
        changeNum(val - 5)
      } else {
        changeNum(val + 5)
      }
    }

    numInput.on('input change', function (e) {
      changeNum(e.target.value)
    })

    $('.decrement,.increment').on('click', function () {
      let val = $(this).siblings('.extract_num_input').val() //获取input值
      let type = $(this).attr('class') //获取当前类名
      btnNum(Number(val), type)
    })
  })


  //改变数据格式回调函数更改参数
  function changeDataTypeCallback(type) {
    if(type === 'json'){
      apiParams.lb = null
    }
  }


  //数据格式显示
  $('.d_type_change').on('click', function () {
    if ($(this).attr('val') === 'json') {
      $('.isJSON').show(0, changeDataTypeCallback)
      $('.separator_box').hide()
    } else {
      $('.isJSON').hide()
      $('.separator_box').show()
    }
  })


  //地区改变选择回调
  function changeAreaPCallback() {
    apiParams.region = []
  }
  function changeAreaCCallback() {
    apiParams.region = null
  }

  //地区改变监听
  $('.a_area').on('click', function () {
    let area = $(this).attr('d-area')
    if(area === 'country'){
      $('.isProvince').hide(0, changeAreaCCallback)
    }else if(area === 'province'){
      $('.isProvince').show(0, changeAreaPCallback)
    }
  })


  $('.create_api_url').on('click', function () {
    let url = "http://api.tianqiip.com/getip?"
    console.log(apiParams.region);
    if(apiParams.region && apiParams.region.length === 0){
      Helper.$message.warning({
        message: '请选择地区',
        showClose: true
      })
      $('.apiUrl_input').val('')
      return 
    }
    for (let i in apiParams) {
      if (apiParams[i] === null || apiParams[i].length === 0) {
        continue;
      }
      if(i === 'region'){
        url += `${i}=${apiParams[i].join(',')}&`
      }else if(i == 'yys'){
        url += `${i}=${encodeURI(apiParams[i])}&`
      }else{
        url += `${i}=${apiParams[i]}&`
      }
    }
    $('.apiUrl_input').val(url.slice(0, -1))
  })
})