<template>
  <div>
    Page 1
    <hello-world :msg="stup" />

    <button @click="emitIncrease">Increase Vuex state</button>
    <p>{{ $store.getters.getCount }}</p>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
export default {
  name: "PageFirst",
  components: {
    HelloWorld
  },
  data() {
    return {
      stup: "data"
    }
  },
  methods: {
    emitIncrease() {
      this.$store.dispatch("getValueFromAPI");
    }
  }
}
</script>