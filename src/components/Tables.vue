<template lang="html">
  <div>
    <h3>{{ title }}</h3>
    <div
      class="col-xs-12 col-sm-5 col-md-3 col-lg-2 col-xl-2 tablediv"
      :class="{ free: !table.busy, busy: table.busy }"
      v-for="(table, index) in tables"
      :key="index"
      @click="$emit(event, table.id)">
      <font-awesome-icon icon="utensils"/>
      <div class="details">
        {{ table.id }} {{ table.status }}
      </div>
      <div class="details">
        {{ table.commands }} Comanda(s)
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tables',
  props: {
    event: {
      type: String,
      default: 'click',
    },
    tables: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'Tell me your title',
    },
  },
};
</script>

<style lang="scss" scoped>
.tablediv {
  @extend .py-16, .text-center;
  cursor: pointer;
  >.details {
    font-size: ptr(12);
  }
}
.free {
  border: ptr(2) solid $success;
}
.busy {
  border: ptr(2) solid $danger;
}
</style>
