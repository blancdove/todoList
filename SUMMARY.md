1. 使用路由 实现切换清单

	利用路由信息中的jquery传递参数

2. 使用缓存 实现刷新页面读取数据

	使用localStorage实现数据持久化

	使用sessionStorage实现会话级别的保存，即当前浏览器标签关闭后数据会被清除

	watch侦听器侦听todos的变化来设置缓存（需要深度监听，因为completed也需要监听改变）

	页面刷新后id发生重置，所以备忘id也需要缓存

