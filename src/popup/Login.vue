<template>
  <div class="col-md-12">
    <div class="cardx card-container">
      <div >
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="user.username"/>
          <!-- <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" /> -->
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="text" v-model="user.password"/>
          <!-- <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" /> -->
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading" @click="handleLogin">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <button type="button" @click="getBookmarks">Get Bookmarks</button>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Form } from "vee-validate";
import * as yup from "yup";
import BookmarkService from "./services/bookmark.service";

export default {
  name: "Login",
  components: {
    // Form,
    // Field,
    // ErrorMessage,
  },
  data() {
    // const schema = yup.object().shape({
    //   username: yup.string().required("Username is required!"),
    //   password: yup.string().required("Password is required!"),
    // });

    return {
      loading: false,
      message: "",
      user: {
        username: "jnester2",
        password: "Sing@5489"
      }
    };
  },
  computed: {
    loggedIn() {
      return false; //this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    getBookmarks(){
      BookmarkService.getAll().then(
      (response) => {
        this.bookmarks = response.data;
        console.log('bookmarks', this.bookmarks)
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    },
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/home");
          // this.$parent.();
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.cardx {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  /* margin-top: 50px; */
  /* -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3); */
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
