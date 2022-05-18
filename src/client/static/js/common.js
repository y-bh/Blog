/*
 * @Author: 秦琛
 * @LastEditors: 朱占伟
 * @description: 公共方法
 * @Date: 2022-05-10 18:18:47
 * @LastEditTime: 2022-05-18 13:01:23
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



//客户端ajax二次 封装

/*
    params:
        url: 接口地址
        type: 接口类型, 默认post  get/post/put
        query: 参数
*/
async function ajax(params) {
  return new Promise(function (resolve, reject) {
    console.log(params.query, '接口参数');
    $.ajax({
      type: params.type ? params.type : 'POST',
      url: 'http://192.168.10.62:17001/' + params.url,
      contentType: 'application/json',
      data: params.query,
      success: (res) => {
        if (res) {
          if (res) {
            console.log(res, 'res');
            if (res.code !== 200) {
              $message.error({
                message: res.message ? res.message : '接口异常'
              })
              resolve(false)
            } else {
              resolve(res.data);
            }
          } else {
            reject('请求失败')
          }
        } else {
          reject('请求失败')
        }
      },
      error: (err) => {
        reject(err)
      }
    });
  })
}



//获取location 地址栏query查询参数
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


//自适应计算
function change() {
  var width = $(window).width();
  //是否是小于425的小屏幕，供移动端导航使用
  window.isMobile = (width <= 575)
  window.viewWidth = width;
  var size = `${(width / 1920) * 16}`
  if (size <= 8) {
    size = 8
  }
  size = Math.round(size)
  // 推广页方案与全局方案冲突,优先采用推广页自己的方案
  if (window.location.pathname !== '/promotion') {
    document.documentElement.style.fontSize = `${size}px`
  }

}

//退出登录
function layout() {
  console.log("退出登录!")
  $.ajax({
    type: 'POST',
    url: "/api/layout",
    data: null,
    dataType: 'json',
    contentType: 'application/json',
    success: (res) => {
      console.log("退出登录结果:", res)
      if (+res.code !== 0) {
        return $message({
          message: res.msg || '退出登录失败!',
          type: 'warning'
        })

      }

      $message({ message: '退出登录' })

      return window.open("/login")
    },
    error: (err) => {
      console.log("接口请求失败:", err)
    }
  });


}

window.layout = debounce(layout, 300, true)



//初始化效果
$(function () {

  //1.自适应布局计算
  change()

  $(window).resize(debounce(() => {
    change()
  }, 500))

})
