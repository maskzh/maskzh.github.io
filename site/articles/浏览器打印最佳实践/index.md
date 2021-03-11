---
title: 浏览器打印最佳实践
created: '2021-03-11'
modified: '2021-03-11'
tags: [Tech/DOM]
---

Web 应用的打印总是有各种各样的问题，而且`window.print`不能局部打印页面中某一个部分。

那如何实现局部呢？在尝试多种方式之后，我总结了比较简洁且无副作用的实践。

在页面结构的任何层级下实现类似如下结构：

```html
<div id="print">
  <div className="print-page">页内容</div>
  <div className="print-page">页内容</div>
</div>
```

与打印有关的 CSS：

```css
@media print {
  /* 将非打印页的内容全部 display: none */
  body > :not(.print-page) {
    display: none;
  }
  /* 分页，最后一页不要分页，不然打印时会多出来一张空白页 */
  body > .print-page:not(:last-child) {
    page-break-after: always;
  }
}
```

实现打印的 JS：

```typescript
function onPrint() {
  const printNode = document.getElementById('print');
  if (!printNode) return;
  const pageNodes = printNode.querySelectorAll('.print-page');
  if (!pageNodes) return;

  pageNodes.forEach((node) => document.body.appendChild(node)); // 将打印页移动到 body 下
  window.print(); // 进行打印
  pageNodes.forEach((node) => printNode.appendChild(node)); // 将打印页移回原来的位置
}
```

`appendChild`方法对于已经存在于当前文档树中的元素，会将它从原先的位置**移动**到新的位置。注意是移动而不是复制。
