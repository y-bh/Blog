/*
 * @Author: 秦琛
 * @LastEditors: 陈昊天
 * @description: 不走dao层的ajax接口封装
 * @Date: 2022-05-11 16:24:43
 * @LastEditTime: 2022-05-17 17:07:04
 */

/*
    params:
        url: 接口地址
        type: 接口类型, 默认post  get/post/put
        query: 参数
*/ 

// 需要加密的接口
// const aesURL = {

// }

async function ajax(params) {
    return new Promise(function (resolve, reject) {
        console.log(params.query,'接口参数');
        $.ajax({
            type: params.type ? params.type : 'POST',
            url: 'http://192.168.10.62:17001/' + params.url,
            // url: 'http://192.168.12.213:17001/' + params.url, //孙翔宇地址
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