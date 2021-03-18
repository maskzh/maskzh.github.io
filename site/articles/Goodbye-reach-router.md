---
title: Goodbye reach-router
created: '2021-03-18'
modified: '2021-03-18'
tags: [Tech/Web]
---

在[reach-router](https://github.com/reach/router)彻底死掉之前，记录一下它存在过。[reach-router](https://github.com/reach/router)的作者是[Ryan Florence](https://twitter.com/ryanflorence)，他同时也是[react-router](https://github.com/ReactTraining/react-router)的作者之一。

19年作者表示reach-router将会在reach-router中新生（[React Training: The Future of React Router and @reach/router](https://reacttraining.com/blog/reach-react-router-future)）。

现在回头一看，原来react-router 5.x早在两年前就发布了。这两年我一直有在使用 reach-router，因为它功能够用、表达简洁。

对比react-router和reach-router Router的写法。
```jsx
{/* react-router */}
<Router>
	<Switch>
	  <Route exact path="/dashboard">
		<DashboardRoute prop={false} />
	  </Route>
	</Switch>
</Router>

{/* reach-router */}
<Router>
	<DashboardRoute path="/dashboard" prop={false} />
</Router>
```
可以看出 reach-router 简洁许多。

reach-router还有一个很棒的特性是[Nesting and Relative Links](https://reach.tech/router/nesting)，举个例子，比如你当前处于`/dashboard`。

前往`/dashboard/trends`，你可以有下面两种写法，第二种写法就是Relative Links。
```jsx
<Link to="/dashboard/trends" />
<Link to="trends" />
```

如果你要返回`/dashboard`，你还可以这么写。
```jsx
<Link to="../" />
```

当然react-router4.x也开始支持Nesting and Relative Links了，但不如reach-router实现得好。

这是reach-router印象较为深刻的特性，除此之外reach-router是更容易上手的，概念更少，也更符合直觉。

reach-router定义的路由，默认就是严格匹配的，如果你想模糊匹配你就必须用[Trailing Wildcard](https://reach.tech/router/api/RouteComponent)。
例如定义嵌套路由的写法，UserCenter 中会定义嵌套路由。
```jsx
{/* reach-router */}
<UserCenter path="/user/*" />
{/* react-router */}
<Route path="/user">
	<UserCenter/>
<Route>
```
这就是我觉得reach-router更符合直觉的地方。

当然话说回来，相对react-router，reach-router的简洁也意味简陋，很多特性是缺失的，例如拦截路由进出等功能。还是推荐大家使用react-router吧，Goodbye reach-router。
