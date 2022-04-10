<template>
  <v-card class="elevation-0">
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <h2>{{ this.$route.meta.title }}</h2>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mt-0 pt-0"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="this.$store.getters.getActivities"
      :loading="loading"
      :search="search"
    >
      <template v-slot:[`item.dueDate`]="{ item }">
        <span>{{ new Date(item.dueDate).toLocaleString() }}</span>
      </template>
      <template v-slot:[`item.completed`]="{ item }">
        <span>
          <v-icon v-if="item.completed" color="green darken-2"
            >mdi-check</v-icon
          >
          <v-icon v-else color="red darken-2">mdi-close</v-icon>
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { readDataFromAPI } from "../../api/global";
import store from "../../store/index";

export default {
  data() {
    return {
      userId: null,
      search: "",
      data: [],
      loading: true,
      headers: [
        { text: "Title", value: "title" },
        { text: "Due date", value: "dueDate" },
        { text: "Completed", value: "completed" },
      ],
    };
  },
  methods: {
    readData() {
      this.loading = true;
      readDataFromAPI("Activities").then((response) => {
        this.loading = false;
        //this.data = response.data; - save data into global state instead state
        store.commit("setActivities", response.data);
      });
    },
  },
  mounted() {
    if (this.$store.getters.getUserInfo) {
      this.userId = this.$store.getters.getUserInfo.id;
    }

    this.readData();
  },
};
</script>
