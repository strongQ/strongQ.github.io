---

layout:        post
title:         web
description:   something memory
keywords:      web
categories:    [web]
tags:          [web]

---

----------------------------


### 1、nativefier包装工具
   
    可以把web项目包装为cs程序，方便快速。

### 2、git ssh key生成命令
     ssh-keygen -t rsa -C "邮箱地址"

### 3、angualr环境全局安装
    首先安装node环境，然后
    npm install -g @angular/cli

### 4、ionic环境全局安装
    npm install -g ionic 
    
### 5、vscode调试本地文件
      "type": "chrome",
            "request": "launch",
            "sourceMaps": true,
            "port": 9222,
            "userDataDir":true,
            "name": "Launch Chrome against localhost",
            "file":"${workspaceFolder}/index.html",
           // "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}" 
    
