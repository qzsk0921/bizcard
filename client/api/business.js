import request from '../utils/request'
// https://www.showdoc.com.cn/1459684149519018/8309635758521507
/**
 * 生成二维码 small/UserCardList/q_code
 * @param {int} type require 1:名片详情
 * @param {int} b 名片id 名片详情时必选
 * @param {int} s 分享者ID
 */
export function getQRcode(data) {
  return request({
    url: '/small/BusinessCard/q_code',
    method: 'post',
    data,
    load: 'noload'
  })
}

// 协议
export function getAgreement(data) {
  return request({
    url: '/usershare/RulePage/info',
    method: 'get',
    data
  })
}