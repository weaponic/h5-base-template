"use strict";

/**
 * 从localStorage中获取值
 * @param key 存入的key值
 * @returns {string} 返回字符串格式的值
 */
function getLocalStorage(key) {
  return window.localStorage.hasOwnProperty(key)
    ? window.localStorage.getItem(key)
    : "";
}

/**
 * 往localStorage中存值
 * @param key 存入的key值
 * @param value 需要存的值
 * @param doWhenValueExists 当值存在时需要做的回调函数,注意传入的原始值为字符串形式
 */
function setLocalStorage(key, value, doWhenValueExists) {
  if (!doWhenValueExists || typeof doWhenValueExists !== "function") {
    window.localStorage.setItem(key, value);
  } else {
    let oldVal = getLocalStorage(key);
    doWhenValueExists(oldVal);
  }
}

/**
 * 删除localStorage中的值
 * @param key
 */
function removeLocalStorage(key) {
  if (window.localStorage.hasOwnProperty(key)) {
    window.localStorage.removeItem(key);
  }
}

/**
 * Attention!!
 * 清除localStorage中所有的值，假如不知道别人会不会用到就不要清
 */
function clearLocalStorage() {
  window.localStorage.clear();
}

/**
 * 导出localStorage工具函数
 * @type {{set: setLocalStorage, get: (function(*=): string), clear: clearLocalStorage, remove: removeLocalStorage}}
 */
export const Local = {
  has: key => window.localStorage.hasOwnProperty(key),
  set: setLocalStorage,
  get: getLocalStorage,
  remove: removeLocalStorage,
  clear: clearLocalStorage
};

/**
 * 从sessionStorage中获取值
 * @param key 存入的key值
 * @returns {string} 返回字符串格式的值
 */
function getSessionStorage(key) {
  return window.sessionStorage.hasOwnProperty(key)
    ? window.sessionStorage.getItem(key)
    : "";
}

/**
 * 往sessionStorage中存值
 * @param key 存入的key值
 * @param value 需要存的值
 * @param doWhenValueExists 当值存在时需要做的回调函数,注意传入的原始值为字符串形式
 */
function setSessionStorage(key, value, doWhenValueExists) {
  if (!doWhenValueExists || typeof doWhenValueExists !== "function") {
    window.sessionStorage.setItem(key, value);
  } else {
    let oldVal = getSessionStorage(key);
    doWhenValueExists(oldVal);
  }
}

/**
 * 删除sessionStorage中的值
 * @param key
 */
function removeSessionStorage(key) {
  if (window.sessionStorage.hasOwnProperty(key)) {
    window.sessionStorage.removeItem(key);
  }
}

/**
 * Attention!!
 * 清除sessionStorage中所有的值，假如不知道别人会不会用到就不要清
 */
function clearSessionStorage() {
  window.sessionStorage.clear();
}

/**
 * 导出sessionStorage工具函数
 * @type {{set: setSessionStorage, get: (function(*=): string), clear: clearSessionStorage, remove: removeSessionStorage}}
 */
export const Session = {
  has: key => window.sessionStorage.hasOwnProperty(key),
  set: setSessionStorage,
  get: getSessionStorage,
  remove: removeSessionStorage,
  clear: clearSessionStorage
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  clearSessionStorage
};
