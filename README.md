# Excel-Transformer

**目的：**

将 Excel 文件转换为 `JSON` 或者 `TS` 或者 `JS` 文件。

将文件输出到指定的目录中。可以在 `transformConfig.json` 中设定表名对应的规则。

**解决场景：**

多语言配表：
产品只需要将 EXCEL 配表之后，运行 CMD 脚本，此时程序员就可以拿到自己需要的格式的配表文件。而无需关心配表工作。

## 使用

1. 将需要转换格式的 Excel 放入 `excel_need_transform` 文件夹。
**注意**：请按照 `excel-demo.xlsx` 的格式编辑。

2. 双击 `transform.cmd`。
`excel_need_transform` 文件夹中所有的 Excel 文件会转换成 JSON 之后输出到 `outputs` 文件夹。

## EXCEL 格式

前两行固定格式：第一行为字段，第二行为自定义字段类型。

|  字段  |  说明  |
| ---- | ---- |
|  id  |  必须。行的唯一标识符，用来获取当前行。<br>**必须为int类型**。  |
|  tsVariable  |  TS 文件中的静态成员名。  |
|  desc  |  注释，生成 TS 文件时会为属性添加注释。  |
|  自定义  |  自定义的字段会直接设置为对象成员。  |


