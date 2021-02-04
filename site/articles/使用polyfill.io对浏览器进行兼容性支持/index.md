---
title: 使用 polyfill.io 对浏览器进行兼容性支持
created: '2021-01-25'
modified: '2021-01-25'
tags: [Tech/DOM]
---

尝试了 [react-app-polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md) 等方式，发现仍然无法很好解决兼容性的问题，而且可配置性也不够，一些 API 也没有支持。

polyfill.io 是另外一个的选择。

polyfill.io 会自动识别浏览器的 UA，判断该特性是否需要 polyfill，然后自动生成代码，输出到浏览器。在浏览器不需要 polyfill 的情况下，既减少了不必要的代码运行，也减少不必要带宽传输。

相比将兼容代码打包进业务代码中，一定程度上减少了包的体积。尤其对于使用现代浏览器的终端，因为它们其实并不需要这些代码。

但缺点也是明显的，就是多了一个外部资源的引用，而且还不是透明的。**有条件可以选择自建一个**。

通过配置 `features`，你可以选择加载你需要的特性，例如 `fetch`、`proxy` 等，详细的用法见 [polyfill.io API Reference](https://polyfill.io/v3/api/)。

polyfill.io 默认的源如下：

```
https://cdn.polyfill.com/v3/polyfill.min.js??features=fetch%2CmatchMedia%2Cdefault%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019
```

但这个源的访问比较慢，而且不太稳定。国内建议使用阿里云的源：

```
https://polyfill.alicdn.com/polyfill.min.js??features=fetch%2CmatchMedia%2Cdefault%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019
```
