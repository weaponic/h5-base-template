"use strict";
import { formatDate } from "./dateFilter";
import {
  trimSpace,
  getFileStream,
  getFileIcon,
  getTimeFromNow,
  formatTimestamp,
  getFileSize
} from "./contentFilter";

let filters = {
  formatDate,
  trimSpace,
  getFileStream,
  getFileIcon,
  getTimeFromNow,
  formatTimestamp,
  getFileSize
};

function install(Vue) {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
}

export default install;
