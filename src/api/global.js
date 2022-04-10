import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export function readDataFromAPI(path, id) {
  return Vue.axios.get(
    `${process.env.VUE_APP_BASE_API_URL}${path}/${id ? id : ""}`
  );
}

export function addDataFromAPI(path, data) {
  return Vue.axios.post(`${process.env.VUE_APP_BASE_API_URL}${path}/`, data);
}

export function editDataFromAPI(path, data) {
  return Vue.axios.put(
    `${process.env.VUE_APP_BASE_API_URL}${path}/${data.id ? data.id : ""}`,
    data
  );
}

export function deleteDataFromAPI(path, id) {
  return Vue.axios.delete(
    `${process.env.VUE_APP_BASE_API_URL}${path}/${id ? id : ""}`
  );
}
