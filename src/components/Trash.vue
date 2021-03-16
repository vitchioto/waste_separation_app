<template>
  <div class="trash">
    <div>
      Tadaa, nový odpad pridaný!
    </div>
    Vyhodiť do:
    <div
      v-for="(bin, index) in trashDetails.bins"
      :key="index"
      v-html="bin"
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
};
</script>

<style lang="scss">
.trash {
  opacity: 0;
  transition: opacity 0.5s ease 1s;
}
</style>
