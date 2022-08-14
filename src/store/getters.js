const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  points: (state) => {
    if (state.user.roles) {
      return state.user.roles.points;
    } else {
      return [];
    }
  },
};
export default getters;
