# 基于vue-admin-template的管理系统胚子

1. 项目启动：建议使用`yarn`包管理工具；可能会存在`node-sass`报错！如果出现该报错建议node版本降级到14
2. 如果安装依赖出错，建议删除.lock文件
3. 项目启动指令： `npm run dev` ；项目打包指令`npm run build:prod`； 具体其他指令参见`package.json` 里面的`script`
4. 该项目改动过，mock固定模拟账号为 admin；密码 admin888
5. 跨域代理配置在`vue.config.js`的`devServer`里面的`proxy`里面，注意`proxy`不可以为空对象，要么就别写
6. 开发环境的接口地址在`.env.development`，生产环境地址在`.env.production`里面的VUE_APP_BASE_API
7. 请求实例`utils/request.js`中：
   1. 注意baseURL读取的是环境变量VUE_APP_BASE_API
   2. 注意请求拦截器里面携带的token的名称 `config.headers['???具体问后端名称是啥']`
   3. 注意响应拦截器里面的代码（集中处理错误，解构数据）
8. 梳理登录流程
   1. `login/index.vue` 校验结束之后，触发`store/modules/user.js`模块里面的`login`action
   2. `login`的action方法去调用 `api/user.js`里面的请求方法发生请求，得到数据返回
   3.  `login`的action方法得到数据之后，触发设置token的mutation方法，并且记录到本地cookie中（调用的auth.js里面的方法）
   4. 登录成功，执行跳转逻辑，走导航守卫(`src/permission.js`)文件
   5. 导航守卫逻辑
      1. 