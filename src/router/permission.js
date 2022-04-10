import router from "./index";
import store from "../store/index";
import { readDataFromAPI } from "../api/global";

function checkUser(next, usersInfo) {
  //Set user auth to false
  let isUserValid = false;

  //Check local storage for data
  if (localStorage.getItem("userInfo")) {
    //If data exist convert to json
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    var currentUser = localUserInfo
      ? usersInfo.filter((obj) => {
          return obj.userName === localUserInfo.userName;
        })
      : null;
    //if user exist & password is valid set isUserValid else remove storage
    currentUser.length === 1 &&
    currentUser[0].password === localUserInfo.password
      ? (isUserValid = true)
      : localStorage.removeItem("userInfo");
  }

  //if isUserValid save userInfo into global storage and do the next page - else go to login
  if (isUserValid) {
    store.commit("setUserInfo", currentUser[0]);
    next();
  } else {
    next("login");
  }
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " - Books" || "Books"; //Set page title
  if (to.meta.requiresAuth) {
    //id meta requiresAuth check userInfo
    readDataFromAPI("Users").then((response) => {
      response.status === 200
        ? checkUser(next, response.data)
        : console.log("Error"); //do redirection
    });
  } else next();
});
