# typescript-practice

如安装了webpack5，cli4，本地服务器启动的时候会报`Error: Cannot find module 'webpack-cli/bin/config-yargs'`

解决方法：`webpack-dev-server` 命令改成了 `webpack serve`，而不是将webpack降级到4，cli降级到3这种做法

`cross-env`这个插件是用于`process.env.NODE_ENV`，在执行命令的时候后面跟着一个参数`NODE_ENV=development`即可访问