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
  computed: {
    bins() {
      return this.$store.state.bins;
    },
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
      console.log(mapContainer);
      this.google.load()
        .then(() => {
          // eslint-disable-next-line
          this.map = new google.maps.Map(mapContainer, this.mapConfig);

          this.bins.forEach((bin) => {
            // eslint-disable-next-line
            new google.maps.Marker({
              map: this.map,
              position: {
                lat: parseFloat(bin.acf.Latitude),
                lng: parseFloat(bin.acf.Longitude),
              },
            });
          });
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
