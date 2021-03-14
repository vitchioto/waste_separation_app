<template>
  <div class="scanner">
    <div id="scanner" />
    <input
      type="text"
      v-model="code"
    >
  </div>
</template>

<script>
import Quagga from '@ericblade/quagga2';

export default {
  data() {
    return {
      code: '',
    };
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
  },
  beforeUnmount() {
    Quagga.stop();
  },
  methods: {
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
  top: 50px;
  width: 300px;
}

#scanner {
  video {
    height: 200px;
    width: 200px;
  }
}

.drawingBuffer {
  display: none;
}
</style>
