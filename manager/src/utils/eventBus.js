/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 事件中转器
 * @Date: 2021-07-26 11:43:56
 * @LastEditTime: 2021-07-26 12:19:50
 */
class Bus {
  constructor() {
    // 收集订阅信息,调度中心
    this.list = {};
  }

  // 订阅
  $on(name, fn) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn);
  }

  // 发布
  $emit(name, data = null) {
    if (this.list[name]) {
      this.list[name].forEach((fn) => {
        fn(data);
      });
    }
  }

  // 取消订阅
  $off(name) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}
export default new Bus();

