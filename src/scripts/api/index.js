import Axios from "./axiosInstance";
import URL from "./urls";

export default {
  /**
   * 用户密码登陆
   * @params {Object} params 查询参数 {authcode:'授权码',userId:'用户id（身份证号）'}
   * @returns Promise 对象
   */
  loginWithPassword(params) {
    return Axios.post(URL.AUTH_LOGIN_WITH_PASSWORD, params);
  },
  /**
   * 获取微信用户信息
   * @param {Object} param 查询参数
   * @returns Promise 对象
   */
  getWxUserInfo(param) {
    return Axios.get(URL.AUTH_GET_USER_INFO, {
      params: param
    });
  }
};
