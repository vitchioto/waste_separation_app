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
      v-for="(bin, index) in trashDetails.bins"
      :key="index"
      class="bin"
    >
      <div
        v-if="bin.content"
        class="bin__note"
        v-html="bin.content"
      />
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
</template>

<script>
export default {
  props: {
    trashDetails: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.trash {
  opacity: 0;
  transition: opacity 0.5s ease 1s;
}

.bin {
  position: relative;

  &__note {
    margin-bottom: 10px;
  }

  &__title {
    color: #000;
    font-size: 2.5rem;

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
</style>
