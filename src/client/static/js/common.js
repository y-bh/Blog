/*
 * @Author: 秦琛
 * @LastEditors: liyuntao
 * @description: 公共方法
 * @Date: 2022-05-10 18:18:47
 * @LastEditTime: 2022-05-30 14:41:08
 */

function Helper() { }

//确认操作框信息
Helper.$confirm = (msg = '确认此操作?', title = '', callback, options = {}
) => {
  const config = Object.assign({
    callback, //回调函数处理
    title: '提示',
    cancelText: '取消',
    okText: '确定',
    ...options,
  })
  const eventName = +Date.now() + '_$confirm'
  const htmls = `
  <div class="modal" tabindex="-1" id="bootstrap-my-modal">
    <div class="modal-dialog login-out">
        <div class="modal-content">
          <div class="dialog-modal-title">
            <div class="bg"></div>
            <div class="bg"></div>
            <div class="bg"></div>
            <div class="bg"></div>
            <div class="bg"></div>
            <div class="title-text">${title || config.title}</div>
          </div>
          <div class="modal-body">
            ${msg}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary bl-button button" data-dismiss="modal">
              <span>${config.cancelText} </span>
            </button>
            <button type="button" class="btn btn-primary or-button button" onclick="window.$ok('${eventName}')">
              <span>${config.okText}</span>
            </button>
          </div>
        </div>
    </div>
  </div>  
`
  if (!$("#bootstrap-my-modal").html()) {
    $(htmls).appendTo("body")
  }
  //注册回调
  window[eventName] = callback

  $('#bootstrap-my-modal').modal('show')
}


window.$ok = function (eventName) {

  window[eventName]()
  window[eventName] = null
  $('#bootstrap-my-modal').modal('hide')
}


// 弹窗消息提示
/*
    params:
        message: 消息文本
        showClose: 控制显示关闭按钮  默认显示x
        type: 消息类型  success/warning/danger
        duration: 消息持续时间
*/
Helper.$message = (options = {}) => {
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
  Helper.$message[type] = options => {
    options.type = type;
    return Helper.$message(options)
  }
})


//获取cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//客户端ajax二次 封装

/*
    params:
        url: 接口地址
        type: 接口类型, 默认post  get/post/put
        query: 参数
*/
async function ajax(params, prex = '/javaProxy') {
  let baseURL = '';
  if (params.url && params.url.slice(0, 1) !== "/") {
    baseURL = '/' + params.url
  } else {
    baseURL = params.url
  }
  return new Promise(function (resolve, reject) {
    let token = getCookie('TQ-TOKEN')
    $.ajax({
      type: params.type ? params.type : 'POST',
      url: `${prex}${baseURL}`,
      contentType: 'application/json',
      data: params.query,

      beforeSend: function (request) {
        console.log("发送请求前判断token:", token)
        if (token) {
          request.setRequestHeader("TQ-TOKEN", token);
        }
      },
      success: (res) => {
        if (res) {
          if (res.code !== 200) {
            Helper.$message.error({
              message: res.message ? res.message : '接口异常'
            })
            return Promise.resolve(res)
          } else {
            resolve(res.data);
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

//跳转咨询
function contactUs() {
  window.open("https://wpa1.qq.com/Lkz12X21?_type=wpa&qidian=true", "_blank");
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
window.getParams = getParams

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
  if (width <= 775) {
    size = 16
  }
  size = Math.round(size)
  // 推广页方案与全局方案冲突,优先采用推广页自己的方案
  if (window.location.pathname !== '/promotion') {
    document.documentElement.style.fontSize = `${size}px`
  }

}

//退出登录
function layout() {
  Helper.$confirm("确定退出登录?", '退出', function () {
    $.ajax({
      type: 'POST',
      url: "/api/layout",
      data: null,
      dataType: 'json',
      contentType: 'application/json',
      success: (res) => {

        if (+res.code !== 200) {
          return Helper.$message({
            message: res.message || '退出登录失败!',
            type: 'warning'
          })

        }

        Helper.$message({ message: '退出登录' })

        return location.href = "/login"
      },
      error: (err) => {

      }
    });

  })
}

window.layout = debounce(layout, 300, true)


//套餐页跳转
function jumpPackage(type) {
  //sessionStorage.setItem("packageTab", type);//1:余额 2：包时
  if (type && type == 2) {
    window.location.href = "/package?type=package";
  } else {
    window.location.href = "/package";
  }
}

//公共头部 导航切换效果
let resizeTimer = null;
let headerAttr = {
  allWidth: 0,
  mainWidth: 0,  // 所有导航子元素加起来的宽度
  itemWidth: 0,  // 导航子元素宽度 + padding + margin
  logoWidth: 0,  // logo区域宽度
  navRightWidth: 0,  // 右侧登陆注册区域宽度
  navWidth: [], // 子元素tab的宽度数组
}
function toggleHead() {
  // 每次调用重置
  headerAttr = {
    allWidth: 0,
    mainWidth: 0,  // 所有导航子元素加起来的宽度
    itemWidth: 0,  // 导航子元素宽度 + padding + margin
    logoWidth: 0,  // logo区域宽度
    navRightWidth: 0,  // 右侧登陆注册区域宽度
  }

  let windowWidth = $(window).width();
  headerAttr.logoWidth = $('.header-main .logo').outerWidth(true);
  headerAttr.navRightWidth = $('.header-main .user').outerWidth(true);

  const domTree = $('.header-main .nav-list .nav-item');
  domTree.each(function (index) {
    headerAttr.itemWidth = $(this).outerWidth(true);
    headerAttr.mainWidth += headerAttr.itemWidth
  })

  headerAttr.allWidth = headerAttr.logoWidth + headerAttr.navRightWidth + headerAttr.mainWidth;
  // 可视化区域小于内容区域总宽度
  if (windowWidth <= headerAttr.allWidth) {
    // 导航区域折叠
    $('.nav-body').addClass('fold');
    // 多态按钮显示
    $('.nav-toggler').addClass('appear')
    getTabWidth()
  } else {
    $('.nav-body').removeClass('fold')
    $('.nav-toggler').removeClass('appear')
    getTabWidth()
  }
}

function getTabWidth() {
  //  小屏获取导航元素
  headerAttr.navWidth = [];
  if ($('.show')) {
    let tabNav = $('.show .nav-item');
    tabNav.each(function (index) {
      if ($(this)) {
        headerAttr.navWidth.push($(this).outerWidth(true))
      }
    })

    headerAttr.navWidth.sort((a, b) => {
      return b - a
    })
    //  将每个一级导航宽度以最大子元素宽为准设置
    $('.show .nav-item').css("width", headerAttr.navWidth[0])
  } else {
    $('.nav-list .nav-item').css("width", auto)
  }

}


//初始化短链处理效果
function handleParams() {
  //关于注册短链
  const query = getParams()
  // 推过短链进入场景
  const from = query.from || null
  const keyword = query.keyword || null
  const did = query.did || null

  if (did) {
    setCookie('did', did, 30)
    localStorage.setItem('did', did)

    if (from && from === 'seller') {
      setCookie('from', 'seller', 30)
      localStorage.setItem('from', from)
    } else {
      setCookie('from', '', 30)
      localStorage.setItem('from', '')
      if (keyword) {
        setCookie('keyword', keyword, 30)
        localStorage.setItem('keyword', keyword)
      }
    }
  }



}
/**********************************************页面初始化**************************** */
$(function () {
  // 1.公共导航
  let routePath = (window.location.pathname.replace(/\//g, '') || 'index');  // 路径
  if ($(`[data-path=${routePath}]`)) {
    $(`[data-path=${routePath}]`).addClass('activated').siblings().removeClass('activated');
  }

  //切换导航效果
  toggleHead();

  //点击导航效果
  $('.nav-toggler').click(function () {
    if ($('.header-main .nav-body').hasClass('show')) {
      $('.header-main .nav-body').removeClass('show')
    } else {
      $('.header-main .nav-body').addClass('show');
      const margin = $('.header-main .user').width() + 12;  // 12: 右侧user区域的padding
      $('.header-main .nav-body .nav-list').addClass('adjust_position').css("margin-right", margin);
      // getTabWidth()

    }
    getTabWidth()

  })


  //2.自适应布局计算
  change()


  //3. 处理注册短链
  handleParams()


  $(window).resize(debounce(() => {
    //1. 重新计算布局
    change()

    //处理header
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    // //再重新开始下一轮等待
    resizeTimer = setTimeout(function () {
      toggleHead();
    }, 200);
  }, 500))
})


$(function () {
  let path = window.location.pathname
  //排除
  const ext = ['/reset', '/register', '/login']
  if (ext.includes(path)) {
    path = "/manager/user"
  }

  $('a#user-login').attr('href', '/login' + `?back=${path}`)
})