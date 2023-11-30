# Nginx命令
## windows端关闭进程
```sh
taskkill /f /t /im nginx.exe 
```
## 操作命令
```sh
start nginx

nginx -s stop

nginx -s reload
```

# Nginx配置
vue部署
```sh
# 配置netcore api地址，配置多个进行负载均衡
upstream netcore {
     server localhost:5005;
    }
server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
      
        # 匹配到 /api/ 转发到 后端地址
        location  /api/ {
        
        proxy_pass http://netcore;
        }
        location  /upload/ {
        
        proxy_pass http://netcore;
        }

        location  /Signature/ {
        
        proxy_pass http://netcore;
        }

        location  /Avatar/ {
        
        proxy_pass http://netcore;
        }

        
	
        location  /hubs/ {
        proxy_pass http://netcore;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        #proxy_read_timeout 600s;#设置websocket超时时间
        }

        location / {
            root   html;
            index  index.html index.htm;
        }
   }
```

# Docker部署
## 准备工作
```sh
#启动一个容器
 docker run -d --name nginx nginx
# 查看 容器 获取容器ID 或直接使用名字
 docker container ls
# 在当前目录下创建目录：conf 
 mkdir conf
# 拷贝容器内 Nginx 默认配置文件到本地当前目录下的 conf 目录（$PWD 当前全路径）
 docker cp nginx:/etc/nginx/nginx.conf $PWD/conf
docker cp nginx:/etc/nginx/conf.d $PWD/conf

# 停止容器
 docker container stop nginx
# 删除容器
 docker container rm nginx

# 在当前目录下创建目录：html 放静态文件
 mkdir html
```
## 部署容器
```sh
docker run -d -p 80:80  \
              -p 443:443  \
 --name nginxweb \
 --link answer-server:answerserver \
 -v /usr/local/docker/nginx/html:/usr/share/nginx/html \
 -v /usr/local/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
 -v /usr/local/docker/nginx/conf/conf.d:/etc/nginx/conf.d \
 -v /usr/local/docker/nginx/logs:/var/log/nginx \
 nginx 
```