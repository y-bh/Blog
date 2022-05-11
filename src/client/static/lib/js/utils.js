/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: 公共方法
 * @Date: 2022-05-10 18:18:47
 * @LastEditTime: 2022-05-11 15:10:20
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
    const duration = options.duration ? options.duration : 4000;

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
    console.log(messageData,'messageData');
    if($('.message_tip')){
        $('.message_tip').remove();
        clearTimeout(timer)  // 重置关闭弹出时间
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

