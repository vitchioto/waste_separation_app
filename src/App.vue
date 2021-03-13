<template>
  <Map
    v-if="bins"
  />
</template>

<script>
import Map from './components/Map.vue';

export default {
  name: 'App',
  components: {
    Map,
  },
  computed: {
    bins() {
      return this.$store.state.bins;
    },
  },
  created() {
    this.$store.dispatch('loadPins');
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
