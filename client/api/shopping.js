import request from '../utils/request'

/**
 * 商品列表 small/Shop/goods_list
 * @param {int} sq_business_card_id require 名片id
 */
export function getGoodList(data) {
  return request({
    url: '/small/Shop/goods_list',
    method: 'get',
    data,
  })
}