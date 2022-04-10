<template>
  <v-card class="elevation-0">
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <h2>{{ this.$route.meta.title }}</h2>
        </v-col>

        <v-col cols="12" sm="12" md="4">
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
          <v-btn tile depressed color="primary" @click="addUser" class="w-100">
            Add user
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-dialog v-model="editDialog" max-width="500px">
      <edit-user :userdata="editData" @changeEditDialog="changeEditDialog" />
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <delete-user
        :userdata="deleteData"
        @changeDeleteDialog="changeDeleteDialog"
      />
    </v-dialog>

    <v-dialog v-model="addDialog" max-width="500px">
      <add-user @changeAddDialog="changeAddDialog" />
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="this.$store.getters.getUsers"
      :loading="loading"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          @click="editUser(item)"
          v-bind:class="[userId === 1 ? 'mx-1' : 'd-none']"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mx-1"
          @click="deleteUser(item)"
          v-bind:class="[userId === 1 ? 'mx-1' : 'd-none']"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { readDataFromAPI } from "../../../api/global";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import store from "../../../store/index";

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
        { text: "User name", value: "userName" },
        { text: "Password", value: "password" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  components: {
    EditUser,
    DeleteUser,
    AddUser,
  },
  methods: {
    readData() {
      this.loading = true;
      readDataFromAPI("Users").then((response) => {
        this.loading = false;
        //this.data = response.data; - save data into global state instead state
        store.commit("setUsers", response.data);
      });
    },
    viewBook(item) {
      this.$router.push(`books/${item}`);
    },
    viewUser(item) {
      this.$router.push(`users/${item}`);
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

    editUser(item) {
      this.editDialog = true;
      this.editData = item;
    },

    deleteUser(item) {
      this.deleteDialog = true;
      this.deleteData = item;
    },

    addUser() {
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
