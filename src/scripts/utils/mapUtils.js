import { Toast } from "vant";
import defaultMarker from "../../assets/images/map/icon-location-marker-default.png";
import startMarker from "../../assets/images/map/icon-location-start.png";
import endMarker from "../../assets/images/map/icon-location-end.png";

const mapUtils = {
  /**
   * 地图初始化
   * @param id
   * @returns {*}
   */
  initMap: function(id) {
    let map = new IMAP.Map(id, {
      minZoom: 9, // 禁止地图缩放到9以下
      maxZoom: 20, // 最大缩放到20
      zoom: 9, // 设置地图缩放级别为9，刚好可以看到整个上海市
      center: new IMAP.LngLat(121.42227, 31.31141), // 中心为上海市
      dblclickZoom: false,
      keyboardEnable: false,
      animation: true //设置地图缩放动画效果
    });
    L.DomEvent.off(window, "selectstart", L.DomEvent.preventDefault);
    this.addRoadNetLayer(map);
    return map;
  },
  /**
   * 基本单点上图
   * @param map 地图对象
   * @param options 点属性 - 必选经纬度(lnglat, lon+lat, lng+lat, long+lati, longitude+latitude)
   * 可选 - icon: 打点图片
   * 可选 - size: 图片大小
   * 可选 - offset： 点距离实际经纬度偏移
   * @param callback 可选，点击回调
   */
  addBaseMarker(map, options, callback) {
    if (!map) {
      return;
    }
    let longitude = null,
      latitude = null,
      lnglat = null;
    if (options.hasOwnProperty("lnglat")) {
      let lnglatValue = options.lnglat;
      if (Object.prototype.toString.call(lnglatValue) === "[object Array]") {
        longitude = lnglatValue[0];
        latitude = lnglatValue[1];
      } else if (lnglatValue instanceof IMAP.LngLat) {
        lnglat = lnglatValue;
      }
    } else {
      longitude =
        options.lon || options.lng || options.long || options.longitude;
      latitude = options.lat || options.lati || options.latitude;
    }
    longitude && latitude && (lnglat = new IMAP.LngLat(longitude, latitude));
    if (lnglat) {
      let opts = new IMAP.MarkerOptions(),
        size = options.size || [30, 30],
        offset = options.offset || [0, 0],
        icon = options.icon || defaultMarker;
      opts.icon = new IMAP.Icon(icon, {
        size: new IMAP.Size(size[0], size[1]),
        offset: new IMAP.Pixel(offset[0], offset[1])
      });
      let marker = new IMAP.Marker(lnglat, opts);
      callback &&
        typeof callback === "function" &&
        marker.addEventListener(IMAP.Constants.CLICK, e => {
          callback(options, e);
        });
      map.getOverlayLayer().addOverlay(marker, false);
    }
  },
  /**
   * 添加路网图层
   */
  addRoadNetLayer(map) {
    const getRoadTileUrl = (x, y, z) =>
      IMAP.ROADNET_URL.replace("{x}", x)
        .replace("{y}", y)
        .replace("{z}", z);

    let RoadLayer = new IMAP.TileLayer({
      maxZoom: 18,
      minZoom: 1,
      tileSize: 256
    });
    RoadLayer.setTileUrlFunc(getRoadTileUrl);
    RoadLayer.setOpacity(1); //设置图层透明度，取值范围0-1
    map.addLayer(RoadLayer);

    return RoadLayer;
  },
  /**
   * 弹出信息
   */
  addInfoWindow: function(map, item) {
    let lnglat = new IMAP.LngLat(item.long, item.lati);
    let content = `
        <div style="width: 200px;background: #fff;padding: 5px;border: 1px solid #ccc;border-radius: 5px;">
            <div style="font-weight: bold;margin-bottom: 10px;">
                该落脚点类型为：${item.type}
            </div>
            <div style="color: #333;">${item.text}</div>
        </div>
    `;
    let infoWindow = new IMAP.InfoWindow(content, {
      position: lnglat,
      size: new IMAP.Size(100, 50),
      offset: new IMAP.Pixel(50, 0),
      anchor: IMAP.Constants.BOTTOM_CENTER,
      type: IMAP.Constants.OVERLAY_INFOWINDOW_CUSTOM
    });
    map.getOverlayLayer().addOverlay(infoWindow);
    map.setCenter(lnglat, 15);
  },
  /**
   * 生成导航信息
   * @param map
   * @param start
   * @param end
   * @returns {Promise<any>}
   */
  generateDrivingPlan(map, start, end) {
    map.plugin(["IMAP.Driving"], function() {
      let slnglat = new IMAP.LngLat(start[0], start[1]),
        elnglat = new IMAP.LngLat(end[0], end[1]),
        drivingSearch = new IMAP.Driving({ map });
      drivingSearch.search(slnglat, elnglat, function(status, res) {
        if (status == 0) {
          map.clearOverlays();
          let result = res.result,
            routes = result.routes || [],
            markers = [
              { lnglat: start, icon: startMarker },
              { lnglat: end, icon: endMarker }
            ];
          if (routes.length <= 0) {
            Toast("暂无建议的行车路线");
            return;
          }
          routes.forEach((element, index) => {
            let steps = element.steps;
            let paths = [slnglat];
            steps.forEach(step => {
              let path = step.path;
              path = path.split(";");
              for (let i = 0; i < path.length; i++) {
                let lonlat = path[i].split(",");
                lonlat = new IMAP.LngLat(lonlat[0], lonlat[1]);
                paths.push(lonlat);
              }
            });
            paths.push(elnglat);
            let line = new IMAP.Polyline(paths, {
              strokeColor: "#22a2ed",
              strokeOpacity: 1,
              strokeWeight: 6
              // arrow:true
            });
            if (index == 0) {
              map.getOverlayLayer().addOverlay(line);
              mapUtils.addMarkers(map, markers);
            }
          });
        } else {
          Toast("暂无建议的行车路线");
        }
      });
    });
  }
};

export default mapUtils;
