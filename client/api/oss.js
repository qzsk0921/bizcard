import request from '../utils/request'
// 七牛云
/**
 * 获取七牛云token small/QiNiu/get_up_token
 */
export function getQnToken(data) {
  return request({
    url: '/small/QiNiu/get_up_token',
    method: 'get',
    data
  })
}

/**
 * 七牛云删除接口 small/QiNiu/del_file
 * @param {string} key require 文件名
 */
export function deleteQnFile(data) {
  return request({
    url: '/small/QiNiu/del_file',
    method: 'get',
    data
  })
}