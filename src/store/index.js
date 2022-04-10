import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    authors: [],
    books: [],
    users: [],
    activities: [],
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setAuthors(state, payload) {
      state.authors = payload;
    },
    deleteAuthor(state, authorId) {
      let authors = state.authors.filter((v) => v.id != authorId);
      state.authors = authors;
    },
    editAuthor(state, author) {
      state.authors.forEach((a) => {
        if (a.id == author.id) {
          a.firstName = author.firstName;
          a.lastName = author.lastName;
        }
      });
    },
    addAuthor(state, author) {
      let authors = state.authors.concat(author);
      state.authors = authors;
    },
    setBooks(state, payload) {
      state.books = payload;
    },
    deleteBook(state, bookId) {
      let books = state.books.filter((v) => v.id != bookId);
      state.books = books;
    },
    editBook(state, book) {
      state.books.forEach((a) => {
        if (a.id == book.id) {
          a.title = book.title;
          a.description = book.description;
          a.pageCount = book.pageCount;
          a.excerpt = book.excerpt;
          a.publishDate = book.publishDate;
        }
      });
    },
    addUser(state, user) {
      let users = state.users.concat(user);
      state.users = users;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    deleteUser(state, userId) {
      let users = state.users.filter((v) => v.id != userId);
      state.users = users;
    },
    editUser(state, user) {
      state.users.forEach((a) => {
        if (a.id == user.id) {
          a.userName = user.userName;
          a.password = user.password;
        }
      });
    },
    setActivities(state, payload) {
      state.activities = payload;
    },
  },
  actions: {
    deleteAuthor({ commit }, authorId) {
      commit("deleteAuthor", authorId);
    },
    editAuthor({ commit }, author) {
      commit("editAuthor", author);
    },
    addAuthor({ commit }, author) {
      commit("addAuthor", author);
    },
    deleteBook({ commit }, bookId) {
      commit("deleteBook", bookId);
    },
    editBook({ commit }, book) {
      commit("editBook", book);
    },
    addBook({ commit }, book) {
      commit("addBook", book);
    },
    deleteUser({ commit }, userId) {
      commit("deleteUser", userId);
    },
    editUser({ commit }, user) {
      commit("editUser", user);
    },
    addUser({ commit }, user) {
      commit("addUser", user);
    },
  },
  modules: {},
  getters: {
    getUserInfo: (state) => state.userInfo,
    getAuthors: (state) => state.authors,
    getBooks: (state) => state.books,
    getUsers: (state) => state.users,
    getActivities: (state) => state.activities,
  },
});
