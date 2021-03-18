<template>
  <div class="container">
    <header>
      <h1>
        <a href="/">
          Kam to vyhodiť
        </a>
      </h1>
      <div class="city">
        <span class="city__prefix">v meste </span>
        <label class="city__dropdown__wrapper">
          <select class="city__dropdown">
            <option>Bratislava</option>
          </select>
        </label>
        <span class="city__suffix"> ?</span>
      </div>
    </header>
    <main
      class="main"
      :class="{ 'main--animate': trashDetailsLoaded}"
    >
      <div class="scanner__wrapper">
        <Scanner
          v-if="showScanner"
          @closeScanner="setScanner(false)"
          @codeDetected="setCode"
        />
        <button
          v-else
          class="button button--scanner"
          @click="setScanner(true)"
          v-html="'Naskenuj čiarový kód'"
        />
      </div>
      <div class="trash__wrapper">
        <label class="code__wrapper">
          Čiarový kód
          <input
            class="text-field code"
            type="text"
            placeholder="123456789"
            v-model="code"
          >
        </label>
        <Trash
          v-if="trashDetails"
          :trash-details="trashDetails"
        />
        <AddTrash
          v-if="trashDetailsLoaded && !trashDetails"
          :code="code"
        />
      </div>
      <button
        class="button button--confirm"
        :disabled="!code"
        @click="getTrashDetails(true)"
        v-html="'Kam to vyhodiť'"
      />
    </main>
  </div>
</template>

<script>
import AddTrash from './components/AddTrash.vue';
import Scanner from './components/Scanner.vue';
import Trash from './components/Trash.vue';

export default {
  name: 'App',
  components: {
    AddTrash,
    Scanner,
    Trash,
  },
  data() {
    return {
      code: '',
      trashDetailsLoaded: false,
      showScanner: false,
    };
  },
  computed: {
    trashDetails() {
      return this.$store.state.trashDetails;
    },
  },
  methods: {
    async getTrashDetails() {
      await this.$store.dispatch('getTrashDetails', this.code);
      this.trashDetailsLoaded = true;
    },
    setCode(payload) {
      this.code = payload;
    },
    setScanner(payload) {
      this.showScanner = payload;
    },
  },
};
</script>

<style lang="scss">
@import '/node_modules/reset-css/sass/_reset.scss';
html {
  background: #000;
}

a {
  color: #fff;
  text-decoration: none;
}

.container {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  margin: 0 auto;
  max-width: 600px;
  padding: 30px 10px;
  width: 100%
}

h1 {
  font-size: 3rem;
  line-height: 4rem;
}

.city {
  font-size: 1.5rem;
  line-height: 1.7rem;
  text-align: right;

  &__dropdown {
    appearance: none;
    background: #000;
    border: none;
    color: #fff;
    font-size: 3rem;
    line-height: 4rem;
    margin-right: 5px;

    &__wrapper {
      align-items: center;
      border: 1px solid #fff;
      display: inline-flex;
      padding: 10px;

      &::after {
        border-bottom: 3px solid #fff;
        border-left: 3px solid #fff;
        content: "";
        display: inline-block;
        height: 10px;
        transform: rotate(-45deg);
        width: 10px;
      }
    }
  }
}

.main {
  padding-top: 30px;

  &--animate {
    .scanner__wrapper, .button--confirm {
      opacity: 0;
    }

    .trash {
      opacity: 1;

      &__wrapper {
        transform: translateY(-250px);
      }
    }
  }
}

.scanner__wrapper {
  border: 1px solid #fff;
  height: 225px;
  margin: 0 auto 20px;
  transition: opacity 0.5s;
  width: 300px;
}

.text-field {
  background: #000;
  border: 1px solid #fff;
  box-sizing: border-box;
  color: #fff;
  display: block;
  padding: 5px;
  width: 100%;
}

.code {
  &__wrapper {
    display: block;
  }
}

.trash__wrapper {
  margin: 0 auto 20px;
  max-width: 300px;
  transform: translateY(0);
  transition: transform 0.5s ease 0.5s;
  width: 100%;
}

.button {
  background: #000;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 1.5rem;
  margin: 0 auto 20px;
  max-width: 300px;
  padding: 20px;
  transition: opacity 0.5s;
  width: 100%;

  &--scanner {
    border: none;
    height: 100%;
    margin: 0;
  }
}
</style>
