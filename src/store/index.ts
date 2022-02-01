import { createStore } from "vuex";
import { Firestore, FirestoreConfig } from "../modules/firestore";

export default createStore({
  state: {
    pages: [],
    reports: [],
    firestore: Firestore
  },
  mutations: {
    pages(state, pages) {
      state.pages = pages;

      console.log(pages);
    },
  },
  actions: {
    async initFirestore({ commit }, config: FirestoreConfig) {
      const firestore = new Firestore(config);

      const pages = await firestore.getPages();

      commit("pages", pages);
    }
  },
  modules: {},
});
