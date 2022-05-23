/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-05-23 17:47:28
 * @LastEditTime: 2022-05-23 18:00:48
 */
/*
 * @Author: 秦琛
 * @LastEditors: 秦琛
 * @description: page description
 * @Date: 2022-03-30 15:58:28
 * @LastEditTime: 2022-03-30 15:58:28
 */
import CryptoJS from "crypto-js";
const AESkey = '3b5949e0c26b8776';
const AESiv = '7a4752a276de9570';
//  需要加密的接口
export const AESAUTH = {
    '/user/forget/password/update': true,  // 忘记密码 修改密码
    '/user/register': true,   // 用户注册
    '/user/update/password': true,   // 修改密码
    '/auth/login': true,  // 登录
    '/auth/registerCode': true,  // 发送注册验证码
    '/auth/sendCode': true,  // 发送短信验证码
    '/auth/zfbAuthCompany': true,  //上传营业执照
    '/auth/zfbAuth': true,  // 支付宝实名认证
    '/auth/zfbAuthCompany': true,  // 企业实名认证
}
// AES加密数据
export const encrypt = function (data) {
    if (!(typeof data === 'string' && data.constructor === String)) {
        data = JSON.stringify(data);
    }
    let sendData = CryptoJS.enc.Utf8.parse(data);
    let key = CryptoJS.enc.Utf8.parse(AESkey);
    let iv = CryptoJS.enc.Utf8.parse(AESiv);
    let encrypted = CryptoJS.AES.encrypt(sendData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

// AES解密数据
export const decrypt = function  (data) {
    let key = CryptoJS.enc.Utf8.parse(AESkey);
    let iv = CryptoJS.enc.Utf8.parse(AESiv);
    let decrypted = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    let i = decrypted.indexOf('\0');
    if (i !== -1) {
        decrypted = decrypted.slice(0, i);
    }
    try {
        decrypted = JSON.parse(decrypted);
    } catch (e) {
        console.log(e);
    }
    return decrypted;
}
