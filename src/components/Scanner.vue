<template>
  <div class="scanner">
    <div
      class="close"
      @click="close()"
      v-html="'x'"
    />
    <div
      v-if="!trashDetailsLoaded"
    >
      <div
        id="scanner"
      />
      <input
        type="text"
        v-model="code"
      >
      <button
        @click="getTrashDetails()"
        v-html="'Potvrď'"
      />
    </div>
    <div
      v-else
    >
      <div
        v-if="trashDetails"
      >
       <div
          v-if="trashAdded"
        >
          Tadaa, nový odpad pridaný!
        </div>
        Vyhodiť do:
        <div
          v-for="(bin, index) in trashDetails.bins"
          :key="index"
          v-html="bin"
        />
      </div>
      <div
        v-else
      >
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
              :value="material.title.rendered"
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
      code: '',
      newTrashMaterials: [],
      trashAdded: false,
      trashDetailsLoaded: false,
    };
  },
  computed: {
    materials() {
      return this.$store.state.materials;
    },
    trashDetails() {
      return this.$store.state.trashDetails;
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
    async getTrashDetails() {
      Quagga.stop();
      await this.$store.dispatch('getTrashDetails', this.code);
      this.trashDetailsLoaded = true;
    },
    onDetected(result) {
      this.code = result.codeResult.code;
    },
  },
};
</script>

<style lang="scss">
.scanner {
  background: #fff;
  left: calc(50% - 150px);
  position: absolute;
  text-align: center;
  top: 50px;
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
