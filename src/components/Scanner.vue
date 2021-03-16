<template>
  <div class="scanner">
    <div
      class="close"
      @click="close()"
      v-html="'x'"
    />
      <div
        id="scanner"
      />
    <div
      v-if="false"
    >
      <div>
        <div>
          Whoops, tento produkt chýba, môžte ho doplniť :)
        </div>
        <div class="materials">
          <label
            v-for="(material, index) in materials"
            :key="index"
          >
            <input
              type="checkbox"
              name="material[]"
              v-model="newTrashMaterials"
              :value="material.acf.code"
            >
            {{ material.title.rendered }}
          </label>
        </div>
        <button
          @click="addTrash()"
          v-html="'Pridaj'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Quagga from '@ericblade/quagga2';

export default {
  data() {
    return {
      newTrashMaterials: [],
      trashAdded: false,
    };
  },
  computed: {
    materials() {
      return this.$store.state.materials;
    },
  },
  mounted() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner'),
      },
      decoder: {
        readers: ['ean_reader'],
      },
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });
    Quagga.onDetected(this.onDetected);

    if (!this.materials) {
      this.$store.dispatch('getMaterials');
    }
  },
  beforeUnmount() {
    Quagga.stop();
  },
  methods: {
    async addTrash() {
      await this.$store.dispatch('addTrash', { code: this.code, materials: this.newTrashMaterials });
      this.trashAdded = true;
    },
    close() {
      this.$emit('closeScanner');
    },
    onDetected(result) {
      Quagga.stop();
      this.$emit('codeDetected', result.codeResult.code);
    },
  },
};
</script>

<style lang="scss">
.scanner {
  height: 225px;
  width: 300px;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}

#scanner {
  video {
    width: 300px;
  }
}

.drawingBuffer {
  display: none;
}

.materials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
