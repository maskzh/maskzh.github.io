---
title: 前后端分离的项目该如何部署？
created: '2019-12-26'
modified: '2019-12-26'
tags: [Tech/DevOps]
---

传统的项目中，后端项目一般都会有放置静态文件目录。可以把前端项目打包后放到后端的静态文件目录中，即可实现访问。

但更建议的做法是使用 Nginx 来分别代理前端项目的入口文件，代理后端接口 API。

### 代理前端文件

```
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```

这段就是配置前端文件放置的目录以及 index 对应的文件。如果你的项目是单页应用且使用 `Browser History`作为路由（例如：https://example.com/route1），那就需要加上`try_files $uri $uri/ /index.html;`这段，它会将访问的地址始终指向根目录下的`index.html`。

### 代理接口 API

```
location /api/ {
    proxy_pass http://localhost:8080/;
}
```

这段将接口 API 代理到 `/api/`下，访问`https://example.com/api/*`的请求都会被代理到`http://localhost:8080/`去。

如此这样配置，前端和后端可在同一个域下访问。能满足单机的部署，对于简单项目已经可用了。

现实后端的部署肯定是更加灵活的，集群、容器等等。例如可能会将服务暴露在`api.example.com`，与前端项目在不同的二级域名下，所以会遇到跨域的问题。

给 api 的 location 增加跨域的配置。

```
add_header 'Access-Control-Allow-Origin' $http_origin always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PATCH, DELETE' always;
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
add_header 'Access-Control-Allow-Credentials' true always;
if ($request_method = 'OPTIONS') {
  return 204;
}
```

如果有携带 `cookie` 跨域的需求，`Access-Control-Allow-Origin`是不可设置为`*`的，所以这里使用了 `$http_origin`，但这里的配置只作为参考，请自行做白名单的处理。

另外`Access-Control-Allow-xxx`设置为通配符`*`有浏览器兼容性的问题，所以需要设置准确的值。

总结一点，通常会将前端打包的静态文件放在 CDN 上，入口文件则视业务而定，如果不是一定要满足同域，入口文件也可以直接放在 CDN 上。 后端则灵活部署，最终将服务暴露出来即可。
