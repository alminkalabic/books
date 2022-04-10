<template>
  <div v-if="loading">
    <v-progress-linear indeterminate color="primary"></v-progress-linear>
  </div>
  <div v-else>
    <h1 class="mb-2">{{ data.title }}</h1>
    <p><b>Number of pages: </b>{{ data.pageCount }}</p>
    <p><b>Description: </b>{{ data.description }}</p>
    <p><b>Excerpt: </b>{{ data.excerpt }}</p>
    <p>
      <b>Publish date: </b>{{ new Date(data.publishDate).toLocaleString() }}
    </p>
  </div>
</template>

<script>
import { readDataFromAPI } from "../../../api/global";

export default {
  data() {
    return {
      data: [],
      loading: true,
    };
  },
  methods: {
    readData() {
      this.loading = true;
      readDataFromAPI("Books", this.$route.params.id)
        .then((response) => {
          this.loading = false;
          this.data = response.data;
          //Set new title
          document.title = this.data.title + " - Books";
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/404");
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
