import { getPermissionMenus } from "@/api/menus";

export default {
  namespaced: true,
  state: {
    permMenus: [],
  },
  getters: {},
  mutations: {
    setPerm(state, data) {
      state.permMenus = data;
    },
  },
  actions: {
    async getPermMenus(context, data) {
      const res = await getPermissionMenus();
      // console.log(res);
      res.map((item) => {
        if (item.childs || item.points) {
          item.children = item.childs || item.points;
          delete item.childs;
          item.children.map((val) => {
            if (val.points) {
              val.children = val.points;
              delete val.points;
            }
          });
        }
      });
      context.commit("setPerm", res);
      return res;
    },
  },
};
