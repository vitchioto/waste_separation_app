<template>
  <Map
    v-if="bins"
  />
  <Scanner
    v-if="showScanner"
    @closeScanner="setScanner(false)"
  />
  <button
    class="button button--scanner"
    @click="setScanner(true)"
    v-html="'Skenuj'"
  />
</template>

<script>
import Map from './components/Map.vue';
import Scanner from './components/Scanner.vue';

export default {
  name: 'App',
  components: {
    Map,
    Scanner,
  },
  data() {
    return {
      showScanner: false,
    };
  },
  computed: {
    bins() {
      return this.$store.state.bins;
    },
  },
  created() {
    this.$store.dispatch('loadPins');
  },
  methods: {
    setScanner(payload) {
      this.showScanner = payload;
    },
  },
};
</script>

<style lang="scss">
.button {
  position: absolute;

  &--add-bin {
    bottom: 50px;
    left: 50px;
  }

  &--confirm-bin {
    bottom: 20px;
    left: 50px;
  }

  &--scanner {
    bottom: 80px;
    left: 50px;
  }
}
</style>
