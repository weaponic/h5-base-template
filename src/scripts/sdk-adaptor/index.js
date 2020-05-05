"use strict";

import { Session } from "../utils/storage";
import apiList from "./api-list";

class SDKAdaptor {
  sdkApiMap = {};

  constructor(platform = "wx") {
    this.loadApiList(platform);
  }

  loadApiList(platform) {
    if (!apiList.hasOwnProperty(platform)) {
      // eslint-disable-next-line
      console.error("暂无【" + platform + "】平台的相关配置！");
      return;
    }
    const platformApis = apiList[platform];
    platformApis.forEach(item => {
      this.sdkApiMap[item.name] = item;
    });
  }

  call(name, params) {
    if (this.sdkApiMap.hasOwnProperty(name)) {
      let { handler } = this.sdkApiMap[name];
      if (typeof handler !== "function") {
        // eslint-disable-next-line
        console.error("API列表中暂无配置-API:【" + name + "】");
        return;
      }

      return handler.call(this, params);
    }
  }
}
const platform = Session.get("xtSource");
const adaptor = new SDKAdaptor(platform);

export default adaptor;
