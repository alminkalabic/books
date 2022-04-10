<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <slot />
          </v-flex>
        </v-layout>
        <footer-component></footer-component>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FooterComponent from "../components/Footer";

export default {
  components: {
    FooterComponent,
  },
};
</script>
