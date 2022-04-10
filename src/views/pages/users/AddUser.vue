<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add user</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="userName"
              v-model="userName"
              label="User name"
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="password"
              v-model="password"
              label="Password"
              hide-details
              type="password"
            ></v-text-field>
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
        @click="addUser"
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
      userName: "",
      password: "",
    };
  },
  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeAddDialog", false);
    },

    addUser() {
      this.btnLoad = true;
      addDataFromAPI("Users", {
        id: this.$store.getters.getUsers.length + 1,
        userName: this.userName,
        password: this.password,
      }).then((response) => {
        if (response.status == 200) {
          this.btnLoad = false;
          this.$store.dispatch("addUser", {
            id: this.id,
            userName: this.userName,
            password: this.password,
          });
          //rest state after success
          (this.userName = ""),
            (this.password = ""),
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
