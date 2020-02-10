<template>
  <div class="container clear-fix">
    <div class="col-xs-5 col-sm-5 col-md-4 col-lg-3 col-xl-3 products">
      <Products
        :filteredProducts="filterProducts(tableSelected)"
        :filteredPayments="filterPayments(tableSelected)"
        :tableSelected="tableSelected"
        title="Produtos"
        @click="setPayment"
      >
        <p class="m-5">Escolha a mesa ao lado</p>
      </Products>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-7 col-lg-8 col-xl-8 tables">
      <Tables
        title="Mesas"
        :tables="tables"
        @click="setTableSelected"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Products from '@/components/Products.vue';
import Tables from '@/components/Tables.vue';

export default {
  name: 'home',
  computed: {
    ...mapGetters('Products', ['filterPayments', 'filterProducts']),
    ...mapState('Tables', ['tables', 'tableSelected']),
    ...mapState('Products', ['filteredProducts', 'payments']),
  },
  methods: {
    ...mapActions('Tables', ['setTableSelected']),
    ...mapActions('Products', ['setPayment']),
  },
  components: {
    Products,
    Tables,
  },
};
</script>

<style lang="scss" scoped>
.products {
  @extend .m-5, .p-10;
  border: ptr(2) solid $primary;
}
.tables {
  @extend .m-5, .p-10;
  border: ptr(2) solid $info;
}
</style>
