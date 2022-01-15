import request from '../utils/request'
/**
 * 订单下单 small/BusinessCardOrder/createOrder
 * @param {int} style_image_id require 名片图id
 */
export function addOrder(data) {
  return request({
    url: '/small/BusinessCardOrder/createOrder',
    method: 'post',
    data,
  })
}