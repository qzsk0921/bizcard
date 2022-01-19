import request from '../utils/request'

/**
 * 名片夹列表 small/UserCardList/card_list
 * @param {string} keyword require 搜索词
 */
export function getCardList(data) {
  return request({
    url: '/small/UserCardList/card_list',
    method: 'get',
    data,
  })
}

/**
 * 名片夹删除 small/UserCardList/card_del
 * @param {array} ids require 名片夹id
 */
export function delCardList(data) {
  return request({
    url: '/small/UserCardList/card_del',
    method: 'post',
    data,
  })
}

/**
 * 名片消息列表 small/UserCardList/message_list
 */
export function getCardMsgList(data) {
  return request({
    url: '/small/UserCardList/message_list',
    method: 'get',
    data,
  })
}


/**
 * 未读消息数 small/UserCardList/message_list_total
 */
export function getCardMsgNum(data) {
  return request({
    url: '/small/UserCardList/message_list_total',
    method: 'get',
    data,
  })
}

/**
 * 名片雷达 small/BusinessCard/get_card_total_list
 */
export function getCardRadarList(data) {
  return request({
    url: '/small/BusinessCard/card_total_list',
    method: 'get',
    data,
  })
}

/**
 * 收下名片 small/UserCardList/save_business_card
 * @param {int} message_id require 消息id
 */
export function getCard(data) {
  return request({
    url: '/small/UserCardList/save_business_card',
    method: 'post',
    data,
    // load: 'noload'
  })
}