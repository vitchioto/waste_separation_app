<template>
  <div>
    <div>
      Whoops, tento produkt chýba, môžete ho doplniť :)
    </div>
    <div
      v-if="materials"
      class="materials__wrapper"
    >
      <div
        v-for="(materialGroup, index) in materialsByCategory"
        :key="index"
        class="materials__group"
      >
        <div
          class="materials__title"
          @click="toggleOpen(index)"
          v-html="index"
        />
        <div
          class="materials"
          :class="{'materials--open': openMaterialGroups.includes(index)}"
        >
          <label
            v-for="material in materialGroup"
            :key="material.code"
          >
            <input
              type="checkbox"
              name="material[]"
              v-model="newTrashMaterials"
              :value="material.code"
            >
            {{ material.title }}
            <div
              v-html="material.text"
            />
          </label>
        </div>
      </div>
    </div>
    <button
      class="button button--add-trash"
      @click="addTrash()"
      v-html="'Pridaj'"
    />
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openMaterialGroups: [],
      newTrashMaterials: [],
      trashAdded: false,
    };
  },
  computed: {
    materials() {
      return this.$store.state.materials;
    },
    materialsByCategory() {
      const result = {};
      this.materials.forEach((material) => {
        const { category, code } = material.acf;
        if (!result[category]) result[category] = [];
        const object = {
          code,
          text: material.content.rendered,
          title: material.title.rendered,
        };
        result[category].push(object);
      });
      console.log(result);
      return result;
    },
  },
  mounted() {
    if (!this.materials) {
      this.$store.dispatch('getMaterials');
    }
  },
  methods: {
    async addTrash() {
      await this.$store.dispatch('addTrash', { code: this.code, materials: this.newTrashMaterials });
      this.trashAdded = true;
    },
    toggleOpen(group) {
      const index = this.openMaterialGroups.indexOf(group);
      if (index > -1) {
        this.openMaterialGroups.splice(index, 1);
      } else {
        this.openMaterialGroups.push(group);
      }
    },
  },
};
</script>

<style lang="scss">
.materials {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s;

  &--open {
    max-height: 500px;
  }
}
</style>
