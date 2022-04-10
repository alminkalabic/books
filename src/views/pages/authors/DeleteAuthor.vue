<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Delete: {{ firstName + " " + lastName }}</span>
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
        @click="deleteAuthor"
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
  props: ["authordata"],

  data() {
    return {
      //user btn to prevent double click
      btnLoad: false,
      //--------------------------------
      id: this.authordata.id,
      firstName: this.authordata.firstName,
      lastName: this.authordata.lastName,
    };
  },

  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeDeleteDialog", false);
    },
    deleteAuthor() {
      this.btnLoad = true;
      deleteDataFromAPI("Authors", this.id).then((response) => {
        if (response.status == 200) {
          //after succes service enable button, close dialog, delete from global storage - vuex
          this.btnLoad = false;
          this.$store.dispatch("deleteAuthor", this.id);
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
    authordata: function (newVal) {
      // watch if authordata is changed and set new
      this.id = newVal.id;
      this.idBook = newVal.idBook;
      this.firstName = newVal.firstName;
      this.lastName = newVal.lastName;
    },
  },
};
</script>
