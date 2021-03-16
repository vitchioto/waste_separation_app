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
  </div>
</template>

<script>
import Quagga from '@ericblade/quagga2';

export default {
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
  },
  beforeUnmount() {
    Quagga.stop();
  },
  methods: {
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
</style>
