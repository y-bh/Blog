/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: 套餐购买页面
 * @Date: 2022-05-10 11:01:57
 * @LastEditTime: 2022-05-26 14:24:21
 */



//弹框--计算充值金额--计数器--start

//弹框计算IP数量
let timerConter = null; // 定义一个全局的定时器对象变量
$("#calculatorIPNumber").on("input", function () {
  let $that = $(this);
  clearTimeout(timerConter); // 清除上一个定时器
  timerConter = setTimeout(function () {
    let maxVal = 100000;
    let minVal = 1;
    let counterVal = Number($that.val());
    let newVal = counterInputVaild(counterVal, minVal, maxVal);
    $that.val(newVal);
    iPConvertResult(newVal);
  }, 500);
})



function closeIcon() {
  $("#calculatorIPNumber").val("0");
  iPConvertResult(0);
}

// 正整数
const positiveInt = /(^[1-9]\d*$)/;
// counterVal :输入的值 minVal：最小值 maxVal：最大值
function counterInputVaild(counterVal, minVal, maxVal) {
  let newVal = counterVal;
  if (!(positiveInt.test(counterVal) && (counterVal <= maxVal) && (counterVal >= minVal))) {
    if (counterVal > maxVal) {
      Helper.$message.warning({ message: "预充更多金额联系平台客户经理" })
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
$("#rechargeAmountDialog .conterInput").on("input", function () {
  let maxVal = 100000;
  let minVal = 0;
  let counterVal = Number($(this).val());
  let newVal = counterInputVaild(counterVal, minVal, maxVal);
  $(this).val(newVal);
  computerPrice(this, newVal);
})

function computerDialog(type, curDom) {
  let $currentInput = $(curDom).parent().find(".conterInput").eq(0);
  let curVal = parseInt($currentInput.val());
  let maxVal = 100000;
  let minVal = 0;
  let lastNumber = counter(type, curVal, maxVal, minVal, 1);
  $currentInput.val(lastNumber);
  computerPrice(curDom, lastNumber)
}


function computerPrice(curDom, lastNumber) {
  //天启币单价
  let unitPrice = Number($(curDom).closest("li").attr("unitPrice"));
  $(curDom).closest("li").find(".tianqiCoin").eq(0).html(unitPrice * 1000 * parseInt(lastNumber));
  //计算充值金额--总金额
  let allTQiIcoin = 0;
  $("#rechargeAmountDialog").find(".tianqiCoin").each(function (i, item) {
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
  //计算总价
  getPackageTimesPrice();
}


//计数器左右的加减数据计算
function counter(type, curVal, maxVal, minVal, step) {
  //减少
  if (type == 'decrease') {
    if (curVal < minVal) {
      Helper.$message.warning({ message: '提取最少为' + minVal })
      return minVal;
    } else {
      let lastNumber = (curVal - step) > minVal ? curVal - step : minVal;
      return lastNumber;
    }
  }
  //加
  if (type == 'plus') {
    if (curVal > maxVal) {
      Helper.$message.warning({ message: '提取最大为' + maxVal })
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
  let lastNumber = convertMultiple(progressVal, 2000, 5000000, true);
  $("#counter-enter").val(lastNumber)
  $(this).val(lastNumber);
  //计算总价
  getPackageTimesPrice();
})

//conter输入事件
$("#counter-enter").change(function () {
  let counterVal = Number($(this).val());
  let lastNumber = convertMultiple(counterVal, 2000, 5000000);
  $('#formControlRange').val(lastNumber)
  $(this).val(lastNumber);
  //计算总价
  getPackageTimesPrice();
})



// 转换为某个数字的倍数 是倍数
function convertMultiple(number, min, max, tip) {
  let curNum = Number(number)
  if (curNum < Number(min)) {
    return min;
  } else if (curNum > Number(max)) {
    return max;
  }

  let remainder = curNum % Number(min);
  //console.log(43444444444444,remainder)
  if (remainder && !tip) {
    Helper.$message.warning({ message: "提取总数必须是2000的倍数" })
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


$(document).on("click", '#changeTab>div', function () {
  let isCur = $(this).hasClass("current")
  if (isCur) {
    return;
  }
  $(this).addClass("current");
  $(this).siblings().removeClass("current");
  let type = $(this).attr("type");
  sessionStorage.setItem("packageTab", type);//1:余额 2：包时
  if (type == 1) {
    $("#balancePackage").show();
    $("#packageTime").hide();
  }
  if (type == 2) {
    $("#balancePackage").hide();
    $("#packageTime").show();
  }
})

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
  //let payMoney = Number($that.attr("price")).toFixed(2);
  //console.log(payMoney)
  //filterRedPacket(payMoney, 1);
  commonBalancePay();

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
  $queryDom.siblings(".column-list").addClass("hide").removeClass("current");
  $queryDom.removeClass("hide").addClass("current");
  //TODO计算总价
  getPackageTimesPrice();
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
  getPackageTimesPrice();
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

//套餐所有的数据
let packageData = {
  allRedPacket: []//获取所有红包
}

//红包
async function getRedPacket() {
  packageData.allRedPacket = [];
  if (window.isLogin) {
    let params = {
      url: "/redPackage/enabled",
      type: 'get',
      query: null
    };
    let resp = await ajax(params);
    let resArr = resp ? resp : [];
    let allRedPackData = [];
    resArr.forEach(function (item) {
      if (item.state == 3) {
        allRedPackData.push(item)
      }
    })
    packageData.allRedPacket = allRedPackData;
    // $("#balanceRedPacketSelect").show();
    // $("#packTimeRedPacketSelect").show();
  } else {
    $("#balanceRedPacketSelect").hide();
    $("#packTimeRedPacketSelect").hide();
  }
}

//余额套餐计算统一处理
async function commonBalancePay() {
  //余额套餐 -- 初始化选中的价格
  let initPayPice = $("#selectRechargeMeals").find("li.current").attr("price");
  if (window.isLogin) {
    filterRedPacket(initPayPice, 1);
    //包时套餐--- 选中的价格
    // getPackageTimesPrice();
  } else {
    computerBalancePay(initPayPice, 1, false)
    $("#balanceRedPacketSelect").hide();
  }
}

let discount = {
  activitytype: 0,////0：表示没有 1，是折扣 2：增量
}

//获取页面包时套餐--- 选中的总的价格
function getPackageTimesPrice() {
  //单价
  let unitPrice = Number($("#selectIPTimes").find("li.current").attr("price"));
  //时间
  let days = parseInt($("#selectBuyDuration").find("ul.current").find("li.current").attr("days"));

  //数量
  let allNumber = Number($("#counter-enter").val());

  //活动 1：折扣 2 ：赠送
  let $discountDOM = $("#selectBuyDuration").find("ul.current").find("li.current .discount");
  let activitytype = 0;//0：表示没有 1，是折扣 2：增量
  let rate = 0;
  if ($discountDOM.length > 0) {
    activitytype = $discountDOM.attr("activitytype");
    discount.activitytype = activitytype;
    rate = Number($discountDOM.attr("rate"));
    if (activitytype == 2) {
      $("#realIpNum span").html(allNumber + (allNumber * rate / 100));
      $("#realIpNum").show();
      //$(".payMoney-origin").hide();
    } else {
      $("#realIpNum span").html(0);
      $("#realIpNum").hide();
    }
  } else {
    //$(".payMoney-origin").hide();
  }
  //总价
  let totalPrice = unitPrice * allNumber * days;
  //实际价格
  let discountPrice = totalPrice;
  if (activitytype == 1) {
    discountPrice = totalPrice * rate / 100;
    //$(".payMoney-origin").show();
  }
  $("#totalPrice").html(totalPrice.toFixed(2));
  $("#totalPrice").attr("noredprice", discountPrice);
  //红包折扣后的价格,计算满减
  if (window.isLogin) {
    filterRedPacket(discountPrice, 2);
  } else {
    computerBalancePay(discountPrice, 2, false)
    $("#packTimeRedPacketSelect").hide();
  }
}



//过滤红包 lastPayMoney:实际支付的钱 tabType:1,2
function filterRedPacket(payPice, tabType) {
  let allData = packageData.allRedPacket;
  let newArr = [];
  let redPacketDom = "";
  if (allData && allData.length) {
    allData.forEach(function (item) {
      if ((parseInt(payPice) >= parseInt(item.doorsill)) && item.endTime) {
        let duration = parseInt(item.endTime) - parseInt(item.createTime);
        newArr.push({
          id: item.id,
          redPackageName: item.redPackageName,
          doorsill: item.doorsill,//门槛
          money: item.money,
          duration: duration
        })
      }
    })
    console.log("筛选当前元素可用的红包-----", newArr);
    if (newArr.length > 0) {
      // redPacketDom = `<option value="0" minusPrice="0">暂无可用红包</option>`;
      newArr.forEach(function (item) {
        redPacketDom += `<option minusPrice="${item.money}" value="${item.id}" id="${item.id}">满${item.doorsill}减${item.money}</option>`;
      })
      let selectId = newArr[0].id ? newArr[0].id : "0";
      if (tabType == 1) {
        $("#balanceRedPacketSelect select").html(redPacketDom);
        $("#balanceRedPacketSelect select").val(selectId);
        $("#balanceRedPacketSelect").show();
      } else {
        $("#packTimeRedPacketSelect select").html(redPacketDom);
        $("#packTimeRedPacketSelect select").val(selectId);
        $("#packTimeRedPacketSelect").show();
      }

      computerBalancePay(payPice, tabType, true);
    } else {
      redPacketDom = `<option value="0" minusPrice="0">暂无可用红包</option>`;
      if (tabType == 1) {
        $("#balanceRedPacketSelect select").html(redPacketDom);
        // $("#balanceRedPacketSelect").hide();
      } else {
        $("#packTimeRedPacketSelect select").html(redPacketDom);
        // $("#packTimeRedPacketSelect").hide();
      }
      computerBalancePay(payPice, tabType, false);
    }
  } else {
    redPacketDom = `<option value="0" minusPrice="0">暂无可用红包</option>`;
    if (tabType == 1) {
      $("#balanceRedPacketSelect select").html(redPacketDom);
      $("#balanceRedPacketSelect").hide();
      $(".payMoney-origin2").hide();
    } else {
      $("#packTimeRedPacketSelect select").html(redPacketDom);
      $("#packTimeRedPacketSelect").hide();
      $(".payMoney-origin").hide();
    }
    computerBalancePay(payPice, tabType, false);
  }
}


//计算余额套餐价格 payMoney:支付的价格 isHas：是否有红包 tabType:1余额套餐,2包时套餐
function computerBalancePay(payMoney, tabType, isHas) {
  let redPacketMoney = 0; //红包金额
  if (tabType == 1) {//余额套餐
    if (isHas) {
      redPacketMoney = Number($("#balanceRedPacketSelect select").find("option:selected").attr("minusPrice"));
      $(".payMoney-origin2").show();
    } else {
      $(".payMoney-origin2").hide();
    }
    $("#rechargeMoney").html((payMoney - redPacketMoney).toFixed(2));
    $("#totalPrice2").html(Number(payMoney).toFixed(2));
    $("#totalPrice2").attr("noredprice", payMoney);
  } else {//包时套餐
    if (isHas) {
      redPacketMoney = Number($("#packTimeRedPacketSelect select").find("option:selected").attr("minusPrice"));
      $(".payMoney-origin").show();
    } else {
      if (!discount.activitytype) {
        $(".payMoney-origin").hide();
      } else {
        $(".payMoney-origin").show();
      }
    }
    $("#discountPrice").html((payMoney - redPacketMoney).toFixed(2));
    // $("#totalPrice").html(Number(payMoney).toFixed(2));
    // $("#totalPrice").attr("noredprice", payMoney);
  }
}

//余额套餐 --切换红包
$(document).on("change", '#balanceRedPacketSelect select', function () {
  console.log($(this).val());
  //获取充值金额
  let price = Number($("#selectRechargeMeals").find("li.current").attr("price"));
  let minusPrice = Number($("#balanceRedPacketSelect select").find("option:selected").attr("minusPrice"));
  let lastPrice = (price - minusPrice).toFixed(2);
  $("#rechargeMoney").html(lastPrice);
  $("#totalPrice2").html(price.toFixed(2));
  $("#totalPrice2").attr("noredprice", minusPrice);
})

//包时套餐 --切换红包
$(document).on("change", '#packTimeRedPacketSelect select', function () {
  console.log($(this).val());
  //获取充值金额
  //getPackageTimesPrice();
  //未使用红包的价格
  let noRedPrice = Number($("#totalPrice").attr("noRedPrice"));
  let minusPrice = Number($("#packTimeRedPacketSelect select").find("option:selected").attr("minusPrice"));
  let lastPrice = (noRedPrice - minusPrice).toFixed(2);
  $("#discountPrice").html(lastPrice);
})

//预充更多金额
function payMore() {
  window.open("https://wpa1.qq.com/3ys7VwjZ?_type=wpa&qidian=true");
}

//tabType 1:余额 2.包时
async function toPayMoney(tabType) {
  if (window.isLogin) {
    //获取红包
    let redPacketId = 0;

    let payPrice = 0;
    let payType = 2;
    if (tabType == 1) {
      //获取支付价格
      redPacketId = Number($("#balanceRedPacketSelect option:selected").attr("id"));
      payPrice = $("#rechargeMoney").text();
      payType = $("#balancePagPayType").find("li.current").attr("type");
    } else {
      redPacketId = Number($("#packTimeRedPacketSelect option:selected").attr("id"));
      payPrice = $("#discountPrice").text();
      payType = $("#packagePayType").find("li.current").attr("type");
    }

    if (!redPacketId) {
      redPacketId = null;
    }
    let resp = null;
    if (tabType == 1) {
      //调用后台接口生成二维码
      let parmas = {
        payType: "2",//微信
        price: Number(payPrice),
        redRecordId: redPacketId ? redPacketId : null
      }
      if (payType === 'ali') {
        parmas.payType = "1";
        let aliPayParams = {
          url: "/payOrder/recharge",
          type: 'post',
          query: JSON.stringify(parmas)
        }

        localStorage.setItem('TQParams', JSON.stringify(aliPayParams))
        window.open("/payCenter");
        // window.open("/payCenter?params=" + JSON.stringify(aliPayParams));
        // window.open("/jumpTo/jumpTo?buyType=recharge&price=" + parseFloat(payPrice) + "&payType=" + payType + "&redRecordId=" + Number(redPacketId));
      } else {

        //充值接口
        let ajaxData = {
          url: "/payOrder/recharge",
          type: 'post',
          query: JSON.stringify(parmas)
        };
        resp = await ajax(ajaxData);
      }
    } else {
      let meanId = $("#selectBuyDuration").find("ul.current").find("li.current").attr("data-id");
      let total = $("#counter-enter").val();

      let parmas = {
        payType: "2",//微信
        mealId: Number(meanId),
        total: Number(total),
        redRecordId: redPacketId ? redPacketId : null
      }
      if (payType === 'ali') {
        parmas.payType = "1";
        let aliPayParams = {
          url: "/payOrder/buyProxy",
          type: 'post',
          query: JSON.stringify(parmas)
        }
        localStorage.setItem('TQParams', JSON.stringify(aliPayParams))
        window.open("/payCenter");
        // window.open("/payCenter?params=" + JSON.stringify(aliPayParams));
        // window.open("/jumpTo/jumpTo?buyType=buy&mealId=" + parseInt(meanId) + "&payType=" + payType + "&total=" + Number(total) + "&redRecordId=" + Number(redPacketId));
      } else {
        //调用后台接口生成二维码

        //购买套餐接口
        let ajaxData = {
          url: "/payOrder/buyProxy",
          type: 'post',
          query: JSON.stringify(parmas)
        };
        resp = await ajax(ajaxData);
      }
    }

    console.log(222, resp)
    if (resp && resp.payUrl) {
      wxPayFun(resp);
    }

  } else {
    // 记录界面路径，登录完回跳
    let $path = window.location.pathname;
    sessionStorage.setItem('_TQRoutePath', $path)
    window.location.href = '/login'
  }
}


let timer = null;
//微信支付
$('#wxPayModal').on('hidden.bs.modal', function (event) {
  console.log(222222222)
  //关闭定时器
  clearInterval(timer);
  timer = null;
  $('#wxQcCode').html("");
})

function wxPayFun(res) {
  clearInterval(timer);
  //1.生成定时器
  let intTime = 300;
  $("#time-flag").text(intTime);

  timer = setInterval(function () {
    $("#time-flag").html(intTime);
    intTime--;
    if (intTime % 3 === 0) {
      //每3秒轮训查询是否已扫码
      //TODO 接口
      // if(true){
      //   //扫码成功，跳转另一个页面
      //   Helper.$message.success({ message: "支付成功" })
      //   $('#wxPayModal').modal('hide');
      //   parent.location.reload();
      // }

    }
    console.log(intTime);
    if (intTime < 0) {
      //clearInterval(timer);
      //timer = null;
      $('#wxPayModal').modal('hide');
    }

  }, 1000);
  if (timer) {

    $('#wxQcCode').qrcode({
      width: 240,
      height: 240,
      text: res.payUrl,
      colorDark: "#000",
      colorLight: "#fff"
    });
  }
  $('#wxPayModal').modal('show');
}



//动画
new WOW().init();
//初始化
$(async function () {
  let curTab = sessionStorage.getItem("packageTab");
  await getRedPacket();
  console.log("有效的红包-----------", packageData.allRedPacket);
  commonBalancePay();
  getPackageTimesPrice();
  //处理其他页面跳转过来tab
  if (curTab && curTab == 2) {
    $("#packageTab").click();
  }
})