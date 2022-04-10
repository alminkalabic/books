<template>
  <v-card class="elevation-0 custom-login rounded-0">
    <v-card-text>
      <v-toolbar class="mb-2" color="blue text-center lighten-5" flat>
        <v-toolbar-title class="text-center w-100">Login</v-toolbar-title>
      </v-toolbar>
      <v-form @keyup.enter.native="checkForm">
        <v-text-field
          name="username"
          label="Username"
          type="text"
          v-model="username"
        ></v-text-field>
        <v-text-field
          id="password"
          name="password"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
      </v-form>
      <v-alert
        v-bind:class="[error ? null : 'd-none']"
        dense
        outlined
        type="error"
      >
        {{ error }}
      </v-alert>
    </v-card-text>

    <v-btn
      @click="checkForm"
      type="submit"
      tile
      depressed
      color="primary"
      :disabled="logging"
      class="d-flex mx-3 mb-3"
      >Login</v-btn
    >
  </v-card>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import { readDataFromAPI } from "../../../api/global";

Vue.use(VueAxios, axios);

export default {
  data: () => ({
    username: null,
    password: null,
    error: "",
    logging: false,
  }),
  methods: {
    checkUser: function (usersInfo) {
      var currentUser = usersInfo.filter((obj) => {
        return obj.userName === this.username;
      });
      if (
        currentUser.length === 1 &&
        currentUser[0].password === this.password
      ) {
        localStorage.setItem("userInfo", JSON.stringify(currentUser[0]));
        this.$router.push("/");
      } else {
        this.error = "Incorrect data";
        this.logging = false;
      }
    },

    checkForm: function (e) {
      this.error = "";
      this.logging = true;
      if (this.username && this.password) {
        Vue.axios;
        readDataFromAPI("Users").then((response) => {
          if (response.status === 200) {
            this.checkUser(response.data);
          } else {
            this.error = "Error with service call";
            this.logging = false;
          }
        });
      } else {
        this.error = "Fill in all fields";
        this.logging = false;
      }

      e.preventDefault();
    },
  },
};
</script>

<style>
.custom-login {
  border: 1px solid !important;
  border-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
