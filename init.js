/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 初始化安装依赖
 * @Date: 2022-04-25 14:43:54
 * @LastEditTime: 2022-04-25 15:31:55
 */


const fs = require("fs");

const dirs = fs.readdirSync('./');
const exec = require("child_process").execSync;


const desc = {
  'tianqi-http': '服务端依赖包',
  'manager': '个人中心依赖包',
}




//准备shelljs
if (!dirs.includes("node_modules")) {
  console.log("下载工程环境依赖")
  if (exec('cnpm -v') + '') {
    const { stdout, stderr } = exec(`cnpm i shelljs -D`);
    console.info("准备shell环境:", stdout)
    console.info("准备shell环境Error:", stderr)
  } else {
    exec(`npm install -g cnpm --registry=https://registry.npm.taobao.org`);
    const { stdout, stderr } = exec(`cnpm i shelljs -D`);
    console.info("准备shell环境:", stdout)
    console.info("准备shell环境Error:", stderr)
  }
}


const shell = require("shelljs");

//下载服务端项目依赖
install('tianqi-http')

//下载个人中心依赖
installManager()


shell.echo("项目环境准备完毕")



//下雨依赖包
function install(name) {
  if (!name) {
    shell.echo("请传入依赖根目录名")
    process.exit(1)
  }

  if ((shell.pwd()).endsWith(name)) {
    shell.echo(`${desc[name]} 开始下载`)
    shell.exec("cnpm i")
  }

  shell.echo("下载完成!!!")

}




//下载个人中心依赖
function installManager() {
  shell.echo("检查下载个人中心依赖")
  shell.cd('./manager');
  install('manager')
}







