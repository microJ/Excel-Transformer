const fs = require('fs')
const path = require('path')
const node_xlsx = require('node-xlsx')
const { showError, errPrompt } = require('./utils')

const conf = require('./loadConf')

let sheetNameSet = new Set

module.exports = function (file) {
  let sheetList = node_xlsx.parse(file) // 元素为表数据

  sheetList.forEach(v => {
    // console.log(Object.keys(v))
    let sheetName = v['name'],
      rowList = v['data']
    exportRowList2json(rowList, sheetName, file)

  })
}

/**
 * 
 * @param {[][]} rowList 单张表数据，每行组成的数组
 * @param {string} sheetName 单张表的名字
 * @param {string} file Excel 文件的路径
 */
function exportRowList2json(rowList, sheetName, file) {
  let keys = rowList[0],
    valueTypes = rowList[1],
    idIndex = keys && keys.indexOf('id'),
    outputData = {}

  if (!keys || !keys.length) return
  console.log(`开始转换 ${file} - ${sheetName}`)
  if (!~idIndex) {
    let errMsg = `excel 中 'id' 字段必须存在，请配置 ${file} 中的 ${sheetName} 表中的 'id' 字段！ `
    showError(errMsg)
    throw Error()
  }

  rowList.slice(2).forEach(v => {
    let rowId = v[idIndex],
      key = '_' + rowId,
      values = {}

    if (key in outputData) {
      let errMsg = `在 ${file} 中的 ${sheetName} 中， id：${rowId} 重复，请检查！`
      showError(errMsg)
      throw Error()
    }

    v.forEach((v, i) => {
      if (i !== idIndex) {
        let keyInner = keys[i]
        if (!isJsonEscape(keyInner)) values[keyInner] = v
      }
    })

    outputData[key] = values
  })

  // console.log(`outputdata -----> \r\n`, outputData)
  let outputPath = getJSONOutPutPath(sheetName)
  if (Array.isArray(outputPath)) {
    outputPath.forEach(v => {
      judgeRepeatAndWriteFile(outputData, v, file, sheetName)
    })
  }
  else {
    judgeRepeatAndWriteFile(outputData, outputPath, file, sheetName)
  }
}

function judgeRepeatAndWriteFile(outputData, outputPath, file, sheetName) {
  if (sheetNameSet.has(outputPath)) {
    showError(`在 ${file} 中的 ${sheetName} 表输出到 ${outputPath} 时，发现该 JSON 文件已经被生成，请检查配置文件或者检查是否表是否重名！`)
  }
  else {
    sheetNameSet.add(outputPath)
    writeFile(outputData, outputPath)
  }
}

/**
 * 
 * @param {Object | string} data 
 * @param {string} target 
 */
function writeFile(data, target) {
  fs.writeFile(target, JSON.stringify(data), err => {
    if (err) errPrompt(err)
    else {
      console.log(`文件 ${target} 生成成功！`)
    }
  })

}

/**
 * 
 * @param {string} sheetName 
 * @returns {string | string[]}
 */
function getJSONOutPutPath(sheetName) {
  let val = conf.json && conf.json[sheetName] && conf.json[sheetName].length && conf.json[sheetName]
    || path.join(conf.outputsFolderBase, sheetName + '.json')
  // console.log(val)
  return val
}

/**
 * 
 * @param {string} key 
 * @returns {boolean}
 */
function isJsonEscape(key) {
  let result
  switch (key) {
    case 'id':
      result = true
      break
    case 'tsVariable':
      result = true
      break
    case 'desc':
      result = true
      break
    default:
      result = false
  }
  return result
}