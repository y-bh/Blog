/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: 套餐购买页面
 * @Date: 2022-05-10 11:01:57
 * @LastEditTime: 2022-05-12 14:49:34
 */



//余额套餐
let rechargeMealsData = {


}
//包时套餐
let packTimesData = {

}


// 获取红包数据并渲染下拉菜单
function renderRedPacketList() {
  let redPacketList = [{
    state: 3
  }]

}

//弹框--计算充值金额--计数器--start
let dialogConter = {

}


//弹框计算IP数量
$("#calculatorIPNumber").change(function () {
  let maxVal = 100000;
  let minVal = 1;
  let counterVal = Number($(this).val());
  let newVal = counterInputVaild(counterVal, minVal, maxVal);
  $(this).val(newVal);
  iPConvertResult(newVal);
})

// 正整数
const positiveInt = /(^[1-9]\d*$)/;
// counterVal :输入的值 minVal：最小值 maxVal：最大值
function counterInputVaild(counterVal, minVal, maxVal) {
  let newVal = counterVal;
  if (!(positiveInt.test(counterVal) && (counterVal <= maxVal) && (counterVal >= minVal))) {
    if (counterVal > maxVal) {
      $message.warning({ message: "预充更多金额联系平台客户经理" })
      newVal = maxVal;
    }
    if (counterVal <= minVal) {
      newVal = minVal;
    }
    //不是整数
    if (!positiveInt.test(newVal)) {
      newVal = parseInt(newVal);
    }
  }
  return newVal;
}


//IP数换算结果
function iPConvertResult(inputMoney) {
  let arr = $("#ipConvertResult").find(".comRow")
  arr.each(function (i, item) {
    //获取单价
    let unitprice = Number($(item).attr("unitprice"));
    let iPNumber = Math.floor(inputMoney / unitprice);
    let tianqiNum = inputMoney * 1000;
    $(item).find(".ipNumber").text(iPNumber);
    $(item).find(".tqNumber").text(tianqiNum);
  })
}

//计算充值金额
$("#rechargeAmountDialog .conterInput").change(function () {
  let maxVal = 100000;
  let minVal = 0;
  let counterVal = Number($(this).val());
  let newVal = counterInputVaild(counterVal, minVal, maxVal);
  $(this).val(newVal);
})

function computerDialog(type, curDom) {
  let $currentInput = $(curDom).parent().find(".conterInput").eq(0);
  let curVal = parseInt($currentInput.val());
  let maxVal = 100000;
  let minVal = 0;
  let lastNumber = counter(type, curVal, maxVal, minVal, 1);
  $currentInput.val(lastNumber);
  //天启币单价
  let unitPrice = Number($(curDom).closest("li").attr("unitPrice"));
  $(curDom).closest("li").find(".tianqiCoin").eq(0).html(unitPrice * 1000 * parseInt(lastNumber));
  //计算充值金额--总金额
  let allTQiIcoin = 0;
  $("#rechargeAmountDialog").find(".tianqiCoin").each(function (i, item) {
    console.log(444444, item)
    let tianqiCoin = $(item).text() ? parseInt($(item).text()) : 0;
    allTQiIcoin += tianqiCoin
  })
  $("#all-tianqiCoin").html(allTQiIcoin);
  $("#rMBPay").html(allTQiIcoin / 1000);
}

//弹框--计算充值金额--计数器--end

function computerCounter(type) {
  let curNum = parseInt($("#counter-enter").val());
  let maxVal = 5000000;
  let minVal = 2000;
  let lastNumber = counter(type, curNum, maxVal, minVal, minVal);
  if (lastNumber) {
    $("#counter-enter").val(lastNumber);
  }
}


//计数器左右的加减数据计算
function counter(type, curVal, maxVal, minVal, step) {
  //减少
  if (type == 'decrease') {
    if (curVal < minVal) {
      $message.warning({ message: '提取最少为' + minVal })
      return minVal;
    } else {
      let lastNumber = (curVal - step) > minVal ? curVal - step : minVal;
      return lastNumber;
    }
  }
  //加
  if (type == 'plus') {
    if (curVal > maxVal) {
      $message.warning({ message: '提取最大为' + maxVal })
      return maxVal;
    } else {
      let lastNumber = (curVal + step) > maxVal ? maxVal : curVal + step;
      return lastNumber;
    }
  }
}

//progress移动事件
$('#formControlRange').change(function () {
  let progressVal = Number($(this).val());
  let lastNumber = convertMultiple(progressVal, 2000, 5000000);
  $("#counter-enter").val(lastNumber)
  $(this).val(lastNumber)
})

//conter输入事件
$("#counter-enter").change(function () {
  let counterVal = Number($(this).val());
  let lastNumber = convertMultiple(counterVal, 2000, 5000000);
  $('#formControlRange').val(lastNumber)
  $(this).val(lastNumber)
})



// 转换为某个数字的倍数 是倍数
function convertMultiple(number, min, max) {
  let curNum = Number(number)
  if (curNum < Number(min)) {
    return min;
  } else if (curNum > Number(max)) {
    return max;
  }
  let remainder = curNum / Number(min);
  if (remainder) {
    $message.warning({ message: "提取总数必须是2000的倍数" })
  }
  let multiple = parseInt(curNum / Number(min));
  return multiple * min;
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
  //切换选择购买时长
  let dataId = $that.attr("data-id");
  let $queryDom = $("#selectBuyDuration").find(".column-list[meal-duration-id='" + dataId + "']");
  $queryDom.siblings(".column-list").addClass("hide");
  $queryDom.removeClass("hide");
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