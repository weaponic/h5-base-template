<template>
  <div>
    Page 2
    <button @click="emitIncrease">Increase Vuex state</button>
  </div>
</template>

<script>
export default {
  name: "PageSecond",
  methods: {
    emitIncrease() {
      this.$store.dispatch("getValueFromAPI");
    }
  }
}
</script>