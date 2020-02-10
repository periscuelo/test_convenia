import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import Tables from './modules/tables';
import Products from './modules/products';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    Tables,
    Products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
