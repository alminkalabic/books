<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit book</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="title"
              v-model="title"
              label="Title"
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="description"
              v-model="description"
              label="Description"
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="pageCount"
              v-model="pageCount"
              label="Number of pages"
              hide-details
              type="number"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="excerpt"
              v-model="excerpt"
              label="Excerpt"
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn tile depressed color="blue darken-1" text @click="closeDialog">
        Cancel
      </v-btn>
      <v-btn
        tile
        depressed
        color="primary"
        @click="editBook"
        :disabled="btnLoad"
      >
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { editDataFromAPI } from "../../../api/global";

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
      this.$emit("changeEditDialog", false);
    },

    editBook() {
      this.btnLoad = true;
      editDataFromAPI("Books", {
        id: this.id,
        title: this.title,
        description: this.description,
        pageCount: this.pageCount,
        excerpt: this.excerpt,
        publishDate: this.publishDate,
      }).then((response) => {
        if (response.status == 200) {
          //after succes service enable button, close dialog, edit in global storage - vuex
          this.btnLoad = false;
          this.$store.dispatch("editBook", {
            id: this.id,
            title: this.title,
            description: this.description,
            pageCount: this.pageCount,
            excerpt: this.excerpt,
            publishDate: this.publishDate,
          });
          this.$emit("changeEditDialog", false);
        } else {
          //write error
          this.btnLoad = false;
          this.$emit("changeEditDialog", false);
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
