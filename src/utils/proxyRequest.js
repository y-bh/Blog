

const appConfig = require("config/app.config")
import Requeset from "./baseRequest"
let baseURL = `${appConfig.url}`;
class proxyAjax extends Requeset {
  constructor(baseURL, timeout = 4000) {
    super(baseURL, timeout)
    // 请求拦截器
    this.service.interceptors.request.use(config => {
      config.headers['Content-Type'] = 'application/json';

      //自定义headers
      return config;
    }, error => {
      return Promise.reject(error);
    });

  }
}

const service = new proxyAjax(baseURL)
module.exports = service