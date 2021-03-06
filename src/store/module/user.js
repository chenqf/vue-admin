import { setToken, getToken } from "@/libs/tool";

import { login, userInfo } from "@/api/user";

export default {
  state: {
    hasGetInfo: false,
    id: "",
    name: "",
    photo: "",
    token: getToken(),
    roles: []
  },
  getters: {
    avatarImage: state => state.photo
  },
  mutations: {
    setHasGetInfo(state, status) {
      state.hasGetInfo = status;
    },
    setId(state, id) {
      state.id = id;
    },
    setPhoto(state, photo) {
      state.photo = photo;
    },
    setName(state, name) {
      state.name = name;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setRoles(state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    // 登录
    handleLogin({ commit }, { name, password }) {
      return login({
        name,
        password
      }).then(res => {
        commit("setToken", res.token);
      });
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit("setToken", "");
        commit("setId", "");
        commit("setName", "");
        commit("setPhoto", "");
        commit("setRoles", []);
        commit("setHasGetInfo", false);
        resolve();
      });
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return userInfo().then(res => {
        commit("setRoles", res.roles);
        commit("setId", res.id);
        commit("setName", res.name);
        commit("setPhoto", res.photo);
        commit("setHasGetInfo", true);
        return res;
      });
    }
  }
};
