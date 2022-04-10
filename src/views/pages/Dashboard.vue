<template>
  <v-card class="elevation-0">
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <h2>{{ this.$route.meta.title }}</h2>
        </v-col>

        <v-col
          cols="12"
          sm="12"
          :md="userId === 1 && $route.path == '/books' ? '4' : '6'"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mt-0 pt-0"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="2">
          <v-btn
            tile
            depressed
            color="primary"
            @click="addBook"
            v-bind:class="[
              userId === 1 && $route.path == '/books' ? 'w-100' : 'd-none',
            ]"
          >
            Add book
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-dialog v-model="editDialog" max-width="500px">
      <edit-book :bookdata="editData" @changeEditDialog="changeEditDialog" />
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <delete-book
        :bookdata="deleteData"
        @changeDeleteDialog="changeDeleteDialog"
      />
    </v-dialog>

    <v-dialog v-model="addDialog" max-width="500px">
      <add-book @changeAddDialog="changeAddDialog" />
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="this.$store.getters.getBooks"
      :loading="loading"
      :search="search"
    >
      <template v-slot:[`item.publishDate`]="{ item }">
        <span>{{ new Date(item.publishDate).toLocaleString() }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mx-1" @click="viewItem(item)"> mdi-eye </v-icon>
        <v-icon
          small
          @click="editBook(item)"
          v-bind:class="[
            userId === 1 && $route.path == '/books' ? 'mx-1' : 'd-none',
          ]"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mx-1"
          @click="deleteBook(item)"
          v-bind:class="[
            userId === 1 && $route.path == '/books' ? 'mx-1' : 'd-none',
          ]"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { readDataFromAPI } from "../../api/global";
import EditBook from "./books/EditBook";
import DeleteBook from "./books/DeleteBook";
import AddBook from "./books/AddBook";
import store from "../../store/index";

export default {
  data() {
    return {
      editDialog: false,
      editData: [],

      deleteDialog: false,
      deleteData: [],

      addDialog: false,

      userId: null,

      search: "",
      data: [],
      loading: true,
      headers: [
        { text: "Book name", value: "title" },
        { text: "Number of pages", value: "pageCount" },
        { text: "Date of publication", value: "publishDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  components: {
    EditBook,
    DeleteBook,
    AddBook,
  },
  methods: {
    readData() {
      this.loading = true;
      readDataFromAPI("Books").then((response) => {
        this.loading = false;
        //this.data = response.data; - save data into global state instead state
        store.commit("setBooks", response.data);
      });
    },
    viewItem(item) {
      this.$router.push(`books/${item.id}`);
    },
    changeEditDialog(state) {
      this.editDialog = state;
    },

    changeDeleteDialog(state) {
      this.deleteDialog = state;
    },

    changeAddDialog(state) {
      this.addDialog = state;
    },

    editBook(item) {
      this.editDialog = true;
      this.editData = item;
    },

    deleteBook(item) {
      this.deleteDialog = true;
      this.deleteData = item;
    },

    addBook() {
      this.addDialog = true;
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
