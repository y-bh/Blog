/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: page description
 * @Date: 2022-05-17 10:32:22
 * @LastEditTime: 2022-05-17 13:34:28
 */

//当前网址路径
let path = location.pathname
let tems = (path.split("/")).filter((item) => item)

$('.nav .nav-item .nav-link').each((index, item) => {
  let id = $(item).attr("id")
  if (tems.length <= 1 && index == 0) {
    path = id
  }

  if (path.includes(id)) {
    $('.nav .nav-item .nav-link').get(index).click();
  }
})

$('.nav .nav-item .nav-link').on('click', function () {
  let href = $(this).attr("href")
  location.href = href
})


//跳转页面
function goPage(ev, page, type) {
  let event = ev || window.Event

  //点击跳转的目标页

  if (+event.keyCode === 13) {
    let id = event.target.value
    if (id > page) {
      id = page
    }
    if (id < 1) {
      id = 1
    }
    if (id.includes(".")) {
      id = parseInt(id)
    }


    location.href = `/help-center/${type}/${id}.html`
  }


}



//查看详情
$('.go_detail').on('click', function () {
  window.location.href = 'http://localhost:8080/helpDetails'
})


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

