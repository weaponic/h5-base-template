/* eslint-disable */
import Vue from "vue";
const $vue = new Vue();
const eventBus = Object.create(null);

/**
 * 事件注册
 * @param name 事件名称
 * @param cb 事件对应的回调
 */
eventBus.register = (name, cb) => {
  $vue.$off(name);
  $vue.$on(name, cb);
};

/**
 * 单次事件注册
 * @param name 需要注册的事件
 * @param cb 回调
 */
eventBus.registerOnce = (name, cb) => {
  $vue.$off(name);
  $vue.$once(name, cb);
};

/**
 * 事件移除
 * @param name 事件名称
 */
eventBus.remove = name => {
  $vue.$off(name);
};

/**
 * 事件触发
 * @param name 事件名称
 * @param args 其他参数
 */
eventBus.call = (name, ...args) => {
  $vue.$emit(name, ...args);
};

export { eventBus };
