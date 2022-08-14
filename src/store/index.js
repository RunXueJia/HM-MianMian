import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import permission from "./modules/permission";

import tagsView from './modules/tagsView'

import background from "./modules/background";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,

    tagsView,

    background,

  },
  getters,
});
// 重置一个路由实例
export function resetRouter() {
  // 创建一个新的路由实例
  const newRouter = createRouter();
  // 将路由实例的matcher变成新的即可
  router.matcher = newRouter.matcher; // reset router
}

export default store;
