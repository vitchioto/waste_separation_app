<template>
  <div>
    <div
      class="google-map"
      ref="googleMap"
    />
    <button
      class="button button--add-bin"
      @click="showAddBin()"
      v-html="'Pridaj kôš'"
    />
    <button
      class="button button--confirm-bin"
      @click="confirmAddBin()"
      v-html="'Potvrď'"
    />
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  data() {
    return {
      apiKey: 'AIzaSyCkJ4h5KOLslCzwS1wKB-ME7JNBCbtk8K8',
      draggableMarker: null,
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
    confirmAddBin() {
      console.log(this.draggableMarker.getPosition().toJSON());
    },
    async initializeMap() {
      const mapContainer = this.$refs.googleMap;
      await this.google.load();
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
    },
    showAddBin() {
      // eslint-disable-next-line
      this.draggableMarker = new google.maps.Marker({
        position: {
          lat: 48.10111111,
          lng: 17.09111111,
        },
        map: this.map,
        draggable: true,
        title: 'Drag me!',
      });
      console.log(this.draggableMarker);
    },
  },
};
</script>

<style lang="scss">
.google-map {
  height: 100vh;
}

.button {
  position: absolute;

  &--add-bin {
    bottom: 50px;
    left: 50px;
  }

  &--confirm-bin {
    bottom: 20px;
    left: 50px;
  }
}
</style>
