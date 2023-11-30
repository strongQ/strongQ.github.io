---
layout: home
class: home
hero:
  name: web技术学习
  image:
    src: /logo.png
    alt: web技术学习
  text: web技术与软件导航分享
  tagline: 包含网址导航、软件分享、HTML、CSS、JavaScript、Vue、React、TypeScript、C#...
  actions:
    - theme: brand
      text: 网址导航
      link: /pages/navigation
    - theme: brand
      text: 软件下载
      link: /pages/software
    - theme: brand
      text: 在线游戏
      link: /pages/game
    - theme: alt
      text: 更新日志
      link: /docs/关于/更新日志
    - theme: alt
      text: 支持我
      link: /docs/关于/支持我
    - theme: alt
      text: 交流群
      link: /docs/关于/交流群
features:
  - icon: ❤
    title: 循序渐进
    details: 霜落荆门江树空，布帆无恙挂秋风。
  - icon: ✨
    title: 导航与软件
    details: 荷风送香气，竹露滴清响。
  - icon: 🚶‍♂️
    title: 关于我
    details: 花非花，雾非雾，夜半来，天明去。。
---


<style>
@media (min-width: 960px) {
  .home .VPHero.has-image .main {
    max-width: 640px;
  }
}

.VPFeatures + .VPFeatures,
.site_pv ~ .site_pv {
  display: none;
}

.site_pv{
  text-align: center;
  padding: 2em;
}
</style>
