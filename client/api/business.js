import request from '../utils/request'

/**
 * 二维码生成接口
 * @param {string} type 1:团队车源，2:个人车源，3:商品详情，4:帮卖商品详情
 * @param {string} sq_jinzhu_id 商品的金主id type = 4 帮卖用户id
 * @param {string} goods_id require 商品id
 * @param {string} share_user_id 分享用户id，分享的时候加
 */
export function getQRcode(data) {
  return request({
    url: '/small/BusinessCard/info',
    method: 'get',
    data,
    load: 'noload'
  })
}
