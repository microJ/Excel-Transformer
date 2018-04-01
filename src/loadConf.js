const fs = require('fs')
const { getAbsPath } = require('./utils')

let conf = {}

conf.outputsFolderBase = getAbsPath('../outputs')

// 1. 读取配置
try {
  data = fs.readFileSync(getAbsPath('../transformConfig.json'), 'utf8')

  // console.log(data)
  console.log('加载配置文件成功！')
  Object.assign(conf, JSON.parse(data))
  // console.log(conf)
} catch (error) {
  console.log('配置文件加载失败。')
}

module.exports = conf