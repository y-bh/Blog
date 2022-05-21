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


    location.href = `/tags/${type}/${id}.html`
  }


}
