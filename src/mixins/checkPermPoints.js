import store from "@/store";
import { Store } from "vuex";
export default {
  methods: {
    checkPermPoints(str) {
      if (!store.getters.token) return false;
      return store.getters.points.includes(str);
    },
  },
};
