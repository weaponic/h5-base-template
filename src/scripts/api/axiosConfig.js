"use strict";

import { Toast } from "vant";
import router from "../../router";
import { Session } from "../utils/storage";

export const axiosConfig = {
  baseURL: "/",
  timeout: 60000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
};

/**
 * 请求成功发送之前的回调
 * @param config
 * @returns {*}
 */
function onRequestSucceed(config) {
  return config;
}

/**
 * 请求发送失败了的回调
 * @param error
 * @returns {Promise<never>}
 */
function onRequestFailed(error) {
  return Promise.reject(error);
}

/**
 * 成功接到返回之后的回调
 * @param response
 */
function onResponseSucceed(response) {
  let errorMsg;
  // 什么都没查到
  if (!response || response.status !== 200) {
    errorMsg = "网络异常";
    Toast(errorMsg);
    return Promise.reject(errorMsg);
  }
  // 存疑，错误码200
  if (response.data.status == "200") {
    errorMsg = "权限不足或账号已被禁用";
    Toast(errorMsg);
    router.push("/");
    return Promise.reject(errorMsg);
  } else {
    return response;
  }
}

/**
 * 服务器未能响应返回体的回调
 * @param error
 */
function onResponseFailed(error) {
  Toast("网络或服务器异常");
  return Promise.reject(error);
}

export {
  onRequestSucceed,
  onRequestFailed,
  onResponseSucceed,
  onResponseFailed
};
