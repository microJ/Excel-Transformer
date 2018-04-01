
const fs = require('fs')
const path = require('path')
const transform2json = require('./transform2json')
const { getAbsPath, showError, errPrompt } = require('./utils')
const conf = require('./loadConf')

const excelPathBase = getAbsPath('../excel_need_transform')

readFiles()

// 2. 读取 excel_need_transform 中所有的 xls 或者 xlsx 文件
function readFiles() {
  fs.readdir(excelPathBase, "utf8", (err, files) => {
    if (err) errPrompt(err)
    else {
      const excelFiles = files.filter(testExcelFile)
      // console.log(excelFiles)
      if (!excelFiles.length) {
        console.log('没有 EXCEL 文件，请检查后再运行命令。')
        return
      }
      else {
        transform(excelFiles)
      }
    }
  })
}

// 3. 根据配置转换并输出
function transform(excelFiles) {
  excelFiles.forEach(v => {
    let file = path.join(excelPathBase, v)
    // console.warn(file)
    fs.access(file, fs.constants.R_OK, err => {
      if (err) {
        console.log('file >>>>>> ' + file)
        errPrompt(err)
      }
      else {
        if (!/^\~\$/.test(v)) transform2json(file)
      }
    })
  });
}

function testExcelFile(fileName) {
  return /.xls$|.xlsx$/.test(fileName)
}

