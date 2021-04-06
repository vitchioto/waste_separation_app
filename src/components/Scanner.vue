<template>
  <div class="scanner">
    <div
      class="close"
      @click="close()"
      v-html="'x'"
    />
    <svg
      v-if="stopped"
      class="repeat"
      @click="startQuagga()"
      data-icon="redo"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34
        8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91
        12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12
        12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
      >
        <title
          v-html="$t('scannerRepeat')"
        />
      </path>
    </svg>
    <div id="scanner" />
  </div>
</template>

<script>
import Quagga from '@ericblade/quagga2';

export default {
  data() {
    return {
      stopped: false,
    };
  },
  mounted() {
    this.initQuagga();
    Quagga.onDetected(this.onDetected);
  },
  beforeUnmount() {
    Quagga.stop();
  },
  methods: {
    close() {
      this.$emit('closeScanner');
    },
    initQuagga() {
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
    },
    onDetected(result) {
      this.stopped = true;
      Quagga.stop();
      this.$emit('codeDetected', result.codeResult.code);
      this.$emit('getTrashDetails');
    },
    startQuagga() {
      this.stopped = false;
      this.$emit('reset');
      this.initQuagga();
    },
  },
};
</script>

<style lang="scss">
.scanner {
  height: 225px;
  overflow: hidden;
  position: relative;
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

.repeat {
  cursor: pointer;
  height: 40px;
  left: 130px;
  position: absolute;
  top: 92px;
  width: 40px;
  z-index: 1;
}

.drawingBuffer {
  display: none;
}
</style>
