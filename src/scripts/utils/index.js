"use strict";

/**
 * 简易的lodash 数组 flatten实现
 * @param array
 * @param layer
 * @returns {*}
 */
export function flatArray(array, layer = Infinity) {
  // 类型检测
  const isArray = type =>
    Object.prototype.toString.call(type) === "[object Array]";

  // 非数组或layer为0 直接输出掉
  if (!isArray(array) || layer === 0) {
    return array;
  }

  let currentLayer = 1;
  const _handleDepth = (accu, next) => {
    if (currentLayer < layer && isArray(next)) {
      next.forEach(item => {
        _handleDepth(accu, item);
      });
    } else {
      accu.push(next);
    }
    currentLayer++;
  };

  const _handleWidth = (accu, curr) => {
    currentLayer = 0;
    _handleDepth(accu, curr);
    return accu;
  };

  return array.reduce(_handleWidth, []);
}

/**
 * 获取url中的查询字符串（单个）
 * @param name key值
 * @returns {*} 对应的value值
 */
export function getQueryString(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  let res = window.location.search.substr(1).match(reg);
  return res == null ? null : unescape(res[2]);
}

/**
 * 获取url中的所有查询字符串
 */
export function getQueryStrings() {
  let result = {},
    url = window.location.search;

  if (url.indexOf("?") !== -1) {
    let str = url.substr(1),
      strArr = str.split("&");
    for (let i = 0; i < strArr.length; i++) {
      let part = strArr[i].split("=");
      result[part[0]] = unescape(part[1]);
    }
  }
  return result;
}

/**
 * 从文本内容(String)中获取查询参数[(?|&)key=value]
 * @param content
 * @param name
 * @returns {null|*}
 */
export function getQSFromContent(content, name) {
  if (!content || !name) {
    return null;
  }
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  let res = content.substr(1).match(reg);
  return res == null ? null : unescape(res[2]);
}
