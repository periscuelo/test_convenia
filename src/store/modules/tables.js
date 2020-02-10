import { CHANGE_TABLE_SELECTED } from '../mutations-types';

const getters = {};

const mutations = {
  [CHANGE_TABLE_SELECTED](state, value) {
    state.tableSelected = value;
  },
};

const actions = {
  setTableSelected({ commit }, idTable) {
    commit(CHANGE_TABLE_SELECTED, idTable);
  },
};

const state = {
  tables: [
    {
      id: 1,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 2,
      status: 'Ocupada',
      commands: 3,
      busy: true,
    },
    {
      id: 3,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 4,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 5,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 6,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 7,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 8,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 9,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
    {
      id: 10,
      status: 'Livre',
      commands: 0,
      busy: false,
    },
  ],
  tableSelected: 0,
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
