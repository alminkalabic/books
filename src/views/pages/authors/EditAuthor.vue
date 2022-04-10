<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit author</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="firstName"
              v-model="firstName"
              label="First name"
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="lastName"
              v-model="lastName"
              label="Last name"
              hide-details
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
        @click="editAuthor"
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
  props: ["authordata"],
  data() {
    return {
      //user btn to prevent double click
      btnLoad: false,
      //--------------------------------
      id: this.authordata.id,
      idBook: this.authordata.idBook,
      firstName: this.authordata.firstName,
      lastName: this.authordata.lastName,
    };
  },
  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeEditDialog", false);
    },

    editAuthor() {
      this.btnLoad = true;
      editDataFromAPI("Authors", {
        id: this.id,
        idBook: this.idBook,
        firstName: this.firstName,
        lastName: this.lastName,
      }).then((response) => {
        if (response.status == 200) {
          //after succes service enable button, close dialog, edit in global storage - vuex
          this.btnLoad = false;
          this.$store.dispatch("editAuthor", {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
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
