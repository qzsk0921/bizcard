// https://www.showdoc.com.cn/1459684149519018/8309877398396858 Xczm190410
import request from '../utils/request'

// 用户授权
/**
 * 登陆 small/Login/login
 * @param {string} code require 小程序code
 * @returns {string} token 
 */
export function login(data) {
  return request({
    url: '/small/Login/login',
    method: 'post',
    data,
    // load: 'noload'
  })
}

/**
 * 更新用户信息 small/Login/update
 * @param {string} nickName 昵称
 * @param {string} avatarUrl 头像
 * @param {string} gender 性别 0-未知，1-男，2-女
 * @param {string} province 省
 * @param {string} city 市
 * @param {string} country 国家
 * @param {string} language 语言
 */
export function updateUserInfo(data) {
  return request({
    url: '/small/Login/update',
    method: 'post',
    data
  })
}

/**
 * 更新手机 small/Login/update_phone
 * @param {string} encryptedData require 微信加密数据
 * @param {string} iv require 微信解密key
 */
export function updatePhone(data) {
  return request({
    url: '/small/Login/update_phone',
    method: 'post',
    data
  })
}

/**
 * 获取用户详情
 */
export function getUserDetail() {
  return request({
    url: '/small/User/get_user_info',
    method: 'get',
    load: 'noload'
  })
}