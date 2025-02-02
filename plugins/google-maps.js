import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDqA5sU9knI8076gn4Jes8Xnzy2MAFncA0",
    libraries: "places",
  },
});
