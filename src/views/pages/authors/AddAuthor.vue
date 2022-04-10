<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add author</span>
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
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              name="idBook"
              v-model="idBook"
              label="Book id"
              hide-details
              type="number"
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
      idBook: null,
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    closeDialog() {
      //change state in parent component
      this.$emit("changeAddDialog", false);
    },

    addAuthor() {
      this.btnLoad = true;
      addDataFromAPI("Authors", {
        id: this.$store.getters.getAuthors.length + 1,
        idBook: this.idBook,
        firstName: this.firstName,
        lastName: this.lastName,
      }).then((response) => {
        if (response.status == 200) {
          this.btnLoad = false;
          this.$store.dispatch("addAuthor", {
            id: this.id,
            idBook: this.idBook,
            firstName: this.firstName,
            lastName: this.lastName,
          });
          //reset state after success
          (this.idBook = null),
            (this.firstName = ""),
            (this.lastName = ""),
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
