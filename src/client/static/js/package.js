/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: 套餐购买页面
 * @Date: 2022-05-10 11:01:57
 * @LastEditTime: 2022-05-11 13:37:21
 */
//余额套餐
let rechargeMealsData = {


}
//包时套餐
let packTimesData = {

}


// 获取红包数据并渲染下拉菜单
function renderRedPacketList(){
  let redPacketList =[{
    state:3
  }]

}











//切换头部TAb页面 1：余额 2：包时
function changeTab(params, dom) {
  let isCur = $(dom).hasClass("current")
  if (isCur) {
    return;
  }
  $(dom).addClass("current");
  $(dom).siblings().removeClass("current");
  if (params == 1) {
    $("#balancePackage").show();
    $("#packageTime").hide();
  }
  if (params == 2) {
    $("#balancePackage").hide();
    $("#packageTime").show();
  }
}

//切换头部modal的tab页面 1：余额 2：包时
function changeModalTab(params, dom) {
  let isCur = $(dom).hasClass("current")
  if (isCur) {
    return;
  }
  $(dom).addClass("current");
  $(dom).siblings().removeClass("current");
  if (params == 1) {
    $("#calcIpNumber").show();
    $("#calcAmount").hide();
  }
  if (params == 2) {
    $("#calcIpNumber").hide();
    $("#calcAmount").show();
  }
}

//选择预充值金额点击事件
$(document).on("click", '#selectRechargeMeals li', function () {
  console.log(this)
  let $that = $(this);
  let isCur = $that.hasClass("current");
  if (isCur) {
    return;
  }
  //点击-预充更多金额
  if ($that.hasClass("contactUs")) {
    return;
  }
  $that.siblings().removeClass("current");
  $that.addClass("current");
  //获取充值金额
  let payMoney = Number($that.attr("price")).toFixed(2);
  console.log(payMoney)
  $("#rechargeMoney").html(payMoney);
});

//选择IP时效
$(document).on("click", '#selectIPTimes li', function () {
  let $that = $(this);
  let isCur = $that.hasClass("current");
  if (isCur) {
    return;
  }
  $that.siblings().removeClass("current");
  $that.addClass("current");
  //TODO计算总价

});

//选择购买时长
$(document).on("click", '#selectBuyDuration li', function () {
  let $that = $(this);
  let isCur = $that.hasClass("current");
  if (isCur) {
    return;
  }
  $that.siblings().removeClass("current");
  $that.addClass("current");
  //TODO计算总价

});

//支付方式
$(document).on("click", '.payMode li', function () {
  let $that = $(this);
  let isCur = $that.hasClass("current");
  if (isCur) {
    return;
  }
  $that.siblings().removeClass("current");
  $that.addClass("current");
  //TODO计算总价

});