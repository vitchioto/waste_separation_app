<template>
  <div>
    <label class="code__wrapper">
      {{ $t('titleOfNewProduct') }}
      <input
        class="text-field trash__title"
        type="text"
        :placeholder="$t('placeholderOfNewProduct')"
        v-model="trashTitle"
      >
    </label>
    <div
      v-if="materials"
      class="materials__wrapper"
    >
      <div
        v-for="(part, partIndex) in trashParts"
        :key="partIndex"
        class="part"
      >
        <div class="part_row">
          <label class="code__wrapper">
            {{ $t('titleOfNewPart') }}
            <input
              class="text-field trash__title"
              type="text"
              :placeholder="$t('placeholderOfNewPart')"
              v-model="trashParts[partIndex].title"
            >
          </label>
          <div
            v-if="trashParts[partIndex].material"
            class="part__material"
            v-html="findMaterial(trashParts[partIndex].material).title.rendered"
          />
          <div class="part__buttons">
            <button
              class="part__button"
              v-if="trashParts[partIndex].material && !trashParts[partIndex].edit"
              @click="setEdit(partIndex, true)"
              v-html="$t('edit')"
            />
            <button
              class="part__button"
              v-if="trashParts[partIndex].material && trashParts[partIndex].edit"
              @click="setEdit(partIndex, false)"
              v-html="$t('hideEdit')"
            />
            <button
              class="part__button"
              v-if="trashParts[partIndex].material"
              @click="removePart(partIndex)"
              v-html="'x'"
            />
          </div>
        </div>
        <div
          v-if="!trashParts[partIndex].material || trashParts[partIndex].edit"
        >
          <div
            v-for="(materialGroup, index) in materialsByCategory"
            :key="index"
            class="materials__group"
          >
            <div
              class="materials__title"
              :class="{'materials__title--open': openMaterialGroups.includes(index)}"
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
                class="material"
              >
                <input
                  type="radio"
                  name="material"
                  v-model="trashParts[partIndex].material"
                  :value="material.code"
                >
                <img
                  class="material__image"
                  alt=""
                  height="40"
                  :src="material.image"
                  width="40"
                >
                <span
                  v-html="material.title"
                />
                <br>
                <span
                  class="material__examples"
                  v-html="material.text"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="addNewPart()"
        v-html="'+'"
      />
    </div>
    <button
      class="button button--add-trash"
      @click="addTrash()"
      v-html="$t('addProduct')"
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
      trashAdded: false,
      trashParts: [{
        edit: false,
        material: null,
        title: '',
      }],
      trashTitle: '',
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
          // eslint-disable-next-line dot-notation
          image: material['_embedded']['wp:featuredmedia'][0].source_url,
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
    addNewPart() {
      this.closeAllMaterialGroups();
      this.trashParts.push({
        edit: false,
        material: null,
        title: '',
      });
    },
    async addTrash() {
      await this.$store.dispatch('addTrash', {
        code: this.code,
        content: this.trashTitle,
        parts: this.trashParts,
      });
      this.trashAdded = true;
    },
    closeAllMaterialGroups() {
      this.openMaterialGroups.splice(0);
    },
    findMaterial(code) {
      return this.materials.find((material) => material.acf.code === code);
    },
    removePart(index) {
      this.trashParts.splice(index, 1);
    },
    setEdit(index, value) {
      this.closeAllMaterialGroups();
      this.trashParts[index].edit = value;
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
.add-trash {
  &__message {
    padding: 20px 0;
  }
}

.materials {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s;

  &--open {
    max-height: 700px;
  }

  &__wrapper {
    padding: 20px 0;
  }

  &__group {
    border-bottom: 1px solid #fff;
    padding: 10px 0;
  }

  &__title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;

    &::after {
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      content: "";
      display: block;
      height: 5px;
      transform: rotateZ(45deg);
      transition: transform 0.5s;
      width: 5px;
    }

    &--open {
      &::after {
        transform: rotateZ(-135deg);
      }
    }
  }
}

.material {
  cursor: pointer;
  display: block;
  padding-top: 5px;

  &__image {
    background: #fff;
    margin-right: 5px;
  }

  &__examples {
    display: inline-block;
    padding: 5px 0 5px 5px;
    font-size: 12px;
  }
}

.part {
  margin-bottom: 20px;

  &_row {
    align-items: center;
    display: flex;
  }

  &__material {
    margin-left: 10px;
  }

  &__buttons {
    margin-left: auto;
  }

  &__button {
    margin-left: 10px;
  }
}
</style>
