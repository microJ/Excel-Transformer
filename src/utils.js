const path = require('path')

module.exports = {

  errPrompt(err) {
    let msg
    switch (err.code) {
      case 'ENOTDIR':
        msg = "给定路径不是一个目录。"
        break
      case 'ENOENT':
        msg = "地址中含有不存在路径，请检查配置地址。"
        break
      case 'EPERM':
        msg = "没有权限进行操作。"
        break
      case 'ENOTDIR':
        msg = "给定路径不是一个目录。"
        break
      default:
        msg = "出现了一个错误：" + err
    }
    msg = '\r\n意外错误：' + msg
    console.error(msg)
    console.error(err)
  },

  showError: function (msg) {
    msg = `\r\n    >>>哇，出错了！!<<<\r\n    **错误信息：** ` + msg + '\r\n'
    console.error(msg)
  },

  getAbsPath() {
    let args = [].slice.call(arguments)
    args.unshift(__dirname)
    return path.join(...args)
  }

}