<template>
  <v-list>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.path"
        active-class="highlighted"
        :class="item.path === $route.path ? 'highlighted' : ''"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      userId: 1,
      items: [],
    };
  },
  methods: {
    navList() {
      if (this.userId == 1) {
        this.items = [
          {
            text: "Dashboard",
            icon: "mdi-view-dashboard-variant",
            to: "/",
            path: "/",
          },
          { text: "Books", icon: "mdi-book", to: "/books", path: "/books" },
          {
            text: "Authors",
            icon: "mdi-book-edit",
            to: "/authors",
            path: "/authors",
          },
          {
            text: "Activities",
            icon: "mdi-gesture-tap-button",
            to: "/activites",
            path: "/activites",
          },
          {
            text: "Users",
            icon: "mdi-account-group",
            to: "/users",
            path: "/users",
          },
        ];
      } else {
        this.items = [
          { text: "Books", icon: "mdi-book", to: "/", path: "/" },
          {
            text: "Authors",
            icon: "mdi-book-edit",
            to: "/authors",
            path: "/authors",
          },
        ];
      }
    },
  },
  created() {
    if (this.$store.getters.getUserInfo) {
      this.userId = this.$store.getters.getUserInfo.id;
    }
    this.navList();
  },
};
</script>
