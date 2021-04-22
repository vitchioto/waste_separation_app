<template>
  <div
    v-if="!cookieConsent"
    class="cookie-message"
  >
    {{ $t('cookieMessage') }}
    <button
      class="button button--confirm"
      @click="setCookie()"
      v-html="$t('cookieButton')"
    />
  </div>
  <div class="container">
    <header>
      <h1>
        <a href="/">
          {{ $t('title') }}
        </a>
      </h1>
      <div class="city">
        <span class="city__prefix">{{ $t('in') }}</span>
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
    >
      <div class="scanner__wrapper">
        <Scanner
          v-if="showScanner"
          @closeScanner="setScanner(false)"
          @codeDetected="setCode"
          @getTrashDetails="getTrashDetails()"
          @reset="reset()"
        />
        <button
          v-else
          class="button button--scanner"
          @click="setScanner(true)"
          v-html="$t('scanIt')"
        />
      </div>
      <div class="trash__wrapper">
        <label class="code__wrapper">
          {{ $t('eanCode') }}
          <input
            class="text-field code"
            type="text"
            placeholder="8580123456789"
            v-model="code"
          >
        </label>
        <button
          class="button button--confirm"
          :disabled="!code"
          @click="getTrashDetails()"
          v-html="$t('submitCode')"
        />
      </div>
      <Trash
        v-if="trashDetails && trashDetails.length"
        :trash-details="trashDetails"
      />
      <div
        v-if="trashDetailsLoaded && !trashDetails.length"
        class="add-trash__message"
      >
        {{ $t('missingProduct') }}
        <span
          v-if="showTrashForm"
          v-html="$t('addCode')"
        />
        <button
          v-else
          @click="setTrashForm(true)"
          v-html="$t('addCode')"
        />
      </div>
      <AddTrash
        v-if="showTrashForm && !(trashDetails && trashDetails.length)"
        :code="code"
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
      cookieConsent: null,
      trashDetailsLoaded: false,
      showScanner: false,
      showTrashForm: false,
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
    setTrashForm(payload) {
      this.showTrashForm = payload;
    },
    reset() {
      this.setCode('');
      this.setTrashForm(false);
      this.trashDetailsLoaded = false;
      this.$store.commit('ADD_TRASH_DETAILS', null);
    },
    setCookie() {
      localStorage.setItem('cookie-consent', true);
      this.cookieConsent = true;
    },
  },
  created() {
    this.cookieConsent = localStorage.getItem('cookie-consent') || false;
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

.cookie-message {
  background: #888;
  padding: 5px;
  text-align: center;
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
  font-size: 1rem;
  padding: 10px 5px;
  width: 130px;
}

.code {
  &__wrapper {
    display: block;
  }
}

.trash__wrapper {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 20px;
  max-width: 300px;
  transform: translateY(0);
  transition: transform 0.5s ease 0.5s;
}

.button {
  background: #000;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0 auto 20px;
  max-width: 300px;
  padding: 20px;
  transition: opacity 0.5s;
  width: 100%;

  &--confirm {
    font-size: 1rem;
    margin: 0;
    padding: 10px;
    width: auto;
  }

  &--scanner {
    border: none;
    height: 100%;
    margin: 0;
  }
}
</style>
