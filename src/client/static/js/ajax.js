class Ajax {
  
  xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

  constructor() {
  }

  get(url) {
    this.xhr.open("GET", url, true)
    this.xhr.send(null)
    this.xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          return xhr
        }else{
          return xhr.status
        }
      }
    }
  }

  post(url, params) {
    const aj = this.xhr
    return new Promise((resolve, reject) => {
      aj.open('post', url, true)
      aj.setRequestHeader('Content-type', 'application/json')
      aj.setRequestHeader('Access-Control-Allow-Origin', '*')
      aj.withCredenbtials = true
      aj.send(params)
      aj.onreadystatechange = function() {
        if(aj.readyState === 4) {
          if(aj.status === 200) {
            resolve(aj.responseText) 
          }else{
            return aj.status
          }
        }
      }
    })
  }

}

const ajax = new Ajax()