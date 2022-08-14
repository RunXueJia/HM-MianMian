import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import router from "@/router";
const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    roles: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    // console.log(token);
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // 登陆的操作，将token存储到state和cookie
  async login({ commit }, userInfo) {
    let { username, password } = userInfo;
    let sha256 = require("js-sha256").sha256; //这里用的是require方法
    password = sha256(password);
    const data = await login({ username: username.trim(), password: password });
    // console.log(data);
    commit("SET_TOKEN", data.token);
    setToken(data.token);
  },

  // 获取用户资料
  async getInfo({ commit }) {
    let data = await getInfo();
    commit("SET_NAME", data.name);
    commit("SET_AVATAR", data.avatar);
    commit("SET_ROLES", data.roles);
    return data;
  },

  // user logout
  logout({ commit, state }) {
    removeToken(); // must remove  token  first
    resetRouter();
    commit("RESET_STATE");
    commit("permission/setRoutes", [], { root: true });

    router.push("/login");
  },

  // remove token
  resetToken({ commit }) {
    removeToken(); // must remove  token  first
    commit("RESET_STATE");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
