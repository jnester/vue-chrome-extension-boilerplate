import VueRouter from "vue-router";
import Bookmark from "./Bookmark.vue";
import Login from "./Login.vue";
// import Register from "./components/Register.vue";
// lazy-loaded
// const Profile = () => import("./components/Profile.vue")
// const BoardAdmin = () => import("./components/BoardAdmin.vue")
// const BoardModerator = () => import("./components/BoardModerator.vue")
// const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: Bookmark,
  },
  {
    path: "/bookmark",
    component: Bookmark,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  //history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   // eval("debugger;")
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     console.log('NOT redirecting', from, to, next)
//     next('/login');
//   } else {
//     console.log('redirecting', from, to, next)
//     next();
//   }
// });

export default router;