<template>
  <div>
    <div
      class="google-map"
      ref="googleMap"
    />
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      apiKey: 'AIzaSyCkJ4h5KOLslCzwS1wKB-ME7JNBCbtk8K8',
      google: null,
      map: null,
      mapConfig: {
        center: {
          lat: 48.1516244,
          lng: 17.1270216,
        },
        zoom: 13,
      },
    };
  },
  mounted() {
    const googleMapApi = new Loader({
      apiKey: this.apiKey,
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    async initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.google.load()
        .then(() => {
          // eslint-disable-next-line
          new google.maps.Map(mapContainer, this.mapConfig);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style lang="scss">
.google-map {
  height: 100vh;
}
</style>
