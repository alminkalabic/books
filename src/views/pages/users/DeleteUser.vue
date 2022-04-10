<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Delete: {{ userName }}</span>
    </v-card-title>
    <v-card-text> Want to delete? </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn tile depressed color="blue darken-1" text @click="closeDialog">
        Cancel
      </v-btn>
      <v-btn
        tile
        depressed
        color="primary"
        @click="deleteUser"
        :disabled="btnLoad"
      >
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { deleteDataFromAPI } from "../../../api/global";

export default {
  props: ["userdata"],

  data() {
    return {
      //user btn to prevent double click
      btnLoad: false,
      //--------------------------------
      id: this.userdata.id,
      userName: this.userdata.userName,
      password: this.userdata.password,
    };
  },

  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeDeleteDialog", false);
    },
    deleteUser() {
      this.btnLoad = true;
      deleteDataFromAPI("Users", this.id).then((response) => {
        if (response.status == 200) {
          //after succes service enable button, close dialog, delete from global storage - vuex
          this.btnLoad = false;
          this.$store.dispatch("deleteUser", this.id);
          this.$emit("changeDeleteDialog", false);
        } else {
          //write error
          this.btnLoad = false;
          this.$emit("changeDeleteDialog", false);
        }
      });
    },
  },
  watch: {
    userdata: function (newVal) {
      // watch if userdata is changed and set new
      this.id = newVal.id;
      this.userName = newVal.userName;
      this.password = newVal.password;
    },
  },
};
</script>
