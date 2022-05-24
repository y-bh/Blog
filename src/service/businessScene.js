




const obj = {
  '1': '市场调查',
  '2': '社交采集',
  '3': '品牌保护',
  '4': 'SEO情报',
  '5': '电子商务',
  '6': '价格监控'
}

//获取渲染的数据
module.exports = function (params) {
  let title = null
  let id = 1;
  let { currentId = '1.html' } = params
  if (currentId && currentId.includes(".html")) {
    id = currentId.replace(".html", '')
  }

  if (obj[id]) {
    title = obj[id]
  }
  return {
    title, currentId: id
  }
}