let res

// let apiSrv = "https://1way.eu.org"
let apiSrv = window.location.pathname

function shorturl() {
  if (document.querySelector("#longURL").value == "") {
    alert("Url cannot be empty!")
    return
  }

  document.getElementById("addBtn").disabled = true;
  document.getElementById("addBtn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait...';
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "add", url: document.querySelector("#longURL").value, key: document.querySelector("#keyPhrase").value, password: document.querySelector("#passwordText").value })
  }).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      res = myJson;
      document.getElementById("addBtn").disabled = false;
      document.getElementById("addBtn").innerHTML = 'Shorten it';

      // 成功生成短链
      if (res.status == "200") {
        let keyPhrase = res.key;
        let valueLongURL = document.querySelector("#longURL").value;
        // save to localStorage
        localStorage.setItem(keyPhrase, valueLongURL);
        // add to urlList on the page
        addUrlToList(keyPhrase, valueLongURL)

        document.getElementById("result").innerHTML = window.location.protocol + "//" + window.location.host + "/" + res.key;
      } else {
        document.getElementById("result").innerHTML = res.error;
      }

      $('#resultModal').modal('show')

    }).catch(function (err) {
      alert("Unknow error. Please retry!");
      console.log(err);
      document.getElementById("addBtn").disabled = false;
      document.getElementById("addBtn").innerHTML = 'Shorten it';
    })
}

function copyurl(id, attr) {
  let target = null;

  if (attr) {
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      let curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    } else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
  } else {
    target = document.querySelector('#' + id);
  }

  try {
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('Copy success')
  } catch (e) {
    console.log('Copy error')
  }

  if (attr) {
    // remove temp target
    target.parentElement.removeChild(target);
  }
}

function loadUrlList() {
  // 清空列表
  let urlList = document.querySelector("#urlList")
  while (urlList.firstChild) {
    urlList.removeChild(urlList.firstChild)
  }

  // 文本框中的长链接
  let longUrl = document.querySelector("#longURL").value
  console.log(longUrl)

  // 遍历localStorage
  let len = localStorage.length
  console.log(+len)
  for (; len > 0; len--) {
    let keyShortURL = localStorage.key(len - 1)
    
    // Skip adding the entry if the key is "password"
    if (keyShortURL === "password") {
      continue;
    }
    
    let valueLongURL = localStorage.getItem(keyShortURL)

    // 如果长链接为空，加载所有的localStorage
    // 如果长链接不为空，加载匹配的localStorage
    if (longUrl == "" || (longUrl == valueLongURL)) {
      addUrlToList(keyShortURL, valueLongURL)
    }
  }
}

function addUrlToList(shortUrl, longUrl) {
  let urlList = document.querySelector("#urlList")

  let child = document.createElement('div')
  child.classList.add("list-group-item")

  // 删除按钮
  let delBtn = document.createElement('button')
  delBtn.setAttribute('type', 'button')
  delBtn.classList.add("btn", "btn-danger")
  delBtn.setAttribute('onclick', 'deleteShortUrl(\"' + shortUrl + '\")')
  delBtn.setAttribute('id', 'delBtn-' + shortUrl)
  delBtn.innerText = "X"
  child.appendChild(delBtn)

  // 查询访问次数按钮
  let qryCntBtn = document.createElement('button')
  qryCntBtn.setAttribute('type', 'button')
  qryCntBtn.classList.add("btn", "btn-info")
  qryCntBtn.setAttribute('onclick', 'queryVisitCount(\"' + shortUrl + '\")')
  qryCntBtn.setAttribute('id', 'qryCntBtn-' + shortUrl)
  qryCntBtn.innerText = "?"
  child.appendChild(qryCntBtn)

  // 短链接信息
  let keyTxt = document.createElement('span')
  keyTxt.classList.add("lnk")
  keyTxt.innerText = window.location.protocol + "//" + window.location.host + "/" + shortUrl
  child.appendChild(keyTxt)
  
  // 长链接信息
  let valueTxt = document.createElement('div')
  valueTxt.classList.add("lnk")
  valueTxt.innerText = longUrl
  child.appendChild(valueTxt)

  urlList.append(child)
}

function clearLocalStorage() {
  localStorage.clear()
}

function deleteShortUrl(delKeyPhrase) {
  // 按钮状态
  document.getElementById("delBtn-" + delKeyPhrase).disabled = true;
  document.getElementById("delBtn-" + delKeyPhrase).innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';

  // 从KV中删除
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "del", key: delKeyPhrase, password: document.querySelector("#passwordText").value })
  }).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      res = myJson;

      // 成功删除
      if (res.status == "200") {
        // 从localStorage中删除
        localStorage.removeItem(delKeyPhrase)

        // 加载localStorage
        loadUrlList()

        document.getElementById("result").innerHTML = "Delete Successful"
      } else {
        document.getElementById("result").innerHTML = res.error;
      }

      $('#resultModal').modal('show')

    }).catch(function (err) {
      alert("Unknow error. Please retry!");
      console.log(err);
    })
}

function queryVisitCount(qryKeyPhrase) {
  // 按钮状态
  document.getElementById("qryCntBtn-" + qryKeyPhrase).disabled = true;
  document.getElementById("qryCntBtn-" + qryKeyPhrase).innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';

  // 从KV中查询
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "qry", key: qryKeyPhrase + "-count", password: document.querySelector("#passwordText").value })
  }).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      res = myJson;

      // 成功查询
      if (res.status == "200") {
        document.getElementById("qryCntBtn-" + qryKeyPhrase).innerHTML = res.url;
      } else {
        document.getElementById("result").innerHTML = res.error;
        $('#resultModal').modal('show')
      }

    }).catch(function (err) {
      alert("Unknow error. Please retry!");
      console.log(err);
    })
}

$(function () {
  $('[data-toggle="popover"]').popover()
})

loadUrlList()
