"use strict";

import URL from "../constant/urls";
import { FILE_ICON_MAP } from "../constant";
import { Session } from "../utils/storage";
import moment from "moment";

moment.locale("zh-cn");

/**
 * @private
 * 数组类型检测
 */
const _isArray = type =>
  Object.prototype.toString.call(type) === "[object Array]";

/**
 * @private
 * 正则类型检测
 */
const _isReg = type =>
  Object.prototype.toString.call(type) === "[object RegExp]";

/**
 * @private 参数处理
 * @param args 处理传入的参数
 * @returns {RegExp|*} 返回正则
 */
function _genRegArr(args) {
  let chars = args.reduce((acc, cur) => {
    if (_isArray(cur)) {
      cur.forEach(item => {
        acc.push(item);
      });
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
  return chars;
}

/**
 * trim 柯里化
 * @param args 需要过滤掉的符号，可以是正则，可以是字符串表示的符号，可以是数组，如：
 * <code>carryTrim(/[\n\t,]/g)</code>
 * <code>carryTrim('\n','\t',',')</code>
 * <code>carryTrim(['\n','\t',','])</code>
 * @returns {Function}
 */
export function carryTrim(...args) {
  return content => {
    content = String(content);
    if (!content) {
      return "";
    }
    let chars = _genRegArr(args),
      reg,
      stringArr = [];
    chars.forEach(c => {
      if (_isReg(c)) {
        content = content.replace(c, "");
      } else {
        stringArr.push(c);
      }
    });
    reg = new RegExp(`[${stringArr.join("")}]`, "g");
    return content.replace(reg, "");
  };
}

/**
 * 文本内容trim
 */
export function trimSpace(content) {
  return carryTrim(["\t", "\n", " "])(content);
}

/**
 * 获取文件流
 * @param url 文件
 * @returns {string} 文件流
 */
export function getFileStream(url) {
  return `${URL.GET_FILE_STREAM}?url=${encodeURIComponent(url)}
  &token=${Session.get("app_token")}&userId=${Session.get("app_userId")}`;
}

/**
 * 获取文件图标
 * @param fileName 文件名
 * @param type 图标类型
 * @returns {String} 图标名
 */
export function getFileIcon(fileName, type) {
  if (!fileName) {
    return FILE_ICON_MAP.default;
  }
  let splitArr = fileName.split("."),
    fileExt = splitArr[splitArr.length - 1],
    iconMap = FILE_ICON_MAP[type];
  return iconMap[fileExt] || FILE_ICON_MAP.default;
}

/**
 * 对10位时间戳进行格式化，如 1586767410 -> 2020-04-13 4:44:10
 * @param time
 * @param format
 */
export function formatTimestamp(time, format = "YYYY-MM-DD HH:mm:ss") {
  time = new Date(String(time).length === 10 ? Number(time) * 1000 : time);
  return moment(time).format(format);
}

/**
 * 获取距离现在还有多久的时间
 * @param time 当时
 * @param format 时间格式
 * @returns {string} 啦啦啦
 */
export function getTimeFromNow(time, format = "timestamp") {
  if (!time) {
    return "";
  }
  if (format === "timestamp") {
    time = new Date(String(time).length === 10 ? Number(time) * 1000 : time);
  }
  let last15Days = moment().add(-15, "days");
  return moment(time).isBefore(last15Days)
    ? moment(time).format("YYYY-MM-DD HH:mm:ss")
    : moment(time, format).fromNow();
}

/**
 * 获取文件大小
 * @param fileSize Byte
 * @returns {string} "XXX KB"
 */
export function getFileSize(fileSize) {
  fileSize = Number(fileSize);
  if (fileSize > 2048) {
    return (fileSize / 1024).toFixed(1) + "K";
  } else if (fileSize > 1048576) {
    return (fileSize / 1048576).toFixed(1) + "M";
  } else if (fileSize > 1073741824) {
    return (fileSize / 1073741824).toFixed(1) + "G";
  } else {
    return fileSize + "B";
  }
}
