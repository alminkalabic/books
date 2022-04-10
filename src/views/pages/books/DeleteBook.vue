<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Delete: {{ title }}</span>
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
        @click="deleteBook"
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
  props: ["bookdata"],

  data() {
    return {
      //user btn to prevent double click
      btnLoad: false,
      //--------------------------------
      id: this.bookdata.id,
      title: this.bookdata.title,
      description: this.bookdata.description,
      pageCount: this.bookdata.pageCount,
      excerpt: this.bookdata.excerpt,
      publishDate: this.bookdata.publishDate,
    };
  },

  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeDeleteDialog", false);
    },
    deleteBook() {
      this.btnLoad = true;
      deleteDataFromAPI("Books", this.id).then((response) => {
        if (response.status == 200) {
          //after succes service enable button, close dialog, delete from global storage - vuex
          this.btnLoad = false;
          this.$store.dispatch("deleteBook", this.id);
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
    bookdata: function (newVal) {
      // watch if bookdata is changed and set new
      this.id = newVal.id;
      this.title = newVal.title;
      this.description = newVal.description;
      this.pageCount = newVal.pageCount;
      this.excerpt = newVal.excerpt;
      this.publishDate = newVal.publishDate;
    },
  },
};
</script>
