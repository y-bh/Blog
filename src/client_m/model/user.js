/*
 * @Author: liyuntao
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-13 16:36:57
 * @LastEditTime: 2022-05-22 16:31:41
 */
import service from 'tools/ajax.js';
const api = require("config/api.config.js")


/**
 * @Date: 2022-05-13 16:37:34
 * @LastEditTime: LiYuntao
 * @description: 更新用户信息
 * @param {*} params
 * @return {*}
 */
export const updateUserInfo = async (params = null) => {
  try {
    const res = await service.post(api.MANAGER_USER_UPDATE_INFO, params);
    return res;
  } catch (error) {
    console.error('getTest', error);
    return Promise.resolve(null);
  }
};

//查询用户信息
export const getMineInfo = async (params = null) => {
  try {
    const res = await service.post(api.POST_AUTH_GETMINEINFO);
    return res;
  } catch (error) {
    console.error('getMineInfo', error);
    return Promise.resolve(null);
  }
};
//企业认证上传文件
export const companyImg = async (params = null) => {
  try {
    const res = await service.post(api.POST_AUTH_COMPANYIMG, params);
    return res;
  } catch (error) {
    console.error('auth/companyImg', error);
    return Promise.resolve(null);
  }
};
//支付宝实名认证--个人
export const zfbAuth = async (params = null) => {
  try {
    const res = await service.post(api.POST_AUTH_ZFBAUTH, params);
    return res;
  } catch (error) {
    console.error('auth/zfbAuth', error);
    return Promise.resolve(null);
  }
};
//支付宝实名结果--个人
export const getAuthResult = async (params = null) => {
  try {
    const res = await service.get(api.GET_AUTH_GETAUTHRESULT + "?transferId=" + params);
    return res;
  } catch (error) {
    console.error('getAuthResult', error);
    return Promise.resolve(null);
  }
};
//支付宝实名认证--企业
export const zfbAuthCompany = async (params = null) => {
  try {
    const res = await service.post(api.POST_AUTH_ZFBAUTHCOMPANY, params);
    return res;
  } catch (error) {
    console.error('auth/zfbAuthCompany', error);
    return Promise.resolve(null);
  }
};
//修改手机号码-获取验证码
export const phoneGetCode = async (params = null) => {
  try {
    const res = await service.post(api.POST_USER_PHONEGETCODE, params);
    return res;
  } catch (error) {
    console.error('phone/getCode', error);
    return Promise.resolve(null);
  }
};
//修改手机号码
export const updatePhone = async (params = null) => {
  try {
    const res = await service.post(api.POST_USER_UPDATEPHONE, params);
    return res;
  } catch (error) {
    console.error('update/phone', error);
    return Promise.resolve(null);
  }
};
//修改密码
export const updatePassword = async (params = null) => {
  try {
    const res = await service.post(api.POST_USER_UPDATEPWD, params);
    return res;
  } catch (error) {
    console.error('update/password', error);
    return Promise.resolve(null);
  }
};