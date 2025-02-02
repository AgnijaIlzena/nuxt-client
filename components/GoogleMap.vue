<template>
  <div class="container">
    <div class="card">
      <gmap-map
        :zoom="14"
        :center="{ lat: lat, lng: lng }"
        style="width: 100%; height: 550px"
        class="mb-5"
      >
        <gmap-marker
          :position="{ lat: lat, lng: lng }"
          :clickable="true"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    latitude: {
      type: [Number, String],
      required: true
    },
    longitude: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    lat() {
      return Number(this.latitude);
    },
    lng() {
      return Number(this.longitude);
    }
  }
};
</script>
