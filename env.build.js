


const shell = require("shelljs")
const lists = process.argv
let envs = lists[lists.length - 1].slice(2).trim()

//当前项目环境: 目前有 测试环境  开发环境【develop】 测试环境【test】 生产环境【production】
const allEnvs = ['local', 'develop', 'test', 'production']


//兜底开发环境
if (!envs || !allEnvs.includes(envs)) {
  envs = allEnvs[0]
}

process.env.APP_ENV = `${envs}`


console.log("当前打包环境:",process.env.APP_ENV)

//开始执行打包任务
shell.exec('gulp build')