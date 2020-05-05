"use strict";

import WX from "./sdk-wx";
import EM from "./sdk-em";

export default {
  jwwx: [
    {
      desc: "初始化配置",
      name: "initConfig",
      handler: WX.initConfig
    },
    {
      desc: "录音结束事件",
      name: "onVoiceRecordEnd",
      handler: WX.onVoicePlayEnd
    },
    {
      desc: "显示水印",
      name: "showWatermark",
      handler: WX.showWaterMark
    },
    {
      desc: "预览图片",
      name: "previewImage",
      handler: WX.previewImage
    },
    {
      desc: "选择图片",
      name: "chooseImage",
      handler: WX.chooseImage
    },
    {
      desc: "上传图片",
      name: "uploadImage",
      handler: WX.uploadImage
    },
    {
      desc: "开始录制语音",
      name: "startRecord",
      handler: WX.startRecord
    },
    {
      desc: "停止录制语音",
      name: "stopRecord",
      handler: WX.stopRecord
    },
    {
      desc: "上传语音",
      name: "uploadVoice",
      handler: WX.uploadVoice
    },
    {
      desc: "预览文件",
      name: "previewFile",
      handler: WX.previewFile
    },
    {
      desc: "语音转文字",
      name: "translateVoice",
      handler: WX.translateVoice
    },
    {
      desc: "获取地理位置",
      name: "getLocation",
      handler: WX.getLocation
    }
  ],
  emobile: [
    {
      desc: "选择图片",
      name: "chooseImage",
      handler: EM.chooseImage
    },
    {
      desc: "上传图片",
      name: "uploadImage",
      handler: EM.getLocalImgData
    },
    {
      desc: "开始录制语音",
      name: "startRecord",
      handler: EM.startRecord
    },
    {
      desc: "停止录制语音",
      name: "stopRecord",
      handler: EM.stopRecord
    },
    {
      desc: "预览文件",
      name: "previewFile",
      handler: EM.previewFile
    },
    {
      desc: "获取地理位置",
      name: "getLocation",
      handler: EM.getLocation
    }
  ]
};
