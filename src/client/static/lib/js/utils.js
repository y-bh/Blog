/*
 * @Author: 秦琛
 * @LastEditors: 朱占伟
 * @description: 公共方法
 * @Date: 2022-05-10 18:18:47
 * @LastEditTime: 2022-05-17 17:33:50
 */

// 弹窗消息提示
/*
    params:
        message: 消息文本
        showClose: 控制显示关闭按钮  默认显示x
        type: 消息类型  success/warning/danger
        duration: 消息持续时间
*/

function $message(options = {}) {
  const msg = options.message ? options.message : '出现错误';
  const showClose = options.showClose;
  const type = options.type ? options.type : 'success';
  let duration = options.duration ? options.duration : 4000;

  let timer = null;

  const domTree = "<div class='message_tip'>" +
    "<span>" + msg + "</span>" +
    "<i class='" + (!showClose ? 'icon-none' : 'iconfont icon-close') + "'  onclick='clearMessage()'></i>" +
    "</div>";
  let messageData = $(domTree);



  let typeClass = `message_tip_${type}`;
  // 添加消息类型弹窗class类
  messageData.addClass(typeClass);

  // 先将原始隐藏，然后添加到页面，最后以300毫秒的速度下拉显示出来
  if ($('.message_tip')) {
    $('.message_tip').remove();
    clearTimeout()  // 重置关闭弹出时间
    duration = 4000;
    messageData.hide().appendTo("body").slideDown(300);
  } else {
    messageData.hide().appendTo("body").slideDown(300);

  }



  // 关闭消息提示弹出框
  const closeTip = function () {
    $('.message_tip').show().slideUp(300, function () {
      $('.message_tip').remove();
    })
  }

  // 2秒之后自动删除生成的元素
  timer = window.setTimeout(function () {
    if ($('.message_tip')) {
      closeTip()
    }
    return;
  }, duration);
  // 手动关闭弹窗
  window.clearMessage = function () {
    closeTip();
  }
}

["success", "warning", "error"].forEach(type => {
  $message[type] = options => {
    options.type = type;
    return $message(options)
  }
})



function getParams() {
  var url = decodeURI(location.search);
  var request = {};
  if (url.indexOf("?") !== -1) {
    var str = url.slice(1); //去掉?号
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      //unescape 被弃用  decodeURI来替代
      request[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return JSON.parse(JSON.stringify(request));
}

/**
  * 动态数字方法
  * ID    => 对应ID
  * speed => 递增速度 
  * start:开始数字
  * step：每次递增
  */
function numDynamic(id, start, end, step, speed) {
  var span = document.getElementById(id);
  if (start < end) {
    var i = start;
    var t = setInterval(function () {
      i += step; // 设置每次增加的动态数字，可调整

      if (i >= end) {
        span.innerText = end;
        clearInterval(t);
      } else {
        span.innerText = i;
      }
    }, speed);
  } else {
    span.innerText = start;
  }
}




var converter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};


//设置cookie 
function setCookie(key, value, attributes = {}) {
  if (typeof document === 'undefined') {
    return
  }

  attributes = Object.assign({}, attributes);

  if (typeof attributes.expires === 'number') {
    attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
  }
  if (attributes.expires) {
    attributes.expires = attributes.expires.toUTCString();
  }

  key = encodeURIComponent(key)
    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
    .replace(/[()]/g, escape);

  var stringifiedAttributes = '';
  for (var attributeName in attributes) {
    if (!attributes[attributeName]) {
      continue
    }

    stringifiedAttributes += '; ' + attributeName;

    if (attributes[attributeName] === true) {
      continue
    }

    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
  }

  return (document.cookie =
    key + '=' + converter.write(value, key) + stringifiedAttributes)
}

// 获取cookie
function getCookie(key) {
  if (typeof document === 'undefined' || (arguments.length && !key)) {
    return
  }


  var cookies = document.cookie ? document.cookie.split('; ') : [];
  var jar = {};
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split('=');
    var value = parts.slice(1).join('=');

    try {
      var foundKey = decodeURIComponent(parts[0]);
      jar[foundKey] = converter.read(value, foundKey);

      if (key === foundKey) {
        break
      }
    } catch (e) { }
  }

  return key ? jar[key] : jar
}


//格式化人民币
function moneyFormat(money) {
  return parseFloat(money)
    .toFixed(2)
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .replace(/\,$/, '')
    .split('')
    .reverse()
    .join('')

}

//拖敏感处理手机号码
function mdPhone(phone) {
  if (!phone) return
  let tem = (phone.split(''))
  let inx = 0

  tem = tem.reduce((pre, item, index, arr) => {
    if (index >= 3 && inx <= 3) {
      inx++
      return [...pre, '*']
    } else {
      return [...pre, item]
    }
  }, [])

  return tem.join('')
}

//防抖函数
function debounce(fn, delay, once = false) {
  console.log("经历了防抖")
  var timeout = null;
  var count = 0;
  return function (e) {
    if (once && count === 0) {

      fn.apply(this, arguments);
      count++
      return
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      once && count++
    }, delay);
  };
}


// 格式化时间
function dateFormat(date, fmt = 'YYYY-mm-dd HH:MM:SS') {
  if (Object.prototype.toString(date) !== '[object Date]') {
    date = new Date(date)
  }
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}