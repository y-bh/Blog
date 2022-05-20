/*
 * @Author: 陈昊天
 * @LastEditors: liyuntao
 * @description: 提取ip js
 * @Date: 2022-05-17 17:10:06
 * @LastEditTime: 2022-05-20 11:53:56
 */
let loginStatus = true  //是否登录

//点击定位
$('.anchor span').on('click', function() {
  let currentAnchor = $('.right .head').eq($(this).index()).offset().top
  $('body,html').stop().animate({
    scrollTop: currentAnchor-120
  })
})
$('.demo span').on('click', function() {  //代码demo定位
  let currentDemo = $('.right div').last($(this).index()).offset().top
  $('body,html').stop().animate({
    scrollTop: currentDemo
  })
})
  
//点击IP使用时长
$('.ip_use_box .ip_use_item').on('click',function() {
  // deal_box,time_box为ip_use_item的子元素  time_text为time_box的子元素  deal_text为deal_box的子元素
  $(this).toggleClass('ip_use_item_choose').siblings().removeClass('ip_use_item_choose')
  $(this).find('.time_text').toggleClass('time_text_choose').parent().parent().siblings().children().children().removeClass('time_text_choose')
  $(this).find('.deal_box').toggleClass('deal_box_choose').parent().siblings().children().removeClass('deal_box_choose')
  $(this).find('.deal_text').toggleClass('deal_text_choose').parent().parent().siblings().children().children().removeClass('deal_text_choose')
})

//样式切换
$('.narrow_box').on('click',function() {
  $(this).toggleClass('narrow_box_choose').siblings().removeClass('narrow_box_choose')
})

//提取数量
$(function() {
  const changeIpNum = (val,btn) => {
    let num = Number(val)
    if (btn === 'decrement' && val <= 1) {  //点击"-"并且数值为1
      Helper.$message.warning({
        message: '单次最小提取量为1',
        showClose: true
      })
      return null
    } else {
      if (btn === 'decrement') {
        num-=5;
        return num;
      } else {
        num+=5;
        return num;
      }
    }
  }
  $('.decrement,.increment').on('click',function() {
    let currentVal = $(this).siblings('.extract_num_input').val() //获取input值
    let currentEl = $(this).attr('class') //获取当前类名
    let newVal = changeIpNum(currentVal,currentEl)
    if (newVal !== null) {  //判断是否逻辑正确
      $(this).siblings('.extract_num_input').val(newVal)
    }
  })
})


$(function() {
  //动态改变列表高度
  const getContentHeight = () => {//获取内容列表每一行的高度
    let heightList = []
    $('.note_content .ele').each((index,item)=>{
      heightList.push($(item).css('height'))
    })
    return heightList
  }
  let heightList = getContentHeight()
  $('.note_desc .ele').each((i,e)=>{
    heightList.map((item,index) => {
      if (i === index) {  //如果高度数组索引等于dom数组索引才进行高度赋值
        $(e).css({
          'height':item
        })
      }
    })
  })
})

//登录情况判断渲染
$('.already_login').css('display',loginStatus ? 'block' : 'none')
$('.not_login').css('display',loginStatus ? 'none' : 'block')

//未登录点击"选择提取类型"跳转至登录页
$('.extract_select').on('click',function() {
  if (!loginStatus) {
    window.location.href="http://localhost:8080/login/index"
  }
})

//数据格式显示
$('.data_format .narrow_box').on('click',function() {
  let currentClass = $(this).attr('class').split(' ')[1]
  if (currentClass === 'data_json') {
    $('.isJSON').show()
  } else {
    $('.isJSON').hide()
  }
})

//点击省份显示地区
$(function() {
  const showArea = () => {
    $('.choose_area_box .narrow_box').on('click',function() {
      let currentClass = $(this).attr('class').split(' ')[0]
      if (currentClass === 'a_province') {
        $('.isProvince').show()
      } else {
        $('.isProvince').hide()
      }
    })
  }

  // 地区展示登陆判断
  if (loginStatus) {
    $('.isProvince').show()
    showArea()
  } else {
    $('.isProvince').hide()
  }
})

//默认选中第一个
let ipUseFirst = $('.ip_use_box .ip_use_item')[0] //ip使用时长
$(ipUseFirst).addClass('ip_use_item_choose')
$(ipUseFirst).find('.time_text').addClass('time_text_choose')
$(ipUseFirst).find('.deal_box').addClass('deal_box_choose')
$(ipUseFirst).find('.deal_text').addClass('deal_text_choose')
let dataFirst = $('.data_format .narrow_box')[0] //数据格式
$(dataFirst).addClass('narrow_box_choose')
let separatorFirst = $('.separator .narrow_box')[0] //分隔符
$(separatorFirst).addClass('narrow_box_choose')
let areaFirst = $('.choose_area_box .narrow_box')[0] //选择地区
$(areaFirst).addClass('narrow_box_choose')
let operatorFirst = $('.operator_box .narrow_box')[0] //运营商
$(operatorFirst).addClass('narrow_box_choose')
let ipFirst = $('.ip_box .narrow_box')[0] //IP协议
$(ipFirst).addClass('narrow_box_choose')
$('.isJSON').hide()

//复制链接
$('.apiUrl_input_box .copy').on('click',function() {
  let text = $('.apiUrl_input')
  text.select()
  document.execCommand('copy')
})

//打开链接
$('.apiUrl_input_box .open').on('click',function() {
  let text = $('.apiUrl_input').val()
  window.location.href = text
})

//立即下载
$('.download').on('click',function() {
  console.log('下载');
})

//锚点
$(function () {
  function to(id) {
    let bridge = $(`#${id}`)[0];
    let body = document.body;
    let height = 0;

    do{
      height += bridge.offsetTop;
      bridge = bridge.offsetParent;
    } while (bridge !== body)
    
    console.log(height);

    window.scrollTo({
      top: height-100,
      behavior:"smooth",
    })
  }

  let href = window.location.href.split('?')
  if(href.length > 1){
    let query = href[1].split('&')
    for(let i of query){
      if(i.indexOf('a_id') !== -1){
        to(i.split('=')[1])
      }
    }
  }
})