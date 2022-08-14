import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 进度条开启
  NProgress.start();

  // 设置标题
  document.title = getPageTitle(to.meta.title);
  // 获取token
  const hasToken = getToken();
  // 是否登录
  if (hasToken) {
    // 登录了，去的是否为登录页
    if (to.path === "/login") {
      // 是登录页，改为首页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 不是登陆页面，就放行
      // 判断是否有用户名（判断是否有用户资料）
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        // 如果说有用户资料，则放行
        next();
      } else {
        // 没有用户资料,则请求用户资料数据
        // 发起网络请求,获取用户资料
        const { roles } = await store.dispatch("user/getInfo");
        // 筛选动态路由
        let routes = await store.dispatch(
          "permission/filterRoutes",
          roles.menus
        );
        // 动态添加路由
        router.addRoutes([
          ...routes,
          { path: "*", redirect: "/404", hidden: true },
        ]);
        next(to.path);
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
