import Vue from 'vue';
import Vuex from 'vuex';
import overdueData from './modules/overdueData';
import createLogger from 'common/js/plugins/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    overdueData
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
