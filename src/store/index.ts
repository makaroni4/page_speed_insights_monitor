import { createStore } from "vuex";
import { Firestore, FirestoreConfig } from "../modules/firestore";

type DeviceReport = {
  first_contentful_paint: number;
  first_cpu_idle: number;
  first_meaningful_paint: number;
  speed_index: number;
  time_to_interactive: number;
};

type UrlReport = {
  mobile: DeviceReport;
  desktop: DeviceReport;
  original_url?: string;
};

type UrlReports = {
  [key: string]: UrlReport;
};

export default createStore({
  state: {
    dataIsReady: false,
    urlReports: {},
    firestore: Firestore,
  },
  getters: {
    urlReports(state) {
      return state.urlReports;
    },
    dataIsReady(state) {
      return state.dataIsReady;
    },
  },
  mutations: {
    reports(state, reports) {
      const urlReports: UrlReports = {};

      reports.forEach((report: UrlReport) => {
        if (report.original_url) {
          const url = report.original_url;

          urlReports[url] = {
            mobile: report.mobile,
            desktop: report.desktop,
          };
        }
      });

      state.urlReports = urlReports;
      state.dataIsReady = true;
    },
  },
  actions: {
    async initFirestore({ commit }, config: FirestoreConfig) {
      const firestore = new Firestore(config);

      const reports = await firestore.getReports();

      commit("reports", reports);
    },
  },
  modules: {},
});
