<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add book</span>
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
        @click="addAuthor"
        :disabled="btnLoad"
        type="number"
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { addDataFromAPI } from "../../../api/global";

export default {
  data() {
    return {
      //user btn to prevent double click
      btnLoad: false,
      //--------------------------------
      title: "",
      description: "",
      pageCount: null,
      excerpt: "",
      publishDate: new Date(),
    };
  },
  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeAddDialog", false);
    },

    addAuthor() {
      this.btnLoad = true;
      addDataFromAPI("Books", {
        id: this.$store.getters.getBooks.length + 1,
        title: this.title,
        description: this.description,
        pageCount: this.pageCount,
        excerpt: this.excerpt,
        publishDate: this.publishDate,
      }).then((response) => {
        if (response.status == 200) {
          this.btnLoad = false;
          this.$store.dispatch("addBook", {
            id: this.id,
            title: this.title,
            description: this.description,
            pageCount: this.pageCount,
            excerpt: this.excerpt,
            publishDate: this.publishDate,
          });
          //rest state after success
          (this.title = ""),
            (this.description = ""),
            (this.pageCount = ""),
            (this.excerpt = ""),
            (this.publishDate = ""),
            this.$emit("changeAddDialog", false);
        } else {
          //write error
          this.btnLoad = false;
          this.$emit("changeAddDialog", false);
        }
      });
    },
  },
};
</script>
