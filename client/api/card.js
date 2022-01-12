import request from '../utils/request'

/**
 * 名片详情 small/BusinessCard/info
 * @param {int} type require 1:自己 2:他人
 * @param {int} sq_business_card_id 他人的名片id
 */
export function getCardDetail(data) {
  return request({
    url: '/small/BusinessCard/info',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 名片赞 small/BusinessCard/zan
 * @param {int} type require 1:赞 0:取消赞
 * @param {int} sq_business_card_id require 名片id
 */
export function setCardZan(data) {
  return request({
    url: '/small/BusinessCard/zan',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 名片标签赞 small/BusinessCard/label_zan
 * @param {int} type require 1:赞 0:取消赞
 * @param {int} sq_business_card_id require 名片id
 * @param {int} user_new_label_id require 用户标签id
 */
export function setCardLabelZan(data) {
  return request({
    url: '/small/BusinessCard/label_zan',
    method: 'post',
    data,
  })
}

/**
 * 点击同乡 small/BusinessCard/fellow_townsman
 * @param {int} type require 1:同乡 0:取消同乡
 * @param {int} sq_business_card_id require 名片id
 */
export function setTownsman(data) {
  return request({
    url: '/small/BusinessCard/fellow_townsman',
    method: 'post',
    data,
  })
}

/**
 * 回递名片 small/UserCardList/send_business_card
 * @param {string} remark require 备注
 * @param {int} sq_business_card_id require 名片id
 */
export function returnCard(data) {
  return request({
    url: '/small/UserCardList/send_business_card',
    method: 'post',
    data,
  })
}

// -----------------------
/**
 * 名片编辑详情(style_id对应版式清单) small/BusinessCard/style_info_page
 * @param {int} sq_business_card_id 他人的名片id
 */
export function getStyleInfo() {
  return request({
    url: '/small/BusinessCard/style_info_page',
    method: 'get',
  })
}