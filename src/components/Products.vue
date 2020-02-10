<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="m-5" v-show="tableSelected > 0">Mesa {{ tableSelected }}</div>
    <h6 v-if="tableSelected > 0 && filteredProducts.length === 0">Mesa Livre</h6>
    <template v-if="filteredProducts.length > 0">
      <div
        class="mb-8"
        v-for="(command, index) in filteredProducts[0].commands"
        :key="index"
      >
        <h6 class="m-5">Commanda {{ command.id }}</h6>
        <ul>
          <li v-for="(product, index2) in command.products" :key="index2">
            <div>{{ product.amount }} {{ product.name }}</div>
            <div class="text-right price">
              Un {{ product.price.toFixed(2) }} | R$ {{ product.price_amount.toFixed(2) }}
            </div>
          </li>
        </ul>
        <div class="text-right">
          <strong>Subtotal</strong>
          R$ {{ calcSubTotal(command.products).toFixed(2) }}
        </div>
        <div class="text-right">
          <strong>Gorjeta</strong>
          R$ {{ (calcSubTotal(command.products) * waiterPercent).toFixed(2) }}
        </div>
        <div class="text-right">
          <strong>Total</strong>
          R$ {{ calcTotal(command.products).toFixed(2) }}
        </div>
      </div>
      <h6 class="m-5">Gorjeta Sugerida:</h6>
      <div class="text-right">
        R$ {{ compComission.toFixed(2) }}
      </div>
      <h6 class="m-5">Subtotal da mesa:</h6>
      <div class="text-right">
        R$ {{ compSubtotal.toFixed(2) }}
      </div>
      <h6 class="m-5">Total da mesa:</h6>
      <div class="text-right">
        R$ {{ compTotal }}
      </div>
      <h6 class="m-5">Total pago:</h6>
      <div class="text-right">
        R$ {{ paidTotal.toFixed(2) }}
      </div>
      <h6 class="m-5">Em aberto:</h6>
      <div class="text-right">
        R$ {{ compRest.toFixed(2) }}
      </div>
      <div class="m-5">
        <div class="col-xs-12 m-5">
          <input
            v-model="value"
            type="number"
            class="payField"
            step="0.01"
            placeholder="Valor à pagar"
            :disabled="compRest === 0"
          >
        </div>
        <div class="col-xs-12 m-5">
          <button
            type="button"
            class="buttonPay"
            :class="{ cursor: compRest > 0 }"
            title="Pagar"
            :disabled="compRest === 0"
            @click="pay($event)">
            <font-awesome-icon icon="cash-register"/>
          </button>
        </div>
      </div>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {
    commissionPercentage: {
      type: Number,
      default: 10,
    },
    filteredProducts: {
      type: Array,
      default: () => [],
    },
    filteredPayments: {
      type: Array,
      default: () => [],
    },
    tableSelected: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: 'Tell me your title',
    },
  },
  data() {
    return {
      comissions: [],
      totals: [],
      value: '',
    };
  },
  computed: {
    compComission() {
      return this.comissions.reduce((a, v) => a + v);
    },
    compRest() {
      return this.compTotal - this.paidTotal;
    },
    compSubtotal() {
      return this.totals.reduce((a, v) => a + v);
    },
    compTotal() {
      return Math.floor(this.compSubtotal * (this.waiterPercent + 1) * 100) / 100;
    },
    paidTotal() {
      let ret = 0;
      const values = [];
      this.filteredPayments.forEach((obj) => {
        values.push(parseFloat(obj.paid));
      });
      if (values.length > 0) {
        ret = values.reduce((a, v) => a + v);
      }
      return ret;
    },
    waiterPercent() {
      return (this.commissionPercentage / 100);
    },
  },
  methods: {
    calcSubTotal(arr) {
      const calc = arr.reduce((a, v) => a.price_amount + v.price_amount);
      const comission = parseFloat((calc * this.waiterPercent).toFixed(2));
      if (this.comissions.indexOf(comission) < 0) {
        this.comissions.push(comission);
      }
      if (this.totals.indexOf(calc) < 0) {
        this.totals.push(calc);
      }
      return calc;
    },
    calcTotal(arr) {
      return (this.calcSubTotal(arr) + (this.calcSubTotal(arr) * this.waiterPercent));
    },
    pay(event) {
      if (this.value !== '' && this.value > 0) {
        this.$emit(event.type, { paid: this.value, id_table: this.tableSelected });
        this.value = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.price {
  border-bottom: ptr(1) dashed black;
  padding-bottom: ptr(5);
  margin-bottom: ptr(5);
}
.payField {
  width: 100%;
  padding: ptr(7);
}
.buttonPay {
  width: 100%;
  padding: ptr(7);
  background-color: $success;
  border: ptr(1) solid black;
}
.cursor {
  cursor: pointer;
}
</style>
