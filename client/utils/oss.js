// https://sharepuls.xcmbkj.com
import {
  deleteQnFile
} from '../api/oss'
import config from '../config/index'
let count = 0,
  urlArr = []
/**
 * 图片上传七牛云
 */
const url = config.qnUpdateUrl

const qiniuTools = {
  uploadQiniu(tempFilePaths, token, resolve, reject) {
    // return new Promise((resolve, reject) => {
    // if (!tempFilePaths.length) reject('empty')
    uploadFile(tempFilePaths, token, resolve, reject)
    // })
  },
  deleteQiniu(fileUrl) {
    // 删除多个文件
    fileUrl.forEach((file, index) => {
      // const re = /[\w]\/[\w]\S*[.]\w+/
      const re = /[\w]\/[\w]\S*/
      //获取图片名
      const key = file.match(re)[0].split("/")[1]
      deleteQnFile({
        key
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    });
  }
}

function uploadFile(tempFilePaths, token, resolve, reject) {
  let tempFilePath = null

  if (typeof tempFilePaths === 'object') {
    console.log('tempFilePaths is object')
    tempFilePath = tempFilePaths[count].url
      ++count
  } else {
    console.log('tempFilePaths is single')
    tempFilePath = tempFilePaths
  }

  wx.showLoading({
    title: ''
  })

  wx.uploadFile({
    url,
    name: 'file',
    filePath: tempFilePath,
    // header: {
    //   "Content-Type": "multipart/form-data"
    // },
    formData: {
      token,
    },
    success: function (res) {
      // to do ...
      console.log(res)

      if (typeof tempFilePaths === 'object') {
        urlArr.push(config.qnUrl + JSON.parse(res.data).key)
        // 多文件上传
        if (count >= tempFilePaths.length) {
          console.log('All uploaded successfully')
          resolve(urlArr)
        }
      } else {
        // 单文件上传
        console.log('single uploaded successfully')
        resolve(config.qnUrl + JSON.parse(res.data).key)
      }
    },
    fail: function (res) {
      console.log(res)
      reject(res)
    },
    complete(res) {
      wx.hideLoading()
      console.log('complete')
      console.log(res)
      if (typeof tempFilePaths === 'object') {
        if (count >= tempFilePaths.length) {
          // 还原数据
          count = 0
          urlArr = []
        } else {
          // qiniuTools.uploadQiniu(tempFilePaths, token, resolve, reject).then(res => {
          //   resolve(res)
          // })
          qiniuTools.uploadQiniu(tempFilePaths, token, resolve, reject)
        }
      }
    }
  })

}

// ((tempFilePaths, token) => {
//   console.log(389382)
//   console.log(tempFilePaths[count].url)
//   wx.uploadFile({
//     url,
//     name: 'file',
//     filePath: tempFilePaths[count].url,
//     header: {
//       "Content-Type": "multipart/form-data"
//     },
//     formData: {
//       token,
//     },
//     success: function (res) {
//       // to do ...
//       console.log(res)
//       urlArr.push(res)
//         ++count
//       if (tempFilePaths.length > 1) {
//         // 多文件上传
//         if (count === tempFilePaths.length) {
//           console.log('All uploaded successfully')
//           resolve(urlArr)
//         }
//       } else {
//         // 单文件上传
//         console.log('All uploaded successfully')
//         resolve(urlArr)
//       }
//     },
//     fail: function (res) {
//       ++count
//       console.log(res)
//       reject(res)
//     },
//     complete(res) {
//       // console.log(res)
//       if (count >= tempFilePaths.length) {
//         count = 0
//         urlArr = []
//       } else {
//         qiniuTools.uploadQiniu(tempFilePaths, token).then(res => {
//           resolve(res)
//           // 还原数据
//           count = 0
//           urlArr = []
//         })
//       }
//     }
//   })
// })(tempFilePaths, token)

export default qiniuTools