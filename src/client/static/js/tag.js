//跳转页面
function goPage(ev, page, type) {
  let event = ev || window.Event

  //点击跳转的目标页

  if (+event.keyCode === 13) {
    let id = parseInt(event.target.value)
    if (id >= page) {
      id = page
    }
    if (id < 1) {
      id = 1
    }
    location.href = `/tags/${type}/${id}.html`
  }


}



let path = location.pathname
let tems = (path.split("/")).filter((item) => item)


//上一页 下一页
function goPagePreNext(type = 'next') {

  let paths = JSON.parse(JSON.stringify(tems))

  if (paths.length <= 2) {
    return
  }


  let pageIndex = (paths[paths.length - 1])
  if (pageIndex.includes(".html")) {
    pageIndex = parseInt(pageIndex)
  }

  //返回上一页
  if (type !== 'next') {
    if (pageIndex > 1) {
      pageIndex = pageIndex - 1
    }
  } else {
    //返回下一页
    pageIndex = pageIndex + 1
  }

  paths[paths.length - 1] = `${pageIndex}.html`

  const url = paths.reduce((pre, item) => {
    return `${pre}/${item}`
  }, "")





  console.log("跳转上一页,下一页", url)
  location.href = url

}