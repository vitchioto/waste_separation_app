<template>
  <div class="trash">
    <svg
      display="none"
      viewBox="0 0 448 512"
    >
      <defs>
        <path
          id="trashIcon"
          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136
          32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0
          0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
        />
      </defs>
    </svg>
    <div
      class="trash__name"
      v-html="trashDetails[0].content.rendered"
    />
    <div
      v-for="(part, partIndex) in trashDetails"
      :key="partIndex"
      class="trash__part"
    >
      <div
        v-for="(bin, index) in part.bins"
        :key="index"
        class="bin"
      >
        <div
          v-if="bin.content"
          class="bin__note"
          v-html="bin.content"
        />
        <div class="bin__wrapper">
          <div
            v-if="part.acf.sub_type"
            class="trash_part_name"
            v-html="part.acf.sub_type"
          />
          <div class="bin__details">
            <svg
              data-icon="trash"
              class="bin__image"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <use
                :fill="bin.color"
                xlink:href="#trashIcon"
              />
            </svg>
            <div class="bin__title-bg">
              <div
                class="bin__title"
                v-html="bin.title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="!showErrorText"
      class="button button--error"
      v-html="$t('raiseError')"
      @click="toggleErrorArea()"
    />
    <button
      v-else
      class="button button--error"
      v-html="$t('hideError')"
      @click="toggleErrorArea()"
    />
    <div
      v-if="showErrorText && sendingResult === null"
    >
      <textarea
        class="error_area"
        v-model="error"
      />
      <button
        class="button button--send"
        :disabled="sendingError"
        v-html="$t('sendError')"
        @click="sendError()"
    />
    </div>
    <div
      v-if="sendingResult === 1"
      v-html="$t('errorSentSuccesfully')"
    />
    <div
      v-if="sendingResult === 0"
      v-html="$t('errorNotSentSuccesfully')"
    />
  </div>
</template>

<script>
export default {
  props: {
    trashDetails: {
      type: Object,
    },
  },
  data() {
    return {
      error: '',
      sendingError: false,
      sendingResult: null,
      showErrorText: false,
    };
  },
  methods: {
    async sendError() {
      this.sendingError = true;
      this.sendingResult = await this.$store.dispatch('addTrashError', {
        code: this.trashDetails[0].title.rendered,
        content: this.error,
      });
      this.sendingError = false;
    },
    toggleErrorArea() {
      this.showErrorText = !this.showErrorText;
    },
  },
};
</script>

<style lang="scss">
.bin {
  position: relative;
  text-align: center;

  &__wrapper {
    align-items: center;
    display: flex;
    justify-content: space-around;
  }

  &__details {
    position: relative;
    width: 100px;
  }

  &__note {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  &__title {
    color: #000;
    font-size: 1rem;

    &-bg {
      bottom: 0;
      display: grid;
      left: 0;
      place-items: center;
      position: absolute;
      right: 0;
      text-align: center;
      top: 0;
    }
  }
}

.trash {
  text-align: center;

  &__name {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
  }

  &__part {
    margin-bottom: 10px;
  }
}

.error_area {
  display: block;
  height: 100px;
  margin: 0 auto;
  max-width: 320px;
  width: 100%;
}
</style>
