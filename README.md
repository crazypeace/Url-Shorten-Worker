# 演示
短链系统 https://1way.eu.org/bodongshouqulveweifengci

网络记事本 Pastebin https://pastebin.lvedong.eu.org/tieludasiliqiuweiyue

图床 Image Hosting https://imghost.crazypeace.workers.dev/imghostimghost

网络日记本 NetJournal 支持Markdown https://journal.crazypeace.workers.dev/journaljournal

## 完整的部署教程
https://zelikk.blogspot.com/2022/07/url-shorten-worker-hide-tutorial.html

## 如果不想被作者的更新影响
- Fork一份自己的Repo.
  
- 在Cloudflare的worker.js中搜索`"https://crazypeace.github.io/Url-Shorten-Worker/" + config.theme + "/index.html"`, 把其中的`crazypeace`改为你自己的, 这样Cloudflare的worker就会拉你自己的这一份index.html
  ![image](https://github.com/crazypeace/Url-Shorten-Worker/assets/665889/c98ca134-2809-4490-b9f7-ac27ba735e2e)

- 在你自己fork出来的这份Repo里, 修改index.html, 搜索`"https://crazypeace.github.io/Url-Shorten-Worker/main.js"`, 把其中的`crazypeace`改为你自己的, index.html就会拉你自己的main.js
  ![image](https://github.com/crazypeace/Url-Shorten-Worker/assets/665889/5f283aa2-d57f-4679-a987-757f1590e8f9)

- 激活你自己的Repo的GitHub Pages功能. (具体操作请google, 不详细展开了)

# 在原版基础上的修改说明
直接访问域名返回404。在KV中设置一个entry，保存秘密path，只有访问这个path才显示使用页面。  
https://zelikk.blogspot.com/2022/07/url-shorten-worker-hide-tutorial.html

支持自定义短链  
https://zelikk.blogspot.com/2022/07/url-shorten-worker-custom.html

API 不公开服务  
https://zelikk.blogspot.com/2022/07/url-shorten-worker-api-password.html

页面缓存设置过的短链  
https://zelikk.blogspot.com/2022/08/url-shorten-worker-localstorage.html

长链接文本框预搜索localStorage  
https://zelikk.blogspot.com/2022/08/url-shorten-worker-bootstrap-list-group-oninput.html

增加按钮可以删除某条短链  
https://zelikk.blogspot.com/2022/08/url-shorten-worker-delete-kv-localstorage.html

访问计数功能 可查询短链 成为功能完整的短链API系统  
https://zelikk.blogspot.com/2023/11/url-shorten-worker-visit-count-api-api.html

阅后即焚功能, 可制作一次性二维码  
https://zelikk.blogspot.com/2023/11/url-shorten-worker-snapchat-mode.html

增加读取 KV 中全部记录的功能  
https://zelikk.blogspot.com/2024/01/url-shorten-worker-load-cloudflare-kv.html

变身网络记事本 Pastebin  
https://zelikk.blogspot.com/2024/01/url-shorten-worker-pastebin.html

保护 'password' key  
https://zelikk.blogspot.com/2024/01/url-shorten-worker-password-protect-keylist.html

变身图床 Image Hosting  
https://zelikk.blogspot.com/2024/01/url-shorten-worker-image-hosting-base64.html

变身网络日志本 支持 Markdown  
https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal.html  
https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal-markdown.html  
https://zelikk.blogspot.com/2024/04/url-shorten-worker-netjournal-markdown.html

# 用你的STAR告诉我这个Repo对你有用 Welcome STARs! :)
[![Stargazers over time](https://starchart.cc/crazypeace/Url-Shorten-Worker.svg)](https://starchart.cc/crazypeace/Url-Shorten-Worker)
