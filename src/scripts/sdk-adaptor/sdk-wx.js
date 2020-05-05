"use strict";

const appId = "wlf6450fdb4c";
const jsApiList = [
  "onMenuShareAppMessage",
  "onMenuShareWechat",
  "startRecord",
  "stopRecord",
  "onVoiceRecordEnd",
  "playVoice",
  "pauseVoice",
  "stopVoice",
  "onVoicePlayEnd",
  "uploadVoice",
  "downloadVoice",
  "chooseImage",
  "previewImage",
  "uploadImage",
  "downloadImage",
  "getNetworkType",
  "openLocation",
  "getLocation",
  "hideOptionMenu",
  "showOptionMenu",
  "hideMenuItems",
  "showMenuItems",
  "hideAllNonBaseMenuItem",
  "showAllNonBaseMenuItem",
  "closeWindow",
  "scanQRCode",
  "chooseVideo",
  "uploadVideo",
  "downloadVideo",
  "agentConfig",
  "getStepCount",
  "getAllPhoneContacts",
  "addCalendarEvent",
  "showWatermark",
  "launch3rdApp",
  "getInstallState",
  "openUserProfile",
  "selectExternalContact",
  "selectEnterpriseContact",
  "bioassayAuthentication",
  "openUrl",
  "openEnterpriseApp",
  "request3rdApp"
];

const sdkApi = {
  /**
   * 唤起第三方app
   * @param appName 应用显示的名称
   * @param appId iOS使用，要启动应用的scheme
   * @param messageExt iOS使用，传递给第三方的参数
   * @param packageName Android使用，要启动应用的包名称
   * @param param Android使用，传递给第三方的参数
   */
  launch3rdApp({ appName, appID, messageExt, packageName, param }) {
    wx.invoke(
      "launch3rdApp",
      { appName, appID, messageExt, packageName, param },
      function(res) {
        // 调试日志输出
        // alert(res.err_msg);
      }
    );
  },

  /**
   * 检查API是否可用
   * @param {String, Array} jsApiList
   * @returns {Promise<unknown>}
   */
  isApiAvailable(jsApiList) {
    if (Object.prototype.toString.call(jsApiList) !== "[Object Array]") {
      jsApiList = [jsApiList];
    }
    return new Promise(resolve => {
      wx.checkJsApi({
        jsApiList,
        success: function(res) {
          resolve(res.checkResult);
        }
      });
    });
  },

  /**
   * 初始化微信SDK配置
   * @param {String} timestamp 时间戳
   * @param {String} nonceStr 随机字符串
   * @param {String} signature 签名
   * @returns {Promise<unknown>}
   */
  initConfig({ timestamp, nonceStr, signature }) {
    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，
    // 可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    return new Promise((resolve, reject) => {
      wx.config({
        beta: true,
        debug: false,
        appId,
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList
      });
      wx.ready(res => {
        resolve(res);
      });
      wx.error(res => {
        reject(res);
      });
    });
  },

  /**
   * 显示微信水印
   * @param params 水印参数
   * @returns {Promise<unknown>}
   */
  showWaterMark(params) {
    return new Promise(resolve => {
      wx.invoke("showWatermark", params, res => {
        resolve(res);
      });
    });
  },

  /**
   * 图片选择
   * @param {Number} count 选择图片的数量，默认9
   * @param {Array} sizeType 可以指定是原图还是压缩图，默认二者都有: ["original", "compressed"]
   * @param {Array} sourceType 可以指定来源是相册还是相机，默认二者都有: ["album", "camera"]
   * @returns {Promise<unknown>}
   */
  chooseImage({
    count = 1,
    sizeType = ["original", "compressed"],
    sourceType = ["album", "camera"]
  }) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count,
        sizeType,
        sourceType,
        success: function(res) {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          resolve(res.localIds);
        },
        fail: function(res) {
          reject(res);
        }
      });
    });
  },

  /**
   * 获取本地图片流接口
   * @param localId 图片的localID
   */
  getLocalImageData(localId) {
    return new Promise((resolve, reject) => {
      wx.getLocalImgData({
        localId,
        success: function(res) {
          // localData是图片的base64数据，可以用img标签显示
          resolve(res.localData);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  },

  /**
   * 图片上传到微信服务器
   * @param {String} localId 需要上传的图片的本地ID，由chooseImage接口获得
   * @param {Number} isShowProgressTips  默认为1，显示进度提示
   * @returns {Promise<unknown>}
   */
  uploadImage({ localId, isShowProgressTips = 1 }) {
    return new Promise(resolve => {
      wx.uploadImage({
        localId,
        isShowProgressTips,
        success: function(res) {
          let serverId = res.serverId; // 返回图片的服务器端ID
          resolve(serverId);
        }
      });
    });
  },

  /**
   * 微信图片预览
   * @param {String} current 当前显示图片的http链接
   * @param {Array} urls 需要预览的图片的http链接列表
   */
  previewImage({ current, urls }) {
    wx.previewImage({ current, urls });
  },

  /**
   * 文件预览
   * @param {String} url 需要预览文件的地址(必填，可以使用相对路径)
   * @param {String} name 需要预览文件的文件名(不填的话取url的最后部分)
   * @param {Number} size 需要预览文件的字节大小(必填)
   * @param {Array} hidePreviewMenuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   */
  previewFile({ url, name, size }) {
    wx.previewFile({ url, name, size, hidePreviewMenuList: [] });
  },

  /**
   * 开始录音
   */
  startRecord() {
    wx.startRecord();
  },

  /**
   * 结束录音
   * @returns {Promise<unknown>} 成功返回localId
   */
  stopRecord() {
    return new Promise((resolve, reject) => {
      wx.stopRecord({
        success: function(res) {
          resolve(res.localId);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  },

  /**
   * 录音时间超过一分钟没有停止的时候会执行 complete 回调
   * @returns {Promise<unknown>}
   */
  onVoiceRecordEnd() {
    return new Promise(resolve => {
      wx.onVoiceRecordEnd({
        complete: function(res) {
          resolve(res.localId);
        }
      });
    });
  },

  /**
   * 上传语音到微信服务器
   * @param {String} localId 需要上传的音频的本地ID，由stopRecord接口获得
   * @param {Number} isShowProgressTips 默认为1，显示进度提示
   * @returns {Promise<unknown>}
   */
  uploadVoice({ localId, isShowProgressTips = 1 }) {
    return new Promise((resolve, reject) => {
      wx.uploadVoice({
        localId,
        isShowProgressTips,
        success: function(res) {
          // 返回音频的服务器端ID
          resolve(res.serverId);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  },

  /**
   * 播放录音
   * @param {String} localId 本地资源id
   */
  playVoice(localId) {
    wx.playVoice({ localId });
  },

  /**
   * 暂停播放
   * @param {String} localId 本地资源id
   */
  pauseVoice(localId) {
    wx.pauseVoice({ localId });
  },

  /**
   * 停止播放
   * @param {String} localId 本地资源id
   */
  stopVoice(localId) {
    wx.stopVoice({ localId });
  },

  /**
   * 当录音播放结束之后触发
   * @returns {Promise<unknown>}
   */
  onVoicePlayEnd() {
    return new Promise(resolve => {
      wx.onVoicePlayEnd({
        success: function(res) {
          // 返回音频的本地ID
          resolve(res.localId);
        }
      });
    });
  },

  /**
   * 微信语音转文字
   * @param {String} localId 需要识别的音频的本地Id，由录音相关接口获得，音频时长不能超过60秒
   * @param {Number} isShowProgressTips 默认为1，显示进度提示
   * @returns {Promise<unknown>}
   */
  translateVoice({ localId, isShowProgressTips }) {
    return new Promise((resolve, reject) => {
      sdkApi.isApiAvailable(["translateVoice"]).then(res => {
        let { checkResult } = res;
        if (
          checkResult.hasOwnProperty("translateVoice") &&
          !checkResult.translateVoice
        ) {
          wx.translateVoice({
            localId,
            isShowProgressTips,
            success: function(res) {
              // 语音识别的结果
              resolve(String(res.translateResult).replace("。", ""));
            },
            error: function(err) {
              reject(err);
            }
          });
        } else {
          reject("微信版本过低,无法使用语音转文字");
        }
      });
    });
  },

  /**
   * 获取剪贴板数据
   * @returns {Promise<unknown>}
   */
  getClipboardData() {
    return new Promise(resolve => {
      wx.getClipboardData({
        success: function(res) {
          resolve(res.data);
        }
      });
    });
  },

  /**
   * 设置剪贴板
   * @param {String} data 需要复制的文字
   */
  setClipboardData(data) {
    wx.setClipboardData({
      data,
      success: function(res) {
        console.log("已复制");
      }
    });
  },

  /**
   * 使用政务微信内置地图查看位置
   * @param {Number} latitude 纬度，浮点数，范围为90 ~ -90
   * @param {Number} longitude 经度，浮点数，范围为180 ~ -180。
   * @param {String} name 位置名
   * @param {String} address 地址详情说明
   * @param {Number} scale 地图缩放级别,整形值,范围从1~28。默认为16
   */
  openLocation({ latitude, longitude, scale, name, address }) {
    wx.openLocation({ latitude, longitude, name, address, scale });
  },

  /**
   * 获取用户当前经纬度
   * @returns {Promise<unknown>}
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          let { longitude, latitude, gps_status } = res;
          if (gps_status > 0) {
            resolve({ longitude, latitude });
          } else {
            reject(res);
          }
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  },

  /**
   * 批量隐藏右上角功能按钮
   * @param {Array} menuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   */
  hideMenuItems(menuList = []) {
    wx.hideMenuItems({ menuList });
  },

  /**
   * 用户截屏时触发
   * @param callback 回调函数
   */
  onUserCaptureScreen(callback) {
    wx.onUserCaptureScreen(callback);
  },

  /**
   * 扫描二维码
   * @param desc 不知道干啥的
   * @param needResult 默认为0，扫描结果由政务微信处理，1则直接返回扫描结果，
   * @param scanType 可以指定扫二维码还是一维码，默认二者都有
   * @returns {Promise<unknown>}
   */
  scanQRCode({ desc = "", needResult = 0, scanType = ["qrCode", "barCode"] }) {
    return new Promise((resolve, reject) => {
      wx.scanQRCode({
        desc,
        needResult,
        scanType,
        success: function(res) {
          resolve(res);
        },
        error: function(res) {
          if (res.errMsg.indexOf("function_not_exist") > 0) {
            reject("版本过低请升级");
          } else {
            reject(res);
          }
        }
      });
    });
  }
};

export default sdkApi;
