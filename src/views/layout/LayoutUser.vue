<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <template>
        <v-list-item class="custom-side-header">
          <v-list-item-content>
            <v-list-item-title class="font-weight-black"
              >Books</v-list-item-title
            >
            <v-list-item-subtitle>{{
              this.$store.getters.getUserInfo
                ? this.$store.getters.getUserInfo.userName
                : null
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <navigation-group></navigation-group>

      <template v-slot:append>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-account-arrow-left</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app class="custom-header">
      <v-btn @click.stop="drawer = !drawer" tile depressed color="primary">
        <v-icon dense>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>

      <footer-component></footer-component>
    </v-main>
  </v-app>
</template>

<script>
import NavigationGroup from "../components/NavigationGroup";
import FooterComponent from "../components/Footer";

export default {
  components: {
    NavigationGroup,
    FooterComponent,
  },
  data: () => ({
    drawer: true,
  }),
  methods: {
    logout: function () {
      localStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
  .custom-header {
    background-color: #fff !important;
    box-shadow: unset !important;
    border-bottom: 1px solid !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
    height: 63px !important;
  }
  .custom-side-header {
    height: 62px !important;
  }
</style>
