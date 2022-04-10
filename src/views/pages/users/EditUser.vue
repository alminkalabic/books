<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit user</span>
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
        @click="editUser"
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
      this.$emit("changeEditDialog", false);
    },

    editUser() {
      this.btnLoad = true;
      editDataFromAPI("Users", {
        id: this.id,
        userName: this.userName,
        password: this.password,
      }).then((response) => {
        if (response.status == 200) {
          //after succes service enable button, close dialog, edit in global storage - vuex
          this.btnLoad = false;
          this.$store.dispatch("editUser", {
            id: this.id,
            userName: this.userName,
            password: this.password,
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
    userdata: function (newVal) {
      // watch if userdata is changed and set new
      this.id = newVal.id;
      this.userName = newVal.userName;
      this.password = newVal.password;
    },
  },
};
</script>
