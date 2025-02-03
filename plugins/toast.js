import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Only run on the client
if (process.client) {
  Vue.use(Toast);
}
