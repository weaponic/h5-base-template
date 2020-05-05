"use strict";

const sdkApi = {
  isApiAvailable(name) {
    return em.checkJsApi(name);
  },

  /**
   * 选择图片
   * @param {Number} count 选择图片的数量，默认9
   * @param {boolean} isCrop 是否裁剪 true可裁剪，false不可裁剪，默认不裁剪
   * @param {Array} sourceType 可以指定来源是相册还是相机，默认二者都有: ["album", "camera"]
   * @returns {Promise<unknown>}
   */
  chooseImage({ count = 1, isCrop = false, sourceType = ["album", "camera"] }) {
    return new Promise((resolve, reject) => {
      if (sdkApi.isApiAvailable("chooseImage")) {
        em.chooseImage({
          count,
          isCrop,
          sourceType,
          success: function(res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            resolve(res.localIds);
          },
          fail: function(res) {
            reject(res);
          }
        });
      } else {
        reject("SDK版本过低无法使用");
      }
    });
  },

  /**
   * 上传图片
   * @param localId 需要上传的图片的本地ID，由chooseImage接口获得
   * @param isShowProgressTips 默认为1，显示进度提示
   * @returns {Promise<unknown>}
   */
  uploadImage({ localId, isShowProgressTips = 1 }) {
    return new Promise((resolve, reject) => {
      if (sdkApi.isApiAvailable("uploadImage")) {
        em.uploadImage({
          localId,
          isShowProgressTips,
          success: function(res) {
            // 返回图片的服务器端ID
            resolve(res.serverId);
          },
          error: function(err) {
            reject(err);
          }
        });
      } else {
        reject("SDK版本过低无法使用");
      }
    });
  },

  /**
   * 本地图片转base64
   * @param localId 需要上传的图片的本地ID，由chooseImage接口获得
   * @returns {Promise<unknown>}
   */
  getLocalImgData(localId) {
    return new Promise((resolve, reject) => {
      if (sdkApi.isApiAvailable("getLocalImgData")) {
        em.getLocalImgData({
          localId,
          success: function(res) {
            resolve(res.localData);
          },
          error: function(err) {
            reject(err);
          }
        });
      } else {
        reject("SDK版本过低无法使用");
      }
    });
  },

  /**
   * 语音听写，语音转为文字接口
   */
  startRecord() {
    return new Promise((resolve, reject) => {
      if (sdkApi.isApiAvailable("continueSpeech")) {
        em.continueSpeech({
          continueSpeechend: function(res) {
            resolve(res.result);
          },
          onContinueSpeech: function(argument) {
            // Toast('onContinueSpeech\n' + JSON.stringify(argument))
            // let result = argument.result;
            // resolve(result)
          },
          success: function(argument) {
            // Toast('onSuccess\n' + JSON.stringify(argument))
          },
          fail: function(err) {
            reject(err);
          }
        });
      } else {
        reject("SDK版本过低无法使用");
      }
    });
  },

  /**
   * 停止录制语音
   *
   */
  stopRecord() {
    return new Promise((resolve, reject) => {
      if (sdkApi.isApiAvailable("stopVoice")) {
        em.stopVoice({
          success: function(argument) {
            resolve(argument);
          },
          fail: function(err) {
            reject(err);
          }
        });
      } else {
        reject("SDK版本过低无法使用");
      }
    });
  },

  /**
   * 预览文件
   * @param url 文件路径
   * @param name 文件名
   * @param size 文件大小
   */
  previewFile({ url, name, size }) {
    em.previewFile({ url, name, size });
  },

  /**
   * 获取地理信息
   * @returns {Promise<unknown>}
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      if (sdkApi.isApiAvailable("getLocation")) {
        em.getLocation({
          type: "wgs84",
          success: function(res) {
            resolve(res);
          }
        });
      } else {
        reject("SDK版本过低无法使用");
      }
    });
  }
};

export default sdkApi;
