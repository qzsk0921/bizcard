// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

// 用户授权
/**
 * 登录接口
 * @param {string} code require 小程序code
 * @returns {string} token 
 */
export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data,
    load: 'noload'
  })
}

/**
 * 更新微信信息
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
    url: '/login/update',
    method: 'post',
    data
  })
}

/**
 * 更新微信手机
 * @param {string} encryptedData require 微信加密数据
 * @param {string} iv require 微信解密key
 * @param {int} sale_id 业务员分享带过来的业务员id
 */
export function updatePhone(data) {
  return request({
    url: '/login/update_phone',
    method: 'post',
    data
  })
}

/**
 * 用户详情
 */
export function getUserDetail() {
  return request({
    url: '/user/get_user_info',
    method: 'get',
    load: 'noload'
  })
}