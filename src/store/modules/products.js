import { CHANGE_PRODUCTS_PAID } from '../mutations-types';

const getters = {
  filterProducts: state => (idTable) => {
    const data = state.products.filter(product => product.id_table === idTable);
    return data;
  },
  filterPayments: state => (idTable) => {
    const data = state.payments.filter(payment => payment.id_table === idTable);
    return data;
  },
};

const mutations = {
  [CHANGE_PRODUCTS_PAID](state, value) {
    state.payments = value;
  },
};

const actions = {
  setPayment({ state, commit }, data) {
    const payments = [...state.payments];
    payments.push(data);
    commit(CHANGE_PRODUCTS_PAID, payments);
  },
};

const state = {
  products: [
    {
      id_table: 2,
      commands: [
        {
          id: 1,
          products: [
            {
              amount: 1,
              name: 'Bife à Parmegiana',
              paid: false,
              price: 25.65,
              price_amount: 25.65,
            },
            {
              amount: 1,
              name: 'Coca Cola Lata',
              paid: false,
              price: 4,
              price_amount: 4,
            },
          ],
        },
        {
          id: 2,
          products: [
            {
              amount: 1,
              name: 'Fígado Acebolado',
              paid: false,
              price: 15.4,
              price_amount: 15.4,
            },
            {
              amount: 2,
              name: 'Guaraná Lata',
              paid: false,
              price: 4,
              price_amount: 8,
            },
          ],
        },
        {
          id: 3,
          products: [
            {
              amount: 1,
              name: 'Omelete',
              paid: false,
              price: 13,
              price_amount: 13,
            },
            {
              amount: 1,
              name: 'Água com gás',
              paid: false,
              price: 2,
              price_amount: 2,
            },
          ],
        },
      ],
    },
  ],
  payments: [],
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
