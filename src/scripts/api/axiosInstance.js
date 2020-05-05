import axios from "axios";
import {
  axiosConfig,
  onRequestFailed,
  onRequestSucceed,
  onResponseSucceed,
  onResponseFailed
} from "./axiosConfig";

let Axios = axios.create(axiosConfig);

/**
 * 拦截器配置
 */
Axios.interceptors.request.use(onRequestSucceed, onRequestFailed);
Axios.interceptors.response.use(onResponseSucceed, onResponseFailed);

export default Axios;
