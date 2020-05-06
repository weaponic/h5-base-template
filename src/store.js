import Vue from "vue";
import Vuex from "vuex";
// 用对比不用好，不用比用错好，状态管理很多情况下还是没有必要的，慎用
// 视图绑定在状态上，操作引发变化，变化导致状态的修改，引起视图变化
Vue.use(Vuex);

const FakeAPI = {
  getV() {
    return new Promise(resovle => {
      setTimeout(() => {
        resovle(100);
      }, 300);
    });
  }
};

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    setCount(state, value) {
      state.count = state.count + value;
    }
  },
  actions: {
    getValueFromAPI(context) {
      const { commit } = context;
      
      FakeAPI.getV().then(res => {
        commit("setCount", res);
      });
    }
  },
  getters: {
    getCount(state) {
      return state.count;
    }
  }
});
