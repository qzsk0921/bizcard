import request from '../utils/request'

/**
 * 评论列表 small/Comment/comment_list
 * @param {int} pid 上级评论id
 * @param {int} sq_business_card_id 名片id
 */
export function getCommentList(data) {
  return request({
    url: '/small/Comment/comment_list',
    method: 'get',
    data,
  })
}

/**
 * 评论点赞 small/Comment/zan
 * @param {int} type require 1:赞 0:不赞
 * @param {int} sq_business_card_id 名片id
 */
export function setCommentZan(data) {
  return request({
    url: '/small/Comment/zan',
    method: 'get',
    data,
  })
}

/**
 * 添加评论 small/Comment/add_comment
 * @param {int} pid 上级评论id
 * @param {int} sq_business_card_id require 名片id
 * @param {sting} comment require 评论内容
 * @param {int} score require 评分
 */
export function addComment(data) {
  return request({
    url: '/small/Comment/add_comment',
    method: 'post',
    data,
  })
}