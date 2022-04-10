import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/pages/Dashboard.vue"),
    meta: {
      layout: "user",
      title: "Dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/books",
    name: "Books",
    component: () => import("../views/pages/Dashboard.vue"),
    meta: {
      layout: "user",
      title: "Books",
      requiresAuth: true,
    },
  },
  {
    path: "/books/:id",
    name: "Book",
    component: () => import("../views/pages/books/SingleBook.vue"),
    meta: {
      layout: "user",
      title: "Book",
      requiresAuth: true,
    },
    /* children: [
      {
        path: 'books',
        component: () => import("../views/pages/Dashboard.vue"),
      },
    ] */
  },
  {
    path: "/authors",
    name: "Authors",
    component: () => import("../views/pages/authors/Authors.vue"),
    meta: {
      layout: "user",
      title: "Authors",
      requiresAuth: true,
    },
  },
  {
    path: "/authors/:id",
    name: "Author",
    component: () => import("../views/pages/authors/SingleAuthor.vue"),
    meta: {
      layout: "user",
      title: "Author",
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/pages/users/Users.vue"),
    meta: {
      layout: "user",
      title: "Users",
      requiresAuth: true,
    },
  },
  {
    path: "/activites",
    name: "Activites",
    component: () => import("../views/pages/Activites.vue"),
    meta: {
      layout: "user",
      title: "Activites",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/pages/auth/Login.vue"),
    meta: {
      layout: "auth",
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/pages/404.vue"),
    meta: {
      layout: "auth",
      title: "404",
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
