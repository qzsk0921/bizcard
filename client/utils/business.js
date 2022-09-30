import config from '../config/index'
/**
 * 自定义tabbar
 * @param {array} list 
 * @param {number} selected 
 */
export function setTabBar({
  selected = 0,
  list = config.tabBar.list,
} = {}, func) {
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {

    this.getTabBar().setData({
      selected,
      list
    })

    if (func) func()
  }
}


function getLocalImg(url) {
  return new Promise(resolve => {
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log(res)
        // 保存到本地
        // res = res.path;
        resolve(res)
      }
    })
  })
}
// 版式1
async function drawCanvas1(that, drawData) {
  const canvasWidth = 420,
    canvasHeight = 336
  // 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 canvas ，如果省略则不在任何自定义组件内查找
  const ctx = wx.createCanvasContext('canvas', that);
  // 背景色
  ctx.setFillStyle('#ffffff');
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 绘制背景
  const cardImageInfo = await getLocalImg(drawData.card_style.card_image)
  ctx.drawImage(cardImageInfo.path, 0, 0, 420, 244);
  // 公司 必须
  ctx.save(); // 先保存状态 已便于画完再用
  ctx.setFontSize(16)
  ctx.setFillStyle(drawData.card_style.company_color);
  ctx.fillText(drawData.card_info.company, 24, 26 + 8);
  // 姓名 必须
  ctx.setFontSize(28)
  ctx.setFillStyle(drawData.card_style.name_color);
  ctx.fillText(drawData.card_info.name, 24, 60 + 14);
  // 职位 必须
  if (drawData.card_info.profession) {
    ctx.setFontSize(13)
    ctx.setFillStyle(drawData.card_style.profession_color);
    ctx.fillText(drawData.card_info.profession, 24, 102 + 6);
  }
  // 电话 必须
  if (drawData.card_info.mobile) {
    const imgInfo = await getLocalImg(drawData.card_style.phone_image)
    ctx.setFontSize(18)
    ctx.setFillStyle(drawData.card_style.phone_color);
    if (drawData.card_info.address) {
      ctx.drawImage(imgInfo.path, 26, 167 - imgInfo.height / 2 / 2, imgInfo.width / 2, imgInfo.height / 2);
      ctx.fillText(drawData.card_info.mobile, 46, 166 + 9);
    } else {
      ctx.drawImage(imgInfo.path, 26, 198 - imgInfo.height / 2 / 2, imgInfo.width / 2, imgInfo.height / 2);
      ctx.fillText(drawData.card_info.mobile, 46, 198 + 9);
    }
  }
  // 地址 非必须
  if (drawData.card_info.address && drawData.card_style.is_address_show) {
    const imgInfo = await getLocalImg(drawData.card_style.address_image)
    ctx.drawImage(imgInfo.path, 26, 198 - imgInfo.height / 2 / 2, imgInfo.width / 2, imgInfo.height / 2);
    ctx.setFontSize(14)
    ctx.setFillStyle(drawData.card_style.address_color);
    ctx.fillText(drawData.card_info.address, 46, 198 + 7);
  }
  // 保存按钮
  ctx.drawImage('/assets/images/btn.png', 0, 244, 420, 92);

  ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制

  // 绘制头像
  // ctx.save(); // 先保存状态 已便于画完圆再用
  // ctx.beginPath(); //开始绘制

  // const avatarWidth = 66; // 头像宽度
  // const avatarCenterY = 86; // 头像中心Y坐标
  // ctx.arc(canvasWidth / 2, avatarCenterY, avatarWidth / 2, 0, Math.PI * 2, false);
  // ctx.setFillStyle('#eeeeee');
  // ctx.fill();
  // ctx.clip();
  // ctx.drawImage(localImgInfo['avatarUrl'] || avatarUrl, (canvasWidth - avatarWidth) / 2, avatarCenterY - avatarWidth / 2, avatarWidth, avatarWidth);
  // ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制


  // 兼容ios measureTest取到的width为0 +''
  // const width = ctx.measureText(offer + '').width
  // ctx.setFontSize(28);
  // ctx.fillText('万', width + 45, 861);

  // 将文字绘制到行 长文本自动换行 并返回行数
  /*
   * params
   * @text           需要绘制的文本字符
   * @startX         第一行文本的起始X坐标
   * @startY         第一行文本的起始Y坐标
   * @lineHeight     文本行高
   * @MAX_WIDTH      单行文字最大宽度，超过临界值自动换行
   *
   * return rowLength  返回绘制文本的行数
   * */
  // function drawText(text, startX, startY, lineHeight, MAX_WIDTH) {
  //   let allAtr = text.split('');
  //   let rowArr = []; // 拆分出来的每一行
  //   let rowStrArr = []; // 每一行的文字数组
  //   for (let i = 0; i < allAtr.length; i++) {
  //     const currentStr = allAtr[i];
  //     rowStrArr.push(currentStr);
  //     const rowStr = rowStrArr.join('');
  //     if (ctx.measureText(rowStr).width > MAX_WIDTH) {
  //       rowStrArr.pop(); // 删除最后一个
  //       rowArr.push(rowStrArr.join('')); // 完成一行
  //       rowStrArr = [currentStr];
  //       continue;
  //     }
  //     // 最后一个字母 直接添加到一行
  //     if (i === allAtr.length - 1) {
  //       rowArr.push(rowStr); // 完成一行
  //     }
  //   }

  //   for (let i = 0; i < rowArr.length; i++) {
  //     ctx.fillText(rowArr[i], startX, startY + i * lineHeight);
  //   }
  //   return rowArr.length;
  // }

  /**
   * 
   * @param {*} text 
   * @param {*} lw 行宽
   * @param {*} lh 行高
   */
  function fillTextLineBreak(text, lw, lh) {
    const chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
    let temp = "";
    let row = [];

    for (let a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp + '').width < lw) {
        temp += chr[a];
      } else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);

    //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
      let rowCut = row.slice(0, 2);
      let rowPart = rowCut[1];
      let test = "";
      let empty = [];
      for (let a = 0; a < rowPart.length; a++) {
        if (ctx.measureText(test + '').width < lw) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
      let group = empty[0] + "..." //这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (let b = 0; b < row.length; b++) {
      ctx.fillText(row[b], 40, 632 + b * lh, lw);
    }
  }
  // 绘制图片
  return new Promise(resolve => {
    ctx.draw(false, (() => {
      // 延时生成图片 否则真机测试文字会样式混乱
      setTimeout(() => {
        // 生成图片
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: res => {
            // wx.hideLoading();
            // res.tempFilePath
            console.log(res)
            resolve(res.tempFilePath)
          },
          fail: (err) => {
            console.log(err)
            // wx.showToast({
            //   title: '图片生成失败~',
            //   icon: 'none'
            // });
          }
        }, that)
      }, 800)
    })())
  })
}
// 绘制canvas
/**
 * 绘制名片
 * @param {*} cid 版式id
 * @param {*} drawData 绘制需要的数据
 */
export function drawCanvas(that, cid, drawData) {
  if (cid === 1) {
    return drawCanvas1(that, drawData)
  }
}