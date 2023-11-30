import{_ as s,o as n,c as a,U as l}from"./chunks/framework.83a19234.js";const F=JSON.parse('{"title":"JavaScript 获取节点，操作节点","description":"","frontmatter":{},"headers":[],"relativePath":"docs/JavaScript/DOM/节点操作.md","filePath":"docs/JavaScript/DOM/节点操作.md","lastUpdated":1701333505000}'),p={name:"docs/JavaScript/DOM/节点操作.md"},o=l(`<h1 id="javascript-获取节点-操作节点" tabindex="-1">JavaScript 获取节点，操作节点 <a class="header-anchor" href="#javascript-获取节点-操作节点" aria-label="Permalink to &quot;JavaScript 获取节点，操作节点&quot;">​</a></h1><h2 id="获取节点" tabindex="-1">获取节点 <a class="header-anchor" href="#获取节点" aria-label="Permalink to &quot;获取节点&quot;">​</a></h2><p>父节点.childNodes 获取子节点（包含一切节点）</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nodeType </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#676E95;font-style:italic;">// true 判断是否存在节点 是不是一个元素 </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1 元素节点 2 属性节点 3 文本节点</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nodeName</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// #text 文本节点的名字</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// P  元素节点的元素名 大写</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// #comment 注释节点的名字</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nodeValue </span><span style="color:#676E95;font-style:italic;">// 文本节点的内容 </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 必须是文本节点，元素节点会返回 null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">父元素</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">children 获取子节点 </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// IE9+ 正常</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// IE8-中 会获取 注释和元素节点</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 父节点</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">parentNode</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 获取直系父元素</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">offsetParent</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 获取上一个带有定位的父元素，position:stalic不算</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/* </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">兼容方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  firstchild 都有值，firstElementChild IE 会 undefined</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  短路运算 </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  firstElementChild || firstchild;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 子节点 </span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">firstChild</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 标准浏览器获取第一个 文本或换行 节点，IE 只获取第一个元素</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">firstElementChild</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 标准浏览器只获取第一个元素，IE 为 undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">lastElementChild </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> lastChild</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> 最后一个子节点</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 兄弟节点</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">previousElementSibling </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">previousSibling</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 上一个兄弟节点</span></span>
<span class="line"><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nextElementSibling </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nextSibling</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 下一个兄弟节点</span></span></code></pre></div><h2 id="操作节点" tabindex="-1">操作节点 <a class="header-anchor" href="#操作节点" aria-label="Permalink to &quot;操作节点&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 新建节点</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> li </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">p</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 新建li元素</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createTextNode</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">wenben</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 新建文本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 插入节点</span></span>
<span class="line"><span style="color:#A6ACCD;">父节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">appendChild</span><span style="color:#A6ACCD;">(li)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 父节点的末尾插入</span></span>
<span class="line"><span style="color:#A6ACCD;">父节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">insertBefore</span><span style="color:#A6ACCD;">(li</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">参照子节点)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 在参照子节点前插入</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 替换节点 </span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 替换之前的文本依然还在 ，但它在文档中已经没了自己的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">父节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replaceChild</span><span style="color:#A6ACCD;">(新节点</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">被替换的子节点)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 替换</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 删除节点 </span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 移除的节点仍然为文档所有，只不过没有了自己的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">父节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeChild</span><span style="color:#A6ACCD;">(子节点)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 删除子节点</span></span>
<span class="line"><span style="color:#A6ACCD;">节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">remove</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 自己删除自己</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 克隆节点</span></span>
<span class="line"><span style="color:#A6ACCD;">节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cloneNode</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 默认：只复制本身空标签</span></span>
<span class="line"><span style="color:#A6ACCD;">节点</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cloneNode</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// 本身与所有子节点都复制</span></span></code></pre></div>`,6),t=[o];function e(c,r,i,y,D,A){return n(),a("div",null,t)}const d=s(p,[["render",e]]);export{F as __pageData,d as default};
