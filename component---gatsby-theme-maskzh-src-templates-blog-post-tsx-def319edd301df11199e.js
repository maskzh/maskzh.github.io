(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"R+b2":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return x}));var n=a("JF+v"),r=a("jTUD"),l=a.n(r),c=a("Wbzz"),s=a("NWgQ"),m=a.n(s),o=a("mXGw"),i=a.n(o);function u(e){var t=e.markdownRemark,a=t.frontmatter,r=a.title,l=a.tags;return i.a.createElement("article",{className:"py-8"},i.a.createElement("header",{className:"mb-8"},i.a.createElement("h1",{className:"mb-4 text-4xl font-bold"},r),l&&i.a.createElement("div",{className:"-mx-1"},l.map((function(e){return i.a.createElement("span",{key:e,className:"inline-block px-3 py-1 mx-1 text-sm bg-red-50 rounded-full cursor-pointer hover:bg-red-500 hover:text-white",onClick:function(){return t=e.split("/").reverse()[0],void Object(n.navigate)("?tag="+t);var t}},"#",e)})))),i.a.createElement("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:t.html}}))}var d=a("fvfA"),b=a("js1s"),f=a("0xBO");function x(e){var t=e.path,a=e.data,r=a.site,s=a.markdownRemark,x=Object(o.useContext)(b.b).posts,p=Object(n.useLocation)(),k=m.a.parse(p.search).tag,v=x.filter((function(e){return Object(f.b)(e.tags,k)})).filter((function(e){return e.slug!==t})).sort((function(e,t){return l()(t.date).unix()-l()(e.date).unix()})).slice(0,3);return i.a.createElement("div",null,i.a.createElement(c.Link,{to:"/",className:"block py-2 shadow text-lg font-bold text-center"},r.siteMetadata.title),console.log(s),i.a.createElement("div",{className:"px-6 mx-auto",style:{maxWidth:800}},i.a.createElement(d.a,{title:s.frontmatter.title}),i.a.createElement(u,{markdownRemark:s}),v.length>0&&i.a.createElement("h3",{className:"text-base font-medium"},"延伸阅读"),v.map((function(e){var t=e.title,a=e.date,n=e.content,r=e.slug;return i.a.createElement(c.Link,{key:r,to:r,className:"block py-4 border-b"},i.a.createElement("time",{className:"text-gray-400 text-xs font-medium"},l()(a).format("YYYY-MM-DD")),i.a.createElement("h3",{className:"text-base text-black font-bold truncate"},t),i.a.createElement("p",{className:"mt-1 text-sm text-gray-800"},n))}))))}}}]);
//# sourceMappingURL=component---gatsby-theme-maskzh-src-templates-blog-post-tsx-def319edd301df11199e.js.map