import request from '../utils/request'
// https://www.showdoc.com.cn/1459684149519018/8309635758521507
/**
 * 名片编辑详情 small/BusinessCard/style_info_page
 * @param {int} sq_business_card_id 名片id
 */
export function getStyleInfo(data) {
  return request({
    url: '/small/BusinessCard/style_info_page',
    method: 'get',
    data,
  })
}

/**
 * // 设置用户自定义名片图片 small/BusinessCard/set_style_image_customize_image
 * @param {int} style_id require 版式id 极简模式 版式id:4
 * @param {int} style_image_id require 名片图id
 * @param {int} image_url require 自定义名片图
 */
export function setStyleImage(data) {
  return request({
    url: '/small/BusinessCard/set_style_image_customize_image',
    method: 'post',
    data,
    // load: 'noload'
  })
}

/**
 * 获取名片图列表 small/BusinessCard/get_style_image_list
 * @param {int} style_id require 版式id 极简模式 版式id:4
 */
export function getStyleImageList(data) {
  return request({
    url: '/small/BusinessCard/get_style_image_list',
    method: 'get',
    data,
  })
}

/**
 * 设置名片图风格 small/BusinessCard/set_style_info
 * @param {int} type require 2：名片图点击 1:订单
 * @param {int} sq_business_card_id require 名片id
 * @param {int} style_image_id 可选	int	名片图id 2:必选
 * @param {int} order_id 可选	int	订单id 1:必须
 * @param {int} is_name_show require 是否显示名称
 * @param {int} is_avatar_show require 是否显示头像
 * @param {int} is_phone_show require 是否显示手机
 * @param {int} is_profession_show require 是否显示职业
 * @param {int} is_company_show require 是否显示公司
 * @param {int} is_address_show require 是否显示地址
 * @param {int} is_email_show require 是否显示邮箱
 */
export function setStyleInfo(data) {
  return request({
    url: '/small/BusinessCard/set_style_info',
    method: 'post',
    data,
    // load: 'noload'
  })
}

/**
 * 极简模式添加 small/BusinessCard/add_simple_business_card
 * @param {int} name require 名称
 * @param {int} mobile require 手机
 * @param {int} company require 公司名
 * @param {int} profession_id require 职业id
 * @param {int} style_image_id require 名片图id 通过名片图列表获取
 * @param {string} address 公司地址
 */
export function addEasyCard(data) {
  return request({
    url: '/small/BusinessCard/add_simple_business_card',
    method: 'post',
    data,
  })
}

/**
 * 更新名片信息 small/BusinessCard/save_business_card
 * @param {int} sq_business_card_id require 名片id
 * @param {string} name require 名称
 * @param {string} mobile require 手机
 * @param {string} company require 公司名
 * @param {int} profession_id require 职业id
 * @param {string} avatar require 头像
 * @param {string} hometown 是否家乡
 * @param {int} landline 座机
 * @param {string} email 邮箱
 * @param {string} introduce_myself 自我介绍
 * @param {string} label_str 标签id 逗号分割
 * @param {string} vidieo_url 视频地址
 * @param {int} industry_id 行业id
 * @param {string} address 公司地址
 * @param {string} company_avatar 公司头像
 * @param {string} company_introduce 公司介绍
 * @param {array} company_introduce_image_arr 公司介绍图片
 * @param {int} is_public 是否曝光 1:曝光 0：否
 */
export function addCard(data) {
  return request({
    url: '/small/BusinessCard/save_business_card',
    method: 'post',
    data,
  })
}

// 意向度统计 small/BusinessCard/even_log

/**
 * 行业列表 small/Industry/industry_list
 * @param {int} pid 上级id
 */
export function getIndustryList(data) {
  return request({
    url: '/small/Industry/industry_list',
    method: 'get',
    data,
  })
}

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

/**
 * 地址接口 small/Address/get_address_list
 * @param {int} type require 1:省 2:市
 * @param {int} provinceid 省id 类型2 选择
 */
export function getAddressList(data) {
  return request({
    url: '/small/Address/get_address_list',
    method: 'get',
    data,
  })
}