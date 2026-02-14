let res
  function shorturl() {
  const input = document.querySelector("#text").value;
  if (!input) {
    alert("Url 不能为空!");
    return;
  }

   const pwd = window.location.pathname.substring(1);

    document.getElementById("searchbtn").disabled=true;
	document.getElementById("searchbtn").innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait...';
    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      cmd: "add",
      url: input,
      key: "",
      password: pwd
    })
    }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    res = myJson;
    document.getElementById("searchbtn").disabled=false;
	document.getElementById("searchbtn").innerHTML=' 缩短';
    if(res.status == "200")
    document.getElementById("result").innerHTML = window.location.protocol + "//" + window.location.host + "/" + res.key;
    else {
      document.getElementById("result").innerHTML = res.error;
    }
    $('#exampleModal').modal('show')
  }).catch(function(err){alert("Unknow error. Please retry!");
  console.log(err);
  document.getElementById("searchbtn").disabled=false;
	document.getElementById("searchbtn").innerHTML=' 缩短';})
  }
  function copyurl (id, attr) {
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
        console.log('复制成功')
    } catch (e) {
        console.log('复制错误')
    }

    if (attr) {
        // remove temp target
        target.parentElement.removeChild(target);
    }
  }
  $(function () {
    $('[data-toggle="popover"]').popover()
  })
  console.log("https://github.com/xyTom/Url-Shorten-Worker/")
  let notice="Notice: This service is for demonstration purposes only and the generated short links will automatically expire after 24 hours."
  if(window.location.host=="5it.me"){
    document.getElementById("notice").innerHTML=notice
  }
