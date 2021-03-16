<template>
  <div class="container">
  <h1>Kam to vyhodiť</h1>
  <div class="city">
    <span>v meste </span>
    <select>
      <option>Bratislava</option>
    </select>
    <span>?</span>
  </div>
  <Scanner
    v-if="showScanner"
    @closeScanner="setScanner(false)"
  />
  <button
    class="button button--scanner"
    @click="setScanner(true)"
    v-html="'Skenuj'"
  />
  </div>
</template>

<script>
import Scanner from './components/Scanner.vue';

export default {
  name: 'App',
  components: {
    Scanner,
  },
  data() {
    return {
      showScanner: false,
    };
  },
  methods: {
    setScanner(payload) {
      this.showScanner = payload;
    },
  },
};
</script>

<style lang="scss">
@import '/node_modules/reset-css/sass/_reset.scss';
.container {
  margin: 0 auto;
  max-width: 600px;
  padding: 30px 10px;
  width: 100%
}

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
