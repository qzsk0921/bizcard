import request from '../utils/request'
// 名片编辑详情 small/BusinessCard/style_info_page
// 设置用户自定义名片图片 small/BusinessCard/set_style_image_cu
/**
 * 获取名片图列表 small/BusinessCard/get_style_image_list
 * @param {int} style_id require 版式id 极简模式 版式id:4
 */
export function getStyleList(data) {
  return request({
    url: '/small/BusinessCard/get_style_image_list',
    method: 'get',
    data,
  })
}
// 设置名片图风格 small/BusinessCard/set_style_info

/**
 * 极简模式添加 small/BusinessCard/add_simple_business_card
 * @param {int} name require 名称
 * @param {int} mobile require 手机
 * @param {int} company require 公司名
 * @param {int} profession_id require 职业id
 * @param {int} style_image_id require 名片图id 通过名片图列表获取
 */
export function addEasyCard(data) {
  return request({
    url: '/small/BusinessCard/add_simple_business_card',
    method: 'post',
    data,
  })
}

// 更新名片信息 small/BusinessCard/save_business_card
// 意向度统计 small/BusinessCard/even_log
// 行业列表 small/Industry/industry_list

/**
 * 职业列表 small/Profession/profession_list
 * @param {int} pid require 上级职业id
 */
export function getProfessionList(data) {
  return request({
    url: '/small/Profession/profession_list',
    method: 'get',
    data,
  })
}