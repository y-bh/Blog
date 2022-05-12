/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 公共方法
 * @Date: 2022-05-10 18:18:47
 * @LastEditTime: 2022-05-12 10:40:08
 */

// 弹窗消息提示
/*
    params:
        message: 消息文本
        showClose: 控制显示关闭按钮  默认显示x
        type: 消息类型  success/warning/danger
        duration: 消息持续时间
*/

function $message (options = {}){
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
    if($('.message_tip')){
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
        if($('.message_tip')){
            closeTip()
        }
        return;
    }, duration);
    // 手动关闭弹窗
    window.clearMessage = function (){
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

